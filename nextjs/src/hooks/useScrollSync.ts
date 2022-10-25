import { clamp } from "~/lib/math"
import { Scroll } from "~/stores"
import { useEffect, useRef } from "react"
import { useHookstate } from "@hookstate/core"

export function useScrollSync() {
  const ref = useRef<HTMLElement>(null)
  const element = ref.current

  const [xScroll, yScroll] = useHookstate(Scroll).get()

  useEffect(() => {
    if (!element) return

    const xMin = 0
    const xMax = element.scrollWidth - element.clientWidth
    const x = clamp(xScroll, xMin, xMax)

    const yMin = 0
    const yMax = element.scrollHeight - element.clientHeight
    const y = clamp(yScroll, yMin, yMax)

    element.scrollTo(x, y)
    if (x != xScroll || y != yScroll) {
      Scroll.set([x, y])
    }
  }, [element, xScroll, yScroll])

  return { ref }
}
