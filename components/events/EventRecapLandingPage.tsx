import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  ExternalLink,
  Mail,
  Rocket,
  Target,
  Users,
  Video,
} from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { getPaymentLink, type StripeTier } from "@/lib/stripe-links"

const keyTopics = [
  {
    title: "The core problem",
    summary:
      "Most builders do not need more information. They need a system that helps them execute consistently.",
  },
  {
    title: "The learning model",
    summary:
      "Learning by building: real projects expose gaps fast and create portfolio evidence you can show publicly.",
  },
  {
    title: "What members do",
    summary:
      "A practical weekly rhythm: accountability circles, group learning, live builds, trend breakdowns, and career support.",
  },
]

const activities = [
  {
    title: "1. Accountability circles",
    hook: "Build in sprints with shared momentum.",
    details: [
      "Pick one project and commit to a defined sprint.",
      "Join regular live check-ins: progress, blockers, next steps.",
      "Get feedback on execution and direction before you drift.",
    ],
  },
  {
    title: "2. Group learning",
    hook: "Turn solo research into shared leverage.",
    details: [
      "Research one concept, workflow, or tool in practice.",
      "Share findings with the community in a reusable format.",
      "Build a practical internal knowledge base over time.",
    ],
  },
  {
    title: "3. Building sessions",
    hook: "Live working sessions, not passive webinars.",
    details: [
      "1.5 to 2-hour sessions once or twice per month.",
      "Topics come from member requests and real projects.",
      "Work through trade-offs together on real implementation problems.",
    ],
  },
  {
    title: "4. Trend breakdowns",
    hook: "Understand trends without chasing hype.",
    details: [
      "Break down one trending idea from an engineering lens.",
      "Focus on what it is, how it works, and where it is useful.",
      "Trace to code and source material for deeper learning.",
    ],
  },
  {
    title: "5. Career support",
    hook: "Get practical support for real career moves.",
    details: [
      "Discuss interviews, offers, salary, LinkedIn, and GitHub.",
      "Learn how to present projects clearly to hiring teams.",
      "Get direct input on positioning and personal brand.",
    ],
  },
]

const earlyMemberFocusAreas = [
  "Build a clearer learning path.",
  "Start or improve a real project.",
  "Prepare for a new role or interview process.",
  "Grow faster in your current role.",
  "Get unstuck and decide what to focus on next.",
]

const earlyMemberPlanSteps = [
  "You get a short set of questions about your background, goals, and current situation.",
  "You can answer in writing or jump on a short live chat.",
  "Alexey reviews your context and prepares a personalized plan.",
  "You use that plan directly inside community sprints and check-ins.",
]

const upcomingEvents = [
  {
    title: "Deploy Your AI Agent Project to Production with FastAPI and a Vector DB",
    date: "Apr 21, Tuesday, 5:00 PM to 6:00 PM CET",
    description:
      "A hands-on session on turning an AI agent or RAG prototype into a production-ready backend with FastAPI, retrieval, indexing, and clean API endpoints.",
    href: "https://luma.com/j1zzd47e",
  },
  {
    title: "Build Your LinkedIn as an AI Builder: 30-Day Posting Challenge",
    date: "Apr 28, Tuesday, 5:00 PM to 6:00 PM CET",
    description:
      "Learn how to turn projects, experiments, and lessons into content and build a lightweight posting workflow for a 30-day challenge.",
    href: "https://luma.com/3jd8wugp",
  },
  {
    title: "Free-Style Interactive Coding Session: Topic Chosen by the Community",
    date: "May 19, Tuesday, 4:00 PM to 5:00 PM CET",
    description:
      "A collaborative coding session shaped by member demand, from agents and RAG to evaluation, deployment, or more experimental topics.",
    href: "https://luma.com/9gms31lk",
  },
  {
    title: "Solving a Real Take-Home Assignment for an AI Engineer Role Live",
    date: "Jun 1, Monday, 5:00 PM to 6:00 PM CET",
    description:
      "Watch Alexey work through a real take-home assignment live and explain his thinking step by step.",
    href: "https://luma.com/8s6lta91",
  },
]

