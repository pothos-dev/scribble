import type { Point } from "~/types"
import { size } from "lodash"
import { useRef } from "react"
import { useInteraction, useScroll } from "~/atoms"

export function useTouchInteraction() {
  let activePointers = useRef<{ [pointerId: string]: string }>({}).current

  const ref = useRef<SVGSVGElement>(null)

  function getPoint(event: React.PointerEvent): Point {
    // convert to svg coordinates (mm in A4)
    const point = ref.current!.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    const svgPoint = point.matrixTransform(
      ref.current!.getScreenCTM()?.inverse()
    )
    return [svgPoint.x, svgPoint.y]
  }

  function onPointerDown(event: React.PointerEvent) {
    const point = getPoint(event)

    // Remember that this pointer is currently touching the paper
    activePointers[event.pointerId] = event.pointerType

    // Determine the Interaction mode depending on pointer type and active buttons
    if (event.pointerType == "touch") {
      useInteraction.getState().startPanZoom(point)
    } else if (event.buttons == 1) {
      useInteraction.getState().startTool(point)
    } else if (event.buttons == 2 || event.buttons == 32) {
      useInteraction.getState().startEraser(point)
    }
  }

  function onPointerUp(event: React.PointerEvent) {
    onPointerCancel(event)
  }

  function onPointerCancel(event: React.PointerEvent) {
    useInteraction.getState().tool.onTouchUp(getPoint(event))

    // The pointer is no longer touching the paper
    delete activePointers[event.pointerId]

    // If no pointer touches the paper anymore, stop the current interaction
    if (size(activePointers) == 0) {
      useInteraction.getState().stopInteraction()
    }
  }

  function onPointerMove(event: React.PointerEvent) {
    const interaction = useInteraction.getState().mode

    if (interaction == "pan-zoom") {
      if (!event.isPrimary) return
      const { x, y, setScroll } = useScroll.getState()
      setScroll(x - event.movementX, y - event.movementY)
    } else if (interaction == "tool") {
      useInteraction.getState().tool.onTouchMove(getPoint(event))
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
