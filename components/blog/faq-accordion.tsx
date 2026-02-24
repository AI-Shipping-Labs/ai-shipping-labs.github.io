'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items?: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  if (!items || items.length === 0) return null

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={item.question ?? index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-base sm:text-lg">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

