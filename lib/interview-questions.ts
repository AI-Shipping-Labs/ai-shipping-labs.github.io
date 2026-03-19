import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export interface InterviewQaItem {
  question: string
  answer?: string
  answerHtml: string
}

export interface InterviewSection {
  id: string
  title: string
  intro?: string
  qa: InterviewQaItem[]
}

export interface InterviewQuestionsPage {
  slug: string
  title: string
  description?: string
  prefaceSections: ContentSection[]
  appendixSections: ContentSection[]
  introTitle?: string
  introHtml: string
  outroTitle?: string
  outroHtml: string
  sections: InterviewSection[]
  sources?: SourceLink[]
}

export interface SourceLink {
  label: string
  url: string
}

export interface ContentSection {
  id: string
  title: string
  html: string
}

export interface InterviewQuestionsPageMeta {
  slug: string
  title: string
  description?: string
}

const pagesDirectory = path.join(process.cwd(), "content/ai-engineer-interview-questions")

// `remark` treats backslashes as Markdown escape characters.
// That causes `\( ... \)` and `\[ ... \]` delimiters to lose their leading `\`
// during Markdown -> HTML conversion, so MathJax won't detect them.
//
// We preserve those delimiters through the conversion and restore them right
// before the client-side MathJax typesetting runs.
function preserveMathJaxDelimitersForRemark(input: string): string {
  // Use unlikely placeholders so we can safely restore them later.
  const INLINE_L = "__MATHJAX_INLINE_L__"
  const INLINE_R = "__MATHJAX_INLINE_R__"
  const DISPLAY_L = "__MATHJAX_DISPLAY_L__"
  const DISPLAY_R = "__MATHJAX_DISPLAY_R__"

  return input
    .replace(/\\\(/g, INLINE_L)
    .replace(/\\\)/g, INLINE_R)
    .replace(/\\\[/g, DISPLAY_L)
    .replace(/\\\]/g, DISPLAY_R)
}

function restoreMathJaxDelimitersFromHtml(input: string): string {
  const INLINE_L = "__MATHJAX_INLINE_L__"
  const INLINE_R = "__MATHJAX_INLINE_R__"
  const DISPLAY_L = "__MATHJAX_DISPLAY_L__"
  const DISPLAY_R = "__MATHJAX_DISPLAY_R__"

  return input
    .split(INLINE_L)
    .join("\\(")
    .split(INLINE_R)
    .join("\\)")
    .split(DISPLAY_L)
    .join("\\[")
    .split(DISPLAY_R)
    .join("\\]")
}

function normalizeId(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

function coerceString(v: unknown): string {
  if (typeof v === "string") return v
  return ""
}

function splitBodyIntroOutro(content: string): { intro: string; outro: string } {
  const trimmed = content.trim()
  if (!trimmed) return { intro: "", outro: "" }

  const outroMarkerMatch = /<!--\s*outro\s*-->/i.exec(content)
  if (outroMarkerMatch) {
    const splitIndex = outroMarkerMatch.index
    const markerLength = outroMarkerMatch[0].length
    return {
      intro: content.slice(0, splitIndex).trim(),
      outro: content.slice(splitIndex + markerLength).trim(),
    }
  }

  const outroHeadingMatch = /^##\s+(outro|conclusion|wrapping up)\b.*$/im.exec(content)
  if (outroHeadingMatch && typeof outroHeadingMatch.index === "number") {
    const splitIndex = outroHeadingMatch.index
    return {
      intro: content.slice(0, splitIndex).trim(),
      outro: content.slice(splitIndex).trim(),
    }
  }

  return { intro: trimmed, outro: "" }
}

function splitMarkdownIntoSections(
  content: string,
  defaultTitle: string,
  idPrefix: string
): Array<{ id: string; title: string; markdown: string }> {
  const trimmed = content.trim()
  if (!trimmed) return []

  const headingRegex = /^##\s+(.+)$/gm
  const matches = Array.from(trimmed.matchAll(headingRegex))

  if (matches.length === 0) {
    return [{ id: idPrefix, title: defaultTitle, markdown: trimmed }]
  }

  const parts: Array<{ id: string; title: string; markdown: string }> = []
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i]
    const next = matches[i + 1]
    const title = coerceString(current[1]).trim()
    if (!title) continue
    const contentStart = (current.index || 0) + current[0].length
    const contentEnd = next?.index ?? trimmed.length
    const markdown = trimmed.slice(contentStart, contentEnd).trim()
    const id = `${idPrefix}-${normalizeId(title)}`.replace(/-+/g, "-")
    if (!markdown) continue
    parts.push({ id, title, markdown })
  }

  return parts
}

function splitBodyIntoSupplementalSections(content: string): {
  preface: Array<{ id: string; title: string; markdown: string }>
  appendix: Array<{ id: string; title: string; markdown: string }>
} {
  const afterQuestionsMarker = /<!--\s*after-questions\s*-->/i.exec(content)
  const preRaw = afterQuestionsMarker
    ? content.slice(0, afterQuestionsMarker.index).trim()
    : content.trim()
  const postRaw = afterQuestionsMarker
    ? content.slice(afterQuestionsMarker.index + afterQuestionsMarker[0].length).trim()
    : ""

  return {
    preface: splitMarkdownIntoSections(preRaw, "Introduction", "preface"),
    appendix: splitMarkdownIntoSections(postRaw, "Conclusion", "appendix"),
  }
}

