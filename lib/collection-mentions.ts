import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")
const tutorialsDirectory = path.join(process.cwd(), "content/tutorials")
const projectsDirectory = path.join(process.cwd(), "content/projects")

export type MentionPageType = "blog" | "tutorial" | "project"

export interface CollectionMention {
  title: string
  href: string
  type: MentionPageType
  slug: string
}

/**
 * Find all site pages that reference a collection resource (by id).
 * Uses:
 * 1. Frontmatter collectionRefs: [ "cursor", "lovable" ] in blog, tutorials, projects
 * 2. Markdown/HTML links to /collection/ID (e.g. [Cursor](/collection/cursor))
 */
export function getPagesMentioningCollectionId(collectionId: string): CollectionMention[] {
  const mentions: CollectionMention[] = []
  const seen = new Set<string>()

  function add(type: MentionPageType, slug: string, title: string) {
    const key = `${type}:${slug}`
    if (seen.has(key)) return
    seen.add(key)
    const href = type === "blog" ? `/blog/${slug}` : type === "tutorial" ? `/tutorials/${slug}` : `/projects/${slug}`
    mentions.push({ title, href, type, slug })
  }

  // Scan blog
  if (fs.existsSync(postsDirectory)) {
    const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"))
    for (const file of files) {
      const slug = file.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, file)
      const raw = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(raw)
      const title = (data.title as string) || slug
      const refs = (data.collectionRefs as string[] | undefined) || []
      if (refs.includes(collectionId)) {
        add("blog", slug, title)
      }
      // Also detect links like [text](/collection/cursor) or short syntax [[cursor]]
      if (content.includes(`/collection/${collectionId}`) || content.includes(`[[${collectionId}]]`)) {
        add("blog", slug, title)
      }
    }
  }

  // Scan tutorials
  if (fs.existsSync(tutorialsDirectory)) {
    const files = fs.readdirSync(tutorialsDirectory).filter((f) => f.endsWith(".md"))
    for (const file of files) {
      const slug = file.replace(/\.md$/, "")
      const fullPath = path.join(tutorialsDirectory, file)
      const raw = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(raw)
      const title = (data.title as string) || slug
      const refs = (data.collectionRefs as string[] | undefined) || []
      if (refs.includes(collectionId)) {
        add("tutorial", slug, title)
      }
      if (content.includes(`/collection/${collectionId}`) || content.includes(`[[${collectionId}]]`)) {
        add("tutorial", slug, title)
      }
    }
  }

  // Scan projects
  if (fs.existsSync(projectsDirectory)) {
    const files = fs.readdirSync(projectsDirectory).filter((f) => f.endsWith(".md"))
    for (const file of files) {
      const slug = file.replace(/\.md$/, "")
      const fullPath = path.join(projectsDirectory, file)
      const raw = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(raw)
      const title = (data.title as string) || slug
      const refs = (data.collectionRefs as string[] | undefined) || []
      if (refs.includes(collectionId)) {
        add("project", slug, title)
      }
      if (content.includes(`/collection/${collectionId}`) || content.includes(`[[${collectionId}]]`)) {
        add("project", slug, title)
      }
    }
  }

  return mentions
}
