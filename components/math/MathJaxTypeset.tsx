"use client"

import * as React from "react"

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>
      typeset?: (elements?: Element[] | Element) => void
    }
  }
}

async function waitForMathJax(timeoutMs: number = 5000) {
  if (typeof window === "undefined") return
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    if (window.MathJax?.typesetPromise) return
    await new Promise((r) => setTimeout(r, 50))
  }
}

export function MathJaxTypeset({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    ;(async () => {
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs))
      }

      await waitForMathJax()
      if (cancelled) return

      if (window.MathJax?.typesetPromise) {
        await window.MathJax.typesetPromise([el])
      } else if (window.MathJax?.typeset) {
        window.MathJax.typeset([el] as any)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [delayMs])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

