import { TouchInteractionMode, Scroll, ToolInteraction, ActiveTool } from '$stores'
import type { Point } from '$types'
import { size } from 'lodash'
import { get } from 'svelte/store'

export function touchInteraction(node: SVGSVGElement) {
  let activePointers: { [pointerId: string]: string } = {}

  function getPoint(event: PointerEvent): Point {
    // convert to svg coordinates (mm in A4)
    const point = node.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    const svgPoint = point.matrixTransform(node.getScreenCTM()?.inverse())
    return [svgPoint.x, svgPoint.y]
  }

  function onPointerDown(event: PointerEvent) {
    const point = getPoint(event)

    // Remember that this pointer is currently touching the paper
    activePointers[event.pointerId] = event.pointerType

    // Determine the Interaction mode depending on pointer type and active buttons
    if (event.pointerType == 'touch') {
      TouchInteractionMode.set('pan-zoom')
    } else if (event.buttons == 1) {
      TouchInteractionMode.set('tool')
      get(ToolInteraction).onTouchDown(point)
    } else if (event.buttons == 2 || event.buttons == 32) {
      TouchInteractionMode.set('tool')
      ActiveTool.set('eraser')
      get(ToolInteraction).onTouchDown(point)
    }
  }

  function onPointerCancel(event: PointerEvent) {
    get(ToolInteraction).onTouchUp(getPoint(event))

    // The pointer is no longer touching the paper
    delete activePointers[event.pointerId]

    // If no pointer touches the paper anymore, stop the current interaction
    if (size(activePointers) == 0) {
      TouchInteractionMode.set('idle')
    }
  }

  function onPointerMove(event: PointerEvent) {
    const interaction = get(TouchInteractionMode)
    const point = getPoint(event)

    if (interaction == 'pan-zoom') {
      if (!event.isPrimary) return
      let [dx, dy] = get(Scroll)
      dx -= event.movementX
      dy -= event.movementY
      Scroll.set([dx, dy])
    } else if (interaction == 'tool') {
      get(ToolInteraction).onTouchMove(point)
    }
  }

  node.addEventListener('pointerdown', onPointerDown)
  node.addEventListener('pointermove', onPointerMove)
  node.addEventListener('pointerup', onPointerCancel)
  node.addEventListener('pointercancel', onPointerCancel)

  return {
    destroy() {
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerup', onPointerCancel)
      node.removeEventListener('pointercancel', onPointerCancel)
    }
  }
}
