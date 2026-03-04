import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Wrench, Cpu, GraduationCap, FolderOpen, FileText, BookOpen, Folder } from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { getCollectionItemById, getAllCollectionIds, COLLECTION_CATEGORIES, type CollectionCategory } from "@/lib/collection"
import { getPagesMentioningCollectionId } from "@/lib/collection-mentions"

const CATEGORY_ICONS: Record<CollectionCategory, React.ComponentType<{ className?: string }>> = {
  tools: Wrench,
  models: Cpu,
  courses: GraduationCap,
  other: FolderOpen,
}

const MENTION_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  blog: FileText,
  tutorial: BookOpen,
  project: Folder,
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const ids = getAllCollectionIds()
  return ids.map((id) => ({ slug: id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const item = getCollectionItemById(slug)
  if (!item) {
    return { title: "Resource Not Found" }
  }
  return {
    title: `${item.title} | Curated Resources | AI Shipping Labs`,
    description: item.description,
  }
}

export default async function CollectionResourcePage({ params }: PageProps) {
  const { slug } = await params
  const item = getCollectionItemById(slug)

  if (!item) {
    notFound()
  }

  const mentions = getPagesMentioningCollectionId(slug)
  const Icon = CATEGORY_ICONS[item.category]
  const categoryLabel = COLLECTION_CATEGORIES[item.category].label

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <article className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link
              href="/collection"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Curated Links
            </Link>

            <header className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
                <Icon className="h-4 w-4" />
                {categoryLabel}
              </div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {item.title}
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                {item.description}
              </p>
              {item.source && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Source: {item.source}
                </p>
              )}
            </header>

            {/* Visit source (external link) */}
            {item.url.startsWith("http") && (
              <div className="mb-12">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20 hover:border-accent"
                >
                  Visit source
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            {/* Mentioned on this site */}
            {mentions.length > 0 && (
              <div className="rounded-lg border border-border bg-card/50 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <FileText className="h-5 w-5 text-accent" />
                  Mentioned on this site
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Pages that reference this resource for internal linking.
                </p>
                <ul className="space-y-3">
                  {mentions.map((m) => {
                    const MentionIcon = MENTION_TYPE_ICONS[m.type] ?? FileText
                    return (
                      <li key={`${m.type}-${m.slug}`}>
                        <Link
                          href={m.href}
                          className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors hover:border-accent/50 hover:bg-card"
                        >
                          <MentionIcon className="h-4 w-4 shrink-0 text-accent" />
                          <span className="font-medium">{m.title}</span>
                          <span className="ml-auto text-xs uppercase tracking-wider text-muted-foreground">
                            {m.type}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
