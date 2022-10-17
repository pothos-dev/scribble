import { clamp } from '$lib/math'
import { Scroll } from '$stores'
import { get } from 'svelte/store'

export function scrollSync(node: HTMLDivElement) {
  function updateScroll() {
    const [xScroll, yScroll] = get(Scroll)

    const xMin = 0
    const xMax = node.scrollWidth - node.clientWidth
    const x = clamp(xScroll, xMin, xMax)

    const yMin = 0
    const yMax = node.scrollHeight - node.clientHeight
    const y = clamp(yScroll, yMin, yMax)

    node.scrollTo(x, y)
    if (x !== xScroll || y !== yScroll) {
      Scroll.set([x, y])
    }
  }

  const unsubscribe = Scroll.subscribe(updateScroll)
  return {
    destroy() {
      unsubscribe()
    }
  }
}
