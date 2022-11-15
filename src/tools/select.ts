import { extendBoundingRect } from "~/lib/boundingRect"
import { createId } from "~/lib/createId"
import { RectShape, ToolDef } from "~/types"

export const select: ToolDef = {
  createInteraction() {
    // Remember the current rectangle being drawn by the Select tool
    let rect: RectShape | null = null

    return {
      onTouchDown(point) {
        rect = {
          id: createId(),
          type: "rect",
          boundingRect: [point, point],
        }
      },

      onTouchMove(point) {
        if (!rect) return
        rect.boundingRect = extendBoundingRect(rect.boundingRect, point)
      },

      onTouchUp(point) {
        if (!rect) return
        // todo?
      },
    }
  },
}
