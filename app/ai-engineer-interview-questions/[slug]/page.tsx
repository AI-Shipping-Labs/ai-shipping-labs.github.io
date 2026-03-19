import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  getAllInterviewQuestionsPages,
  getInterviewQuestionsPageBySlug,
} from "@/lib/interview-questions"
import { ExpandableQaList } from "@/components/interview-questions/expandable-qa-list"
import { MathJaxTypeset } from "@/components/math/MathJaxTypeset"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getAllInterviewQuestionsPages()
  // Static export requires at least one path; use placeholder when empty
  if (pages.length === 0) return [{ slug: "_" }]
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getInterviewQuestionsPageBySlug(slug)

  if (!page) return { title: "Page Not Found" }

  return {
    title: `${page.title} | AI Shipping Labs`,
    description: page.description,
  }
}

export default async function InterviewQuestionsPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getInterviewQuestionsPageBySlug(slug)

  if (!page) {
    if (slug === "_") {
      return (
        <>
          <Header />
          <main className="min-h-screen pt-24">
            <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/ai-engineer-interview-questions">
                        AI Engineer Interview Questions
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Coming soon</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <p className="text-muted-foreground">Coming soon.</p>
            </div>
          </main>
          <Footer />
        </>
      )
    }
    notFound()
  }

  const tocItems = [
    ...page.prefaceSections.map((section) => ({
      id: section.id,
      title: section.title,
      level: 0 as const,
    })),
    ...(page.prefaceSections.length === 0 && page.introHtml.trim().length > 0
      ? [
          {
            id: "intro",
            title: page.introTitle || "Introduction",
            level: 0 as const,
          },
        ]
      : []),
    ...(page.sections.length > 0
      ? [{ id: "questions", title: "Questions", level: 0 as const }]
      : []),
    ...page.sections.map((section) => ({
      id: section.id,
      title: section.title,
      level: 1 as const,
    })),
    ...page.appendixSections.map((section) => ({
      id: section.id,
      title: section.title,
      level: 0 as const,
    })),
    ...(page.appendixSections.length === 0 && page.outroHtml.trim().length > 0
      ? [
          {
            id: "outro",
            title: page.outroTitle || "Conclusion",
            level: 0 as const,
          },
        ]
      : []),
  ]

  const firstPrefaceSection = page.prefaceSections[0]
  const remainingPrefaceSections = page.prefaceSections.slice(1)
  const usesLegacyIntro = page.prefaceSections.length === 0 && page.introHtml.trim().length > 0
  const firstQuestionSection = !firstPrefaceSection && !usesLegacyIntro ? page.sections[0] : null
  const remainingQuestionSections = firstQuestionSection ? page.sections.slice(1) : page.sections
  const showQuestionsBeforeToc = Boolean(firstQuestionSection)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <article className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/ai-engineer-interview-questions">
                      AI Engineer Interview Questions
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{page.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <header className="mb-10">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                AI Engineer Interview Questions
              </p>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {page.title}
              </h1>
              {page.description && (
                <p className="mt-4 text-xl text-muted-foreground">{page.description}</p>
              )}
            </header>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="min-w-0">
                {firstPrefaceSection && (
                  <section id={firstPrefaceSection.id} className="scroll-mt-28">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {firstPrefaceSection.title}
                    </h2>
                    <MathJaxTypeset>
                      <div
                        className="prose prose-invert prose-lg mt-4 max-w-none"
                        dangerouslySetInnerHTML={{ __html: firstPrefaceSection.html }}
                      />
                    </MathJaxTypeset>
                  </section>
                )}

                {usesLegacyIntro && (
                  <section id="intro" className="scroll-mt-28">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {page.introTitle || "Introduction"}
                    </h2>
                    <MathJaxTypeset>
                      <div
                        className="prose prose-invert prose-lg mt-4 max-w-none"
                        dangerouslySetInnerHTML={{ __html: page.introHtml }}
                      />
                    </MathJaxTypeset>
                  </section>
                )}

                {showQuestionsBeforeToc && (
                  <section id="questions" className="mt-10 scroll-mt-28">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Questions</h2>
                    {firstQuestionSection && (
                      <section id={firstQuestionSection.id} className="mt-8 scroll-mt-28">
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {firstQuestionSection.title}
                        </h3>
                        {firstQuestionSection.intro && (
                          <p className="mt-2 text-muted-foreground leading-relaxed">
                            {firstQuestionSection.intro}
                          </p>
                        )}
                        <div className="mt-6">
                          <ExpandableQaList
                            items={firstQuestionSection.qa}
                            defaultPreviewLines={3}
                            defaultExpanded={false}
                          />
                        </div>
                      </section>
                    )}
                    {remainingQuestionSections.map((section) => (
                      <section key={section.id} id={section.id} className="mt-10 scroll-mt-28">
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {section.title}
                        </h3>
                        {section.intro && (
                          <p className="mt-2 text-muted-foreground leading-relaxed">{section.intro}</p>
                        )}
                        <div className="mt-6">
                          <ExpandableQaList
                            items={section.qa}
                            defaultPreviewLines={3}
                            defaultExpanded={false}
                          />
                        </div>
                      </section>
                    ))}
                  </section>
                )}

                <div className="mt-8 lg:hidden">
                  <div className="rounded-lg border border-border bg-card/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                      Table of contents
                    </p>
                    <nav className="mt-3">
                      <ul className="space-y-2 text-sm">
                        {tocItems.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={`transition-colors hover:text-foreground ${
                                item.level === 1
                                  ? "pl-4 text-xs text-muted-foreground/90"
                                  : "text-sm text-muted-foreground"
                              }`}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>

                {remainingPrefaceSections.length > 0 && (
                  <div className="mt-10 space-y-12">
                    {remainingPrefaceSections.map((section) => (
                      <section key={section.id} id={section.id} className="scroll-mt-28">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                          {section.title}
                        </h2>
                        <MathJaxTypeset>
                          <div
                            className="prose prose-invert prose-lg mt-4 max-w-none"
                            dangerouslySetInnerHTML={{ __html: section.html }}
                          />
                        </MathJaxTypeset>
                      </section>
                    ))}
                  </div>
                )}

                {!showQuestionsBeforeToc && page.sections.length > 0 && (
                  <section id="questions" className="mt-10 scroll-mt-28">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Questions</h2>
                    <div className="mt-8 space-y-12">
                      {page.sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-28">
                          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            {section.title}
                          </h3>
                          {section.intro && (
                            <p className="mt-2 text-muted-foreground leading-relaxed">
                              {section.intro}
                            </p>
                          )}
                          <div className="mt-6">
                            <ExpandableQaList
                              items={section.qa}
                              defaultPreviewLines={3}
                              defaultExpanded={false}
                            />
                          </div>
                        </section>
                      ))}
                    </div>
                  </section>
                )}

                {page.appendixSections.length > 0 ? (
                  <div className="mt-14 space-y-12">
                    {page.appendixSections.map((section) => (
                      <section key={section.id} id={section.id} className="scroll-mt-28">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                          {section.title}
                        </h2>
                        <MathJaxTypeset>
                          <div
                            className="prose prose-invert prose-lg mt-4 max-w-none"
                            dangerouslySetInnerHTML={{ __html: section.html }}
                          />
                        </MathJaxTypeset>
                      </section>
                    ))}
                  </div>
                ) : (
                  page.outroHtml.trim().length > 0 && (
                    <section id="outro" className="mt-14 scroll-mt-28">
                      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {page.outroTitle || "Conclusion"}
                      </h2>
                      <MathJaxTypeset>
                        <div
                          className="prose prose-invert prose-lg mt-4 max-w-none"
                          dangerouslySetInnerHTML={{ __html: page.outroHtml }}
                        />
                      </MathJaxTypeset>
                    </section>
                  )
                )}

                {page.sources && page.sources.length > 0 && (
                  <section className="mt-14 border-t border-border pt-10">
                    <h2 className="text-xl font-semibold tracking-tight">Sources</h2>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {page.sources.map((s) => (
                        <li key={s.url} className="break-words">
                          <a
                            href={s.url}
                            className="text-accent hover:underline underline-offset-4"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 rounded-lg border border-border bg-card/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Table of contents
                  </p>
                  <nav className="mt-3">
                    <ul className="space-y-2 text-sm">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`transition-colors hover:text-foreground ${
                              item.level === 1
                                ? "pl-4 text-xs text-muted-foreground/90"
                                : "text-sm text-muted-foreground"
                            }`}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

