import { shapesManager } from "~/state/ShapesManager"
import type { Tool, IToolInteraction } from "~/types"

export function createToolInteraction(tool: Tool): IToolInteraction {
  if (tool == "pen") {
    return {
      onTouchDown(point) {
        shapesManager().createShape(point)
      },
      onTouchMove(point) {
        shapesManager().addPointToShape(point)
      },
      onTouchUp(point) {},
    }
  }

  if (tool == "eraser") {
    return {
      onTouchDown(point) {},
      onTouchMove(point) {
        shapesManager().eraseShapesNearPoint(point)
      },
      onTouchUp(point) {},
    }
  }

  return {
    onTouchDown(point) {},
    onTouchMove(point) {},
    onTouchUp(point) {},
  }
}
