"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ExpandableQaItem {
  question: string
  answerHtml: string
}

export interface ExpandableQaListProps {
  items: ExpandableQaItem[]
  defaultExpanded?: boolean
  defaultPreviewLines?: 2 | 3 | 4
}

function keyForItem(item: ExpandableQaItem, index: number) {
  return `${index}-${item.question}`
}

export function ExpandableQaList({
  items,
  defaultExpanded = false,
  defaultPreviewLines = 3,
}: ExpandableQaListProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() => {
    if (!defaultExpanded) return {}
    const init: Record<string, boolean> = {}
    items.forEach((item, index) => {
      init[keyForItem(item, index)] = true
    })
    return init
  })

  if (!items || items.length === 0) return null

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({})
  const prevExpandedRef = React.useRef<Record<string, boolean>>({})

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    ;(async () => {
      const start = Date.now()
      while (Date.now() - start < 5000) {
        const mj = (window as any).MathJax
        if (mj?.typesetPromise) break
        await new Promise((r) => setTimeout(r, 50))
      }

      if (cancelled) return

      const mj = (window as any).MathJax
      if (mj?.typesetPromise) {
        await mj.typesetPromise([el])
      } else if (mj?.typeset) {
        mj.typeset([el] as any)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  // Re-typeset MathJax for newly expanded items. In collapsed mode the
  // content is line-clamped, and some MathJax layouts don't fully render.
  React.useEffect(() => {
    const prev = prevExpandedRef.current
    const newlyOpenedKeys = Object.keys(expanded).filter(
      (key) => expanded[key] && !prev[key]
    )
    prevExpandedRef.current = expanded

    if (newlyOpenedKeys.length === 0) return

    const elementsToTypeset = newlyOpenedKeys
      .map((key) => itemRefs.current[key])
      .filter((x): x is HTMLDivElement => Boolean(x))

    if (elementsToTypeset.length === 0) return

    let cancelled = false
    ;(async () => {
      const start = Date.now()
      while (Date.now() - start < 5000) {
        const mj = (window as any).MathJax
        if (mj?.typesetPromise) break
        await new Promise((r) => setTimeout(r, 50))
      }
      if (cancelled) return

      const mj = (window as any).MathJax
      if (mj?.typesetPromise) {
        await mj.typesetPromise(elementsToTypeset)
      } else if (mj?.typeset) {
        mj.typeset(elementsToTypeset as any)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [expanded])

  return (
    <div ref={containerRef} className="space-y-3">
      {items.map((item, index) => {
        const key = keyForItem(item, index)
        const isOpen = Boolean(expanded[key])
        const hasAnswer = item.answerHtml.trim().length > 0
        const clampClass =
          defaultPreviewLines === 2
            ? "line-clamp-2"
            : defaultPreviewLines === 4
              ? "line-clamp-4"
              : "line-clamp-3"

        return (
          <div
            key={key}
            className="rounded-lg border border-border bg-card/30 px-4 py-3"
          >
            <div className="flex w-full items-start justify-between gap-4 text-left">
              <span className="text-base font-medium text-foreground">
                {item.question}
              </span>
              {hasAnswer ? (
                <button
                  type="button"
                  className="mt-0.5 text-muted-foreground"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                >
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              ) : null}
            </div>

            {hasAnswer ? (
              <div className="mt-2">
              <div
                className={cn(
                  "prose prose-invert max-w-none text-sm leading-relaxed text-muted-foreground",
                  !isOpen && clampClass
                )}
                ref={(node) => {
                  itemRefs.current[key] = node
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-widest text-accent hover:underline"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                >
                  {isOpen ? "Show less" : "Show more"}
                </button>
              </div>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

