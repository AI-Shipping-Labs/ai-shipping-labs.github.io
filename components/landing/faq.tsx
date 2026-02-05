"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Who is Alexey Grigorev?",
    answer: "Alexey Grigorev is a practitioner in AI, data, and engineering with years of hands-on experience building systems at scale. This community is built around his opinionated takes, judgment, and reasoning process—not generic advice or curated content.",
  },
  {
    question: "What makes this different from other tech communities?",
    answer: "Most communities optimize for engagement metrics. This one optimizes for calibration—helping you develop better technical judgment. There's no content for content's sake. Everything is filtered through real-world experience and active practice.",
  },
  {
    question: "What does 'calibration' mean?",
    answer: "Calibration is about refining your instincts for technical decisions. Instead of giving you answers, the goal is to expose you to reasoning patterns, decision frameworks, and feedback that helps you make better calls in your own context.",
  },
  {
    question: "Why is the Inner Circle capped?",
    answer: "Quality feedback requires attention. The Inner Circle is intentionally limited to preserve the depth of interaction. Calibration sessions, teardowns, and 1-on-1 conversations are only valuable if they're not diluted.",
  },
  {
    question: "What if I just want the content without community?",
    answer: "The Supporter tier is designed exactly for this. You get access to written materials, opinionated briefs, and recordings without any expectation of participation. Signal without social overhead.",
  },
  {
    question: "How do live streams work?",
    answer: "Community Members can join live streams, submit questions ahead of time, and ask questions during the session. Topics are influenced by member votes. Supporters get access to recordings only.",
  },
  {
    question: "Can I upgrade or downgrade my tier?",
    answer: "Yes. You can change tiers at any time. Upgrades are prorated. Downgrades take effect at the next billing cycle. Note that Inner Circle upgrades are subject to availability.",
  },
  {
    question: "Is this a course or coaching program?",
    answer: "No. This is a community for practitioners who are already building. There's no curriculum, no certificates, and no structured learning path. It's designed for people who want calibration, not instruction.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">FAQ</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Common questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
