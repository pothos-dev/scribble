import {
  TouchInteractionMode,
  Scroll,
  ToolInteraction,
  ActiveTool,
} from "~/stores"
import type { Point } from "~/types"
import { size } from "lodash"
import { useRef } from "react"

export function useTouchInteraction() {
  let activePointers = useRef<{ [pointerId: string]: string }>({}).current

  const ref = useRef<SVGSVGElement>(null)
  const svg = ref.current!

  function getPoint(event: React.PointerEvent): Point {
    // convert to svg coordinates (mm in A4)
    const point = svg.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse())
    return [svgPoint.x, svgPoint.y]
  }

  function onPointerDown(event: React.PointerEvent) {
    const point = getPoint(event)

    // Remember that this pointer is currently touching the paper
    activePointers[event.pointerId] = event.pointerType

    // Determine the Interaction mode depending on pointer type and active buttons
    if (event.pointerType == "touch") {
      TouchInteractionMode.set("pan-zoom")
    } else if (event.buttons == 1) {
      TouchInteractionMode.set("tool")
      ToolInteraction.get().onTouchDown(point)
    } else if (event.buttons == 2 || event.buttons == 32) {
      TouchInteractionMode.set("tool")
      ActiveTool.set("eraser")
      ToolInteraction.get().onTouchDown(point)
    }
  }

  function onPointerUp(event: React.PointerEvent) {
    onPointerCancel(event)
  }

  function onPointerCancel(event: React.PointerEvent) {
    ToolInteraction.get().onTouchUp(getPoint(event))

    // The pointer is no longer touching the paper
    delete activePointers[event.pointerId]

    // If no pointer touches the paper anymore, stop the current interaction
    if (size(activePointers) == 0) {
      TouchInteractionMode.set("idle")
    }
  }

  function onPointerMove(event: React.PointerEvent) {
    const interaction = TouchInteractionMode.get()
    const point = getPoint(event)

    if (interaction == "pan-zoom") {
      if (!event.isPrimary) return
      let [dx, dy] = Scroll.get()
      dx -= event.movementX
      dy -= event.movementY
      Scroll.set([dx, dy])
    } else if (interaction == "tool") {
      ToolInteraction.get().onTouchMove(point)
    }
  }

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  }
}
