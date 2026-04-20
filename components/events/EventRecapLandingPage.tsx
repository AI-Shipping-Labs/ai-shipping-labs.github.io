import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Mail,
  Target,
  Users,
  Video,
  X,
} from "lucide-react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { getPaymentLink, type StripeTier } from "@/lib/stripe-links"

type TierKey = "basic" | "main" | "premium"


const keyTopics = [
  {
    title: "The core problem",
    summary:
      "The stream argued that many builders need more structure for execution, not more information.",
  },
  {
    title: "The learning model",
    summary:
      "The proposed model is learning by building. Real projects expose gaps quickly and produce concrete work.",
  },
  {
    title: "What members do",
    summary:
      "The format described in the stream includes accountability circles, group learning, live sessions, trend breakdowns, and career support.",
  },
]

const activities = [
  {
    title: "1. Accountability circles",
    hook: "Project-based sprints with regular check-ins.",
    details: [
      "Pick one project and commit to a defined sprint.",
      "Join regular live check-ins: progress, blockers, next steps.",
      "Get feedback on execution and direction before you drift.",
    ],
  },
  {
    title: "2. Group learning",
    hook: "Members research topics and share findings.",
    details: [
      "Research one concept, workflow, or tool in practice.",
      "Share findings with the community in a reusable format.",
      "Build a practical internal knowledge base over time.",
    ],
  },
  {
    title: "3. Building sessions",
    hook: "Live working sessions on implementation questions.",
    details: [
      "1.5 to 2-hour sessions once or twice per month.",
      "Topics come from member requests and real projects.",
      "Work through trade-offs together on real implementation problems.",
    ],
  },
  {
    title: "4. Trend breakdowns",
    hook: "Engineering breakdowns of current topics.",
    details: [
      "Break down one trending idea from an engineering lens.",
      "Focus on what it is, how it works, and where it is useful.",
      "Trace to code and source material for deeper learning.",
    ],
  },
  {
    title: "5. Career support",
    hook: "Discussion of interviews, offers, LinkedIn, GitHub, and positioning.",
    details: [
      "Discuss interviews, offers, salary, LinkedIn, and GitHub.",
      "Learn how to present projects clearly to hiring teams.",
      "Get direct input on positioning and personal brand.",
    ],
  },
]

