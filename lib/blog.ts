import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { resolveCollectionLinks } from "@/lib/collection-links"

const postsDirectory = path.join(process.cwd(), "content/blog")
const includesDirectory = path.join(process.cwd(), "content/includes")
const promptsDirectory = path.join(process.cwd(), "content/includes/prompts")

interface FaqItem {
  question: string
  answer: string
}

export interface YoutubeChapter {
  time: string
  label: string
}

export interface YoutubeVideo {
  id: string
  title: string
  description: string
  chapters: YoutubeChapter[]
}

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  author?: string
  readingTime?: string
  contentHtml: string
  faq?: FaqItem[]
  youtubeVideo?: YoutubeVideo
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  author?: string
  readingTime?: string
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function renderPromptBlock(body: string): string {
  const trimmed = body.trim()
  const escaped = escapeHtml(trimmed)
  return `<div class="prompt-callout" role="region" aria-label="Prompt"><span class="prompt-callout-label">Prompt</span><pre class="prompt-callout-content">${escaped}</pre></div>`
}

/** Resolve {% include name %} with content from content/includes/<name>.md */
function resolveIncludes(raw: string): string {
  const includeRe = /\{%\s*include\s+([\w/-]+)\s*%\}/g
  let result = raw.replace(includeRe, (_, name: string) => {
    const base = name.replace(/\/$/, "")
    const mdPath = path.join(includesDirectory, `${base}.md`)
    if (!fs.existsSync(mdPath)) return `{% include ${name} %}`
    return fs.readFileSync(mdPath, "utf8").trim()
  })
  // Resolve {% prompt %}...{% endprompt %} with a styled HTML block (prompt specified in the article)
  const inlinePromptRe = /\{%\s*prompt\s*%\}([\s\S]*?)\{%\s*endprompt\s*%\}/g
  result = result.replace(inlinePromptRe, (_, body: string) => renderPromptBlock(body))

  // Resolve {% prompt name %} with content from content/includes/prompts/<name>.md (same styled block)
  const promptRe = /\{%\s*prompt\s+([\w/-]+)\s*%\}/g
  result = result.replace(promptRe, (_, name: string) => {
    const base = name.trim().replace(/\/$/, "")
    const mdPath = path.join(promptsDirectory, `${base}.md`)
    if (!fs.existsSync(mdPath)) return `{% prompt ${base} %}`
    return renderPromptBlock(fs.readFileSync(mdPath, "utf8"))
  })
  return result
}

export async function getAllPosts(): Promise<PostMeta[]> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        author: data.author,
        readingTime: calculateReadingTime(content),
      }
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return null
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const contentWithIncludes = resolveIncludes(content)
  const contentWithCollectionLinks = resolveCollectionLinks(contentWithIncludes)

  // Convert markdown to HTML (allow raw HTML passthrough)
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(contentWithCollectionLinks)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    author: data.author,
    readingTime: calculateReadingTime(content),
    contentHtml,
    faq: (data.faq as FaqItem[]) || [],
    youtubeVideo: data.youtubeVideo as Post["youtubeVideo"],
  }
}
