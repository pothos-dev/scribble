import { clamp } from "~/lib/math"
import { useEffect, useRef } from "react"
import { useScroll } from "~/atoms"

export function useScrollSync() {
  const ref = useRef<HTMLDivElement>(null)
  const element = ref.current

  const scroll = useScroll()

  useEffect(() => {
    if (!element) return

    const xMin = 0
    const xMax = element.scrollWidth - element.clientWidth
    const x = clamp(scroll.x, xMin, xMax)

    const yMin = 0
    const yMax = element.scrollHeight - element.clientHeight
    const y = clamp(scroll.y, yMin, yMax)

    element.scrollTo(x, y)
    if (x != scroll.x || y != scroll.y) {
      scroll.setScroll(x, y)
    }
  }, [element, scroll])

  return { ref }
}
