import { shapesManager } from "~/state/ShapesManager"
import type { Tool, IToolInteraction } from "~/types"

export function createToolInteraction(tool: Tool): IToolInteraction {
  const { createShape, addPointToShape, eraseShapesNearPoint } = shapesManager()

  if (tool == "pen") {
    return {
      onTouchDown(point) {
        createShape(point)
      },
      onTouchMove(point) {
        addPointToShape(point)
      },
      onTouchUp(point) {},
    }
  }

  if (tool == "eraser") {
    return {
      onTouchDown(point) {},
      onTouchMove(point) {
        eraseShapesNearPoint(point)
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
