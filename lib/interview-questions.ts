import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export interface InterviewQaItem {
  question: string
  answer: string
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
  introHtml: string
  sections: InterviewSection[]
  sources?: SourceLink[]
}

export interface SourceLink {
  label: string
  url: string
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
      if (!question || !answer) return null
      return { question, answer, answerHtml: "" }
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

  const processedIntro = await remark()
    .use(html, { sanitize: false })
    .process(preserveMathJaxDelimitersForRemark(content))
  const introHtml = restoreMathJaxDelimitersFromHtml(processedIntro.toString())
  const sources = coerceSources((data as Record<string, unknown>).sources)

  // Render each answer markdown to HTML and attach to QA items
  for (const section of sections) {
    for (const qa of section.qa) {
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
    introHtml,
    sections,
    sources: sources.length > 0 ? sources : undefined,
  }
}

