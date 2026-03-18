import Link from "next/link"
import { ArrowRight, BookOpen, BrainCircuit } from "lucide-react"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata = {
  title: "AI Engineer Resources | AI Shipping Labs",
  description: "Navigation hub for the AI Engineer Learning Path and interview questions.",
}

export default function AiEngineerResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="mb-12">
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
                <BrainCircuit className="h-4 w-4" />
                AI Engineer Resources
              </p>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with the core tracks
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Start with the core learning path, then expand with focused interview
                practice. More resources are coming soon.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/ai-engineer-learning-path"
                className="group rounded-lg border border-border bg-card/40 p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      AI Engineer Learning Path
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      A visual learning path for becoming an AI engineer in 2026.
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </Link>

              <Link
                href="/ai-engineer-interview-questions/llm"
                className="group rounded-lg border border-border bg-card/40 p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      AI Engineer Interview Questions / LLM
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      60+ LLM interview questions with answers.
                    </p>
                  </div>
                  <BookOpen className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </Link>
            </div>

            <div className="mt-10 rounded-lg border border-border bg-card/30 p-6">
              <h2 className="text-lg font-semibold text-foreground">More coming soon</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Additional tracks (system design, RAG, agents, portfolio tear-downs) will be
                added here over time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

