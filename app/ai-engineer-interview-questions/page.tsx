import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

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

const categories = [
  {
    slug: "theory-interview-questions",
    title: "Theory",
    description: "LLMs, RAG, agents, ML fundamentals, company-specific questions",
    comingSoon: false,
  },
  {
    slug: "coding-interview-questions",
    title: "Coding",
    description: "Coding round formats, DSA problems, ML implementation exercises (coming soon)",
    comingSoon: true,
  },
  {
    slug: "project-deep-dive-interview-questions",
    title: "Project Deep Dive",
    description: "Presentation rounds, follow-up probes, what interviewers evaluate (coming soon)",
    comingSoon: true,
  },
  {
    slug: "ai-system-design-interview-questions",
    title: "AI System Design",
    description: "System design for AI applications (coming soon)",
    comingSoon: true,
  },
  {
    slug: "behavioral-interview-questions",
    title: "Behavioral",
    description: "Values, leadership, problem-solving (coming soon)",
    comingSoon: true,
  },
  {
    slug: "home-assignments-interview-questions",
    title: "Home Assignments",
    description:
      "17 take-home assignments and 5 paid work trials analyzed in detail (coming soon)",
    comingSoon: true,
  },
]

export const metadata = {
  title: "Interview Questions | AI Shipping Labs",
  description:
    "Consolidated from 100+ sources including blog posts, YouTube transcripts, Reddit threads, Medium articles, and interview guides.",
}

export default function AiEngineerInterviewQuestionsHubPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="mb-12">
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Interview Questions</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
                <BookOpen className="h-4 w-4" />
                AI Engineer Interview Questions
              </p>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Interview Questions
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                Consolidated from 100+ sources including blog posts, YouTube transcripts,
                Reddit threads, Medium articles, and interview guides.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className={[
                    "group rounded-lg border border-border bg-card/40 p-6 transition-colors",
                    category.comingSoon ? "cursor-not-allowed opacity-60" : "hover:border-accent/50",
                  ].join(" ")}
                  aria-disabled={category.comingSoon ? "true" : "false"}
                >
                  {category.comingSoon ? (
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                      Coming soon
                    </p>
                  ) : null}

                  {category.comingSoon ? (
                    <div className="mt-4">
                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold text-foreground">
                          {category.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {category.description.replace(" (coming soon)", "")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={`/ai-engineer-interview-questions/${category.slug}`}
                      className="mt-4 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                          {category.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
