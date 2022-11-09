import { clamp } from "lodash"
import { useRef, useEffect } from "react"
import zustand from "zustand"

type ScrollState = {
  x: number
  y: number
  setScroll(x: number, y: number): void
}
export const useScrollState = zustand<ScrollState>()(set => ({
  x: 0,
  y: 0,
  setScroll: (x, y) => set({ x, y }),
}))

export function useScrollSync() {
  const ref = useRef<HTMLDivElement>(null)
  const element = ref.current

  const scroll = useScrollState()

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
