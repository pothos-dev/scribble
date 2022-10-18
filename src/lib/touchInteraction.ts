import { addPointToShape, createShape, eraseShapesNearPoint } from '$lib/shapes'
import { Interaction, Scroll } from '$stores'
import type { Point } from '$types'
import { size } from 'lodash'
import { get } from 'svelte/store'

export function touchInteraction(node: SVGSVGElement) {
  let activePointers: { [pointerId: string]: string } = {}

  function onPointerDown(event: PointerEvent) {
    const point = getPoint(event)

    // Remember that this pointer is currently touching the paper
    activePointers[event.pointerId] = event.pointerType

    // Determine the Interaction mode depending on pointer type and active buttons
    if (event.pointerType == 'touch') {
      Interaction.set('pan-zoom')
    } else if (event.buttons == 1) {
      Interaction.set('drawing')
      createShape(point)
    } else if (event.buttons == 2 || event.buttons == 32) {
      Interaction.set('erasing')
    }
  }

  function onPointerCancel(event: PointerEvent) {
    // The pointer is no longer touching the paper
    delete activePointers[event.pointerId]

    // If no pointer touches the paper anymore, stop the current interaction
    if (size(activePointers) == 0) {
      Interaction.set('idle')
    }
  }

  function onPointerMove(event: PointerEvent) {
    const interaction = get(Interaction)
    const point = getPoint(event)

    if (interaction == 'pan-zoom') {
      if (!event.isPrimary) return
      let [dx, dy] = get(Scroll)
      dx -= event.movementX
      dy -= event.movementY
      Scroll.set([dx, dy])
    } else if (interaction == 'drawing') {
      addPointToShape(point)
    } else if (interaction == 'erasing') {
      eraseShapesNearPoint(point)
    }
  }

  node.addEventListener('pointerdown', onPointerDown)
  node.addEventListener('pointermove', onPointerMove)
  node.addEventListener('pointercancel', onPointerCancel)

  return {
    destroy() {
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointercancel', onPointerCancel)
    }
  }
}

function getPoint(event: PointerEvent): Point {
  // convert to svg coordinates (mm in A4)
  const svg = event.target as SVGSVGElement
  const point = svg.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse())
  return [svgPoint.x, svgPoint.y]
}