const onboardingPlanSteps = [
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

const tierOrder: TierKey[] = ["basic", "main", "premium"]

const tierLabels: Record<TierKey, string> = {
  basic: "Basic",
  main: "Main",
  premium: "Premium",
}

const recapCoverage = [
  {
    title: "Community activities from the recap",
    description:
      "Accountability circles, group learning, building sessions, trend breakdowns, and career support.",
    tiers: ["main", "premium"] as TierKey[],
  },
  {
    title: "Live sessions and collaborative environment",
    description:
      "Live sessions and the ongoing working format described in the stream.",
    tiers: ["main", "premium"] as TierKey[],
  },
  {
    title: "Early-member onboarding and personalized plan",
    description:
      "A short intake and onboarding plan while the group is still small.",
    tiers: ["main", "premium"] as TierKey[],
  },
  {
    title: "Courses shaped by member needs",
    description: "Additional structured courses.",
    tiers: ["premium"] as TierKey[],
  },
]

const courseIdeas = [
  "Python for AI Engineering",
  "Specification-Driven Development for AI",
  "Refactoring AI Slop",
]

const plans = [
  {
    name: "Basic",
    stripeKey: "basic" as StripeTier,
    label: "Written resources only",
    scope: "Written resources only.",
    description:
      "Includes event summaries and written breakdowns of selected topics.",
    bestFor: "Does not include Slack, live sessions, group activities, or onboarding.",
    features: [
      "Premium written resources",
      "Event summaries",
      "Written breakdowns of selected topics",
    ],
    exclusions: [
      "No Slack or collaborative environment",
      "No live sessions or accountability circles",
      "No early-member onboarding or personalized plan",
    ],
    cta: "Choose Basic",
  },
  {
    name: "Main",
    stripeKey: "main" as StripeTier,
    label: "Community access",
    scope: "Covers the formats described in this recap.",
    description:
      "Includes Slack, accountability circles, group activities, live sessions, and onboarding while available.",
    bestFor: "This is the tier that matches the recap content.",
    features: [
      "Slack and community access",
      "Accountability circles and group activities",
      "Live sessions, feedback loops, and early-member onboarding",
    ],
    cta: "Join Main community",
  },
  {
    name: "Premium",
    stripeKey: "premium" as StripeTier,
    label: "Main + courses",
    scope: "Includes the full recap experience and adds courses on top.",
    description:
      "Includes all Main access plus course access.",
    bestFor: "Use this if you want the recap format and courses.",
    features: [
      "Everything in Main",
      "Course access",
    ],
    extras: courseIdeas,
    disclaimer:
      "These course ideas are examples, not fixed promises. The roadmap depends on member needs.",
    cta: "Join Premium + courses",
  },
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
                This page summarizes the launch stream, the activity format, upcoming sessions, and
                how the recap maps to the membership tiers.
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
                  Launch session
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#watch-stream"
                  className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 ${focusRing}`}
                >
                  Watch the recording
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
                    { href: "#membership", label: "Highlights" },
                    { href: "#activities", label: "Activities" },
                    { href: "#watch-stream", label: "Recording" },
                    { href: "#upcoming-events", label: "Live sessions" },
                    { href: "#membership-map", label: "Plan fit" },
                    { href: "#plans", label: "Plans" },
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
        className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20"
        aria-labelledby="watch-stream-heading"
      >
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/30 p-4 sm:p-6">
            <div className="mb-4">
              <div id="watch-stream-heading" className="flex items-center gap-2 text-sm font-medium text-accent">
                <Video className="h-4 w-4 shrink-0" aria-hidden />
                Watch the launch stream
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Full recording of the launch session.
              </p>
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
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Community overview</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Main points from the recap
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              The stream centered on three ideas: execution, learning by building, and collaboration.
            </p>
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
              Recurring formats inside the community
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              These are the ongoing formats described in the stream.
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

      <section
        id="activities"
        className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Early Member Benefit
            </h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  <Target className="h-4 w-4" />
                  Main and Premium currently include more direct onboarding
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  While the group is still small, onboarding can include a personalized plan used in
                  sprints and check-ins.
                </p>
              </div>
              <a
                href="mailto:team@aishippinglabs.com"
                className={`inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary ${focusRing}`}
              >
                Ask a question
              </a>
            </div>

            <div className="mt-5 rounded-xl border border-accent/20 bg-background/70 p-5">
              <h3 className="text-base font-semibold text-foreground">
                Personalized plan + sprint execution
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You get a plan tailored to your goals and current situation, then use it inside
                planned sprints with deadlines and check-ins. The goal is to make the next steps
                explicit from the start.
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                How it works
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {onboardingPlanSteps.map((step, index) => (
                  <article
                    key={step}
                    className="rounded-lg border border-accent/15 bg-card/40 p-4"
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

              <div className="mt-3 rounded-lg border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-foreground/90">
                Outcome: a personalized plan used in sprints with milestones and support.
              </div>
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
              Next Live Building Sessions
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Upcoming building sessions related to the format described in the stream.
            </p>
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

      <section
        id="membership-map"
        className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">Membership context</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                How this recap maps to the tiers
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The recap describes the Main and Premium tiers. Basic is limited to written resources.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <div className="min-w-[700px] rounded-xl border border-border bg-background/70">
                <div className="grid grid-cols-[minmax(0,1.9fr)_repeat(3,minmax(92px,1fr))] gap-3 border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <div>Included in this recap</div>
                  {tierOrder.map((tier) => (
                    <div key={tier} className="text-center">
                      {tierLabels[tier]}
                    </div>
                  ))}
                </div>

                {recapCoverage.map((item) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-[minmax(0,1.9fr)_repeat(3,minmax(92px,1fr))] gap-3 border-b border-border/70 px-4 py-4 last:border-b-0"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    {tierOrder.map((tier) => {
                      const included = item.tiers.includes(tier)

                      return (
                        <div key={tier} className="flex items-center justify-center">
                          <span
                            className={`inline-flex min-w-20 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              included
                                ? "bg-accent/12 text-accent"
                                : "bg-muted/50 text-muted-foreground/70"
                            }`}
                          >
                            {included ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                Included
                              </>
                            ) : (
                              <>
                                <X className="h-3.5 w-3.5" />
                                No
                              </>
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-28 border-t border-border px-6 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Plans</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Membership plans
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              These are the three plan types referenced by the recap.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex h-full flex-col rounded-xl border p-5 ${
                  plan.name === "Main"
                    ? "border-accent/50 bg-accent/5 shadow-md shadow-accent/5 ring-1 ring-accent/20"
                    : plan.name === "Premium"
                      ? "border-foreground/20 bg-card/60 shadow-sm"
                    : "border-border bg-card/40"
                }`}
              >
                <div
                  className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    plan.name === "Basic"
                      ? "border-border/70 bg-background/70 text-muted-foreground"
                      : "border-accent/30 bg-accent/10 text-accent"
                  }`}
                >
                  {plan.label}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{plan.name}</h3>
                <p
                  className={`mt-2 text-sm ${
                    plan.name === "Basic" ? "text-muted-foreground" : "text-accent"
                  }`}
                >
                  {plan.scope}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
                <p className="mt-3 text-sm text-foreground/85">{plan.bestFor}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {plan.exclusions && (
                  <div className="mt-4 rounded-lg border border-dashed border-border bg-background/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Not included here
                    </p>
                    <ul className="mt-2 space-y-2">
                      {plan.exclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                            <X className="h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                {plan.disclaimer && (
                  <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {plan.disclaimer}
                  </div>
                )}
                <a
                  href={getPaymentLink(plan.stripeKey, true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors sm:w-auto ${
                    plan.name === "Main"
                      ? `bg-accent text-accent-foreground hover:bg-accent/90 ${focusRing}`
                      : plan.name === "Premium"
                        ? `bg-foreground text-background hover:bg-foreground/90 ${focusRing}`
                      : `bg-secondary text-foreground hover:bg-secondary/80 ${focusRing}`
                  }`}
                >
                  {plan.cta}
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
            Membership links
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Use these links to view the tier mapping or open the Main plan directly.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#membership-map"
              className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 ${focusRing}`}
            >
              See how tiers map
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={getPaymentLink("main", true)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary ${focusRing}`}
            >
              Join Main community
              <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
            </a>
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