async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const processed = await remark()
    .use(html, { sanitize: false })
    .process(preserveMathJaxDelimitersForRemark(markdown))
  return restoreMathJaxDelimitersFromHtml(processed.toString())
}

async function coerceContentSections(
  v: unknown,
  idPrefix: string
): Promise<ContentSection[]> {
  if (!Array.isArray(v)) return []
  const sections = v
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const obj = item as Record<string, unknown>
      const title = coerceString(obj.title).trim()
      const content = coerceString(obj.content).trim()
      const rawId = coerceString(obj.id).trim() || `${idPrefix}-${title}`
      const id = normalizeId(rawId)
      if (!title || !content || !id) return null
      return { id, title, content }
    })
    .filter((x): x is { id: string; title: string; content: string } => Boolean(x))

  const rendered = await Promise.all(
    sections.map(async (section) => ({
      id: section.id,
      title: section.title,
      html: await renderMarkdownToHtml(section.content),
    }))
  )
  return rendered
}

function coerceSources(v: unknown): SourceLink[] {
  if (!Array.isArray(v)) return []
  return v
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const obj = item as Record<string, unknown>
      const label = coerceString(obj.label).trim()
      const url = coerceString(obj.url).trim()
      if (!label || !url) return null
      return { label, url }
    })
    .filter((x): x is SourceLink => Boolean(x))
}

function coerceQaArray(v: unknown): InterviewQaItem[] {
  if (!Array.isArray(v)) return []
  return v
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const obj = item as Record<string, unknown>
      const question = coerceString(obj.question).trim()
      const answer = coerceString(obj.answer).trim()
      if (!question) return null
      return answer
        ? { question, answer, answerHtml: "" }
        : { question, answerHtml: "" }
    })
    .filter((x): x is InterviewQaItem => Boolean(x))
}

function coerceSections(v: unknown): InterviewSection[] {
  if (!Array.isArray(v)) return []
  return v
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const obj = item as Record<string, unknown>
      const title = coerceString(obj.title).trim()
      const intro = coerceString(obj.intro).trim()
      const qa = coerceQaArray(obj.qa)
      if (!title || qa.length === 0) return null
      const rawId = coerceString(obj.id).trim() || title
      const id = normalizeId(rawId)
      if (!id) return null
      const section: InterviewSection = { id, title, qa }
      if (intro) section.intro = intro
      return section
    })
    .filter((x): x is InterviewSection => Boolean(x))
}

export async function getAllInterviewQuestionsPages(): Promise<InterviewQuestionsPageMeta[]> {
  if (!fs.existsSync(pagesDirectory)) return []

  const fileNames = fs.readdirSync(pagesDirectory).filter((f) => f.endsWith(".md"))
  const pages: InterviewQuestionsPageMeta[] = []

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(pagesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    pages.push({
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || undefined,
    })
  }

  return pages.sort((a, b) => a.slug.localeCompare(b.slug))
}

export async function getInterviewQuestionsPageBySlug(
  slug: string
): Promise<InterviewQuestionsPage | null> {
  if (!fs.existsSync(pagesDirectory)) return null

  const fullPath = path.join(pagesDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const sections = coerceSections((data as Record<string, unknown>).sections)
  if (sections.length === 0) return null

  const meta = data as Record<string, unknown>
  const bodyParts = splitBodyIntroOutro(content)
  const bodySupplemental = splitBodyIntoSupplementalSections(content)
  const introMarkdown = coerceString(meta.intro).trim() || bodyParts.intro
  const outroMarkdown = coerceString(meta.outro).trim() || bodyParts.outro

  const prefaceSectionsFromFrontMatter = await coerceContentSections(
    meta.prefaceSections ?? meta.introSections,
    "preface"
  )
  const appendixSectionsFromFrontMatter = await coerceContentSections(
    meta.appendixSections ?? meta.outroSections,
    "appendix"
  )

  const bodyPrefaceSections = await Promise.all(
    bodySupplemental.preface.map(async (section) => ({
      id: section.id,
      title: section.title,
      html: await renderMarkdownToHtml(section.markdown),
    }))
  )
  const bodyAppendixSections = await Promise.all(
    bodySupplemental.appendix.map(async (section) => ({
      id: section.id,
      title: section.title,
      html: await renderMarkdownToHtml(section.markdown),
    }))
  )

  const introHtml = await renderMarkdownToHtml(introMarkdown)
  const outroHtml = await renderMarkdownToHtml(outroMarkdown)
  const sources = coerceSources(meta.sources)

  // Render each answer markdown to HTML and attach to QA items
  for (const section of sections) {
    for (const qa of section.qa) {
      if (!qa.answer) continue
      const rendered = await remark()
        .use(html, { sanitize: false })
        .process(preserveMathJaxDelimitersForRemark(qa.answer))
      qa.answerHtml = restoreMathJaxDelimitersFromHtml(rendered.toString())
    }
  }

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || undefined,
    prefaceSections:
      prefaceSectionsFromFrontMatter.length > 0 ? prefaceSectionsFromFrontMatter : bodyPrefaceSections,
    appendixSections:
      appendixSectionsFromFrontMatter.length > 0
        ? appendixSectionsFromFrontMatter
        : bodyAppendixSections,
    introTitle: coerceString(meta.introTitle).trim() || "Introduction",
    introHtml,
    outroTitle: coerceString(meta.outroTitle).trim() || "Conclusion",
    outroHtml,
    sections,
    sources: sources.length > 0 ? sources : undefined,
  }
}