const plans = [
  {
    name: "Basic",
    stripeKey: "basic" as StripeTier,
    label: "Content only",
    description: "Written summaries and selected topic breakdowns.",
    bestFor: "Best if you want the material but do not need the live community layer yet.",
  },
  {
    name: "Main",
    stripeKey: "main" as StripeTier,
    label: "Most popular",
    description: "Full community access: Slack, live sessions, circles, and group activities.",
    bestFor: "Best if you want structure, accountability, and direct participation in the community.",
  },
  {
    name: "Premium",
    stripeKey: "premium" as StripeTier,
    label: "Deepest support",
    description: "Community access plus deeper structured courses shaped by member needs.",
    bestFor: "Best if you want the community plus a more structured learning layer.",
    extras: [
      "Potential course directions include Python for AI Engineering.",
      "Specification-Driven Development for AI.",
      "Refactoring AI-generated code into cleaner systems.",
    ],
  },
]

const faqHighlights = [
  "Yes, system design topics like scalability and latency can be covered based on demand.",
  "Frontend developers can transition by building with TypeScript first and adding Python gradually.",
  "You do not need to look like an expert. Share real progress, decisions, and lessons learned.",
  "Even one to two focused hours per week can be valuable with structure and accountability.",
  "You do not need to match every bullet in job descriptions before applying.",
  "Experienced engineers also benefit by reducing noise and focusing on what matters.",
]

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function EventRecapLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="px-6 pb-14 pt-28 lg:px-8 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-44 w-[85%] rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <Video className="h-3.5 w-3.5" />
                Event Recap
              </div>

              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                AI Shipping Labs Launch Stream Recap
              </h1>

              <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                If you missed the launch stream, this page gives you the key ideas, upcoming events,
                membership options, and the fastest path to join.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  Apr 13, 2026
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4 text-accent" />
                  90-minute live session
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-accent" />
                  Community-focused format
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#plans"
                  className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 ${focusRing}`}
                >
                  Join AI Shipping Labs
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://docs.google.com/document/d/1wbJt-TbULYd4i4IsqFq_q2GiunjhMSXmwGfmjTfKqWo/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary ${focusRing}`}
                >
                  Read the full summary
                  <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
                </a>
              </div>

              <nav
                aria-label="On this page"
                className="mt-8 border-t border-border/80 pt-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Jump to
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {[
                    { href: "#watch-stream", label: "Recording" },
                    { href: "#membership", label: "Highlights" },
                    { href: "#activities", label: "Activities" },
                    { href: "#early-member-plan", label: "Early member plan" },
                    { href: "#upcoming-events", label: "Live sessions" },
                    { href: "#plans", label: "Plans" },
                    { href: "#faq-from-stream", label: "FAQ" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={`rounded-md px-0.5 py-0.5 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline ${focusRing}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section
        id="watch-stream"
        className="scroll-mt-28 px-6 pb-14 lg:px-8 lg:pb-20"
        aria-labelledby="watch-stream-heading"
      >
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/30 p-4 sm:p-6">
            <div id="watch-stream-heading" className="mb-4 flex items-center gap-2 text-sm font-medium text-accent">
              <Video className="h-4 w-4 shrink-0" aria-hidden />
              Watch the launch stream
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-lg shadow-black/40">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/WQAs1LNxdvM"
                title="AI Shipping Labs Launch Stream"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="membership"
        className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Launch stream summary</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What You Need to Know
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {keyTopics.map((section, index) => (
              <article
                key={section.title}
                className="rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-accent/40 hover:bg-card/60"
              >
                <div className="flex items-center gap-2 text-xs font-semibold tabular-nums text-muted-foreground">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                    {index + 1}
                  </span>
                  <span className="uppercase tracking-wide">{section.title}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="activities"
        className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Main Community Activities
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              This is the working format inside the community. It is built to help members ship projects,
              get feedback, and keep momentum.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {activities.map((activity) => (
              <article
                key={activity.title}
                className="flex h-full flex-col rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-accent/40 hover:bg-card/60"
              >
                <h3 className="text-lg font-semibold text-foreground">{activity.title}</h3>
                <p className="mt-2 text-sm font-medium text-foreground/90">{activity.hook}</p>
                <ul className="mt-3 space-y-2">
                  {activity.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Early member value</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Why Joining Early Matters
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              While the community is still small, we can give each member more direct attention. That
              includes personal onboarding and a personalized plan you can use during upcoming
              community sprints.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-accent/30 bg-accent/5 p-5 md:col-span-2">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                <Target className="h-4 w-4" />
                Personalized plan + sprint execution
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You are not just joining generic activities. You get a plan tailored to your goals and
                situation, then apply it inside planned sprints with deadlines and stand-ups. This gives
                you a clear direction and shared accountability from day one.
              </p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent/90">
                  How it works
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {earlyMemberPlanSteps.map((step, index) => (
                    <article
                      key={step}
                      className="rounded-lg border border-accent/20 bg-background/60 p-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="mt-3 rounded-lg border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-foreground/90">
                  Outcome: a personalized plan you execute in sprints with clear milestones and support.
                </div>
              </div>
            </article>

            <article
              id="early-member-plan"
              className="scroll-mt-28 rounded-xl border border-border bg-card/40 p-5"
            >
              <h3 className="text-base font-semibold text-foreground">This plan can focus on:</h3>
              <ul className="mt-3 space-y-2">
                {earlyMemberFocusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#plans"
                className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline ${focusRing}`}
              >
                More about membership plans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card/40 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              This level of personal attention is available because the community is still small. As the
              community grows, we may not be able to offer the same depth of one-to-one planning to
              everyone.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={getPaymentLink("main", true)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 ${focusRing}`}
              >
                Join Main Tier
                <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
              </a>
              <a
                href="mailto:team@aishippinglabs.com"
                className={`inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary ${focusRing}`}
              >
                Ask about your plan
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="upcoming-events"
        className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Upcoming events</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Next Live Sessions
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <article
                key={event.title}
                className="flex h-full flex-col rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-accent/30"
              >
                <h3 className="text-lg font-semibold leading-snug text-foreground">{event.title}</h3>
                <p className="mt-3 inline-flex items-start gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{event.date}</span>
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                <a
                  href={event.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto ${focusRing}`}
                >
                  Register on Luma
                  <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Membership</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Pick the Right Level of Support
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Start with the level that matches how you learn best. You can always move up later as your
              goals change.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex h-full flex-col rounded-xl border p-5 ${
                  plan.name === "Main"
                    ? "border-accent/50 bg-accent/5 shadow-md shadow-accent/5 ring-1 ring-accent/20"
                    : "border-border bg-card/40"
                }`}
              >
                <div className="inline-flex w-fit rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-semibold text-accent">
                  {plan.label}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
                <p className="mt-3 text-sm text-foreground/85">{plan.bestFor}</p>
                {plan.extras && (
                  <ul className="mt-3 space-y-2">
                    {plan.extras.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={getPaymentLink(plan.stripeKey, true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors sm:w-auto ${
                    plan.name === "Main"
                      ? `bg-accent text-accent-foreground hover:bg-accent/90 ${focusRing}`
                      : `bg-secondary text-foreground hover:bg-secondary/80 ${focusRing}`
                  }`}
                >
                  Choose {plan.name}
                  <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready to Join?
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Choose a plan and start building with a focused community that values execution over noise.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#plans"
              className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 ${focusRing}`}
            >
              View plans
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#early-member-plan"
              className={`inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary ${focusRing}`}
            >
              Early member onboarding
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:team@aishippinglabs.com"
              className={`inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary ${focusRing}`}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact team
            </a>
          </div>
        </div>
      </section>

      <Footer showLaunchAnnouncement={false} />
    </main>
  )
}
