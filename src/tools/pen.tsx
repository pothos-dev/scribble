import { Shape } from "~/components/Paper/Shape"
import { simplificationTolerance } from "~/consts"
import { extendBoundingRect } from "~/lib/boundingRect"
import { createId } from "~/lib/createId"
import { simplifyPolyLine } from "~/lib/simplifyPolyLine"
import { settings } from "~/state/Settings"
import { shapesManager } from "~/state/ShapesManager"
import { PolyLineShape, ToolDef } from "~/types"

export const pen: ToolDef = {
  createInteraction() {
    // Remember the current shape being drawn by the Pen
    let polyline: PolyLineShape | null = null

    return {
      onTouchDown(point) {
        // Start a new shape on touch down
        polyline = {
          id: createId(),
          type: "polyline",
          points: [point],
          boundingRect: [point, point],
          color: settings().color,
          thickness: settings().thickness,
        }

        shapesManager().addShape(polyline)
      },

      onTouchMove(point) {
        if (!polyline) return
        // Add the new point to the shape
        polyline.boundingRect = extendBoundingRect(polyline.boundingRect, point)
        polyline.points.push(point)
      },

      onTouchUp() {
        if (!polyline) return
        // Simplify the shape, then add it to the shapesManager
        polyline.points = simplifyPolyLine(
          polyline.points,
          simplificationTolerance
        )
        shapesManager().addShape(polyline)
        polyline = null
      },

      render() {
        if (!polyline) return null
        return <Shape shape={polyline} />
      },
    }
  },
}
