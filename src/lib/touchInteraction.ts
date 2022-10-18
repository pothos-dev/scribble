import { Color, Shapes, Interaction, Scroll, Thickness } from '$stores'
import { size } from 'lodash'
import { get } from 'svelte/store'

export function touchInteraction(node: SVGSVGElement) {
  let activePointers: { [pointerId: string]: string } = {}

  function onPointerDown(event: PointerEvent) {
    // Remember that this pointer is currently touching the paper
    activePointers[event.pointerId] = event.pointerType

    // Determine the Interaction mode depending on pointer type and active buttons
    if (event.pointerType == 'touch') {
      Interaction.set('pan-zoom')
    } else if (event.buttons == 1) {
      Interaction.set('drawing')
      startDrawing()
      addPointToShape(event)
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

    if (interaction == 'pan-zoom') {
      if (!event.isPrimary) return
      let [dx, dy] = get(Scroll)
      dx -= event.movementX
      dy -= event.movementY
      Scroll.set([dx, dy])
    } else if (interaction == 'drawing') {
      addPointToShape(event)
    } else if (interaction == 'erasing') {
      eraseShapesNearPoint(event)
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

function startDrawing() {
  Shapes.set([
    {
      type: 'polyline',
      points: [],
      color: get(Color),
      thickness: get(Thickness)
    },
    ...get(Shapes)
  ])
}

function addPointToShape(event: PointerEvent) {
  let [currentShape, ...shapes] = get(Shapes)
  currentShape.points = [...currentShape.points, [event.offsetX, event.offsetY]]
  Shapes.set([currentShape, ...shapes])
}

function eraseShapesNearPoint(event: PointerEvent) {
  // Drop all shapes that are close to the pointer (10px)
  const minDist = 10
  Shapes.set(
    get(Shapes).filter(drawing =>
      drawing.points.every(point => {
        const dx = point[0] - event.offsetX
        const dy = point[1] - event.offsetY
        const sqDist = dx * dx + dy * dy
        return sqDist > minDist * minDist
      })
    )
  )
}