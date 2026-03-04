import { getCollectionItemById } from "@/lib/collection"

/**
 * Replaces collection short links in markdown with proper links.
 * Syntax: [[collection-id]] → [Resource Title](/collection/id)
 * Use this in blog posts, tutorials, and projects to link to curated resources by id.
 * The link is absolute from root (/collection/id) so it works from any page.
 */
export function resolveCollectionLinks(markdown: string): string {
  return markdown.replace(/\[\[([a-z0-9-]+)\]\]/g, (_, id: string) => {
    const item = getCollectionItemById(id)
    const title = item?.title ?? id
    const href = `/collection/${id}`
    return `[${title}](${href})`
  })
}
