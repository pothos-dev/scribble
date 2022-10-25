import { extendBoundingRect, isInBoundingRect } from "~/lib/boundingRect"
import { ActiveTool, Color, Shapes, Thickness } from "~/stores"
import type { Point, Shape } from "~/types"

export function createShape(point: Point) {
  const tool = ActiveTool.get()

  const shape: Shape | null =
    tool == "pen"
      ? {
          type: "polyline",
          points: [point],
          boundingRect: [point, point],
          color: Color.get(),
          thickness: Thickness.get(),
        }
      : tool == "select"
      ? {
          type: "select",
          boundingRect: [point, point],
        }
      : null

  if (shape) {
    Shapes.set([shape, ...Shapes.get()])
  }
}

export function addPointToShape(point: Point) {
  let [currentShape, ...shapes] = Shapes.get()

  // Extend BoundingBox with the new Point
  currentShape.boundingRect = extendBoundingRect(
    currentShape.boundingRect,
    point
  )

  if ("points" in currentShape) {
    currentShape.points = [...currentShape.points, point]
  }

  Shapes.set([currentShape, ...shapes])
}

export function eraseShapesNearPoint(point: Point) {
  const minDist = 10

  Shapes.set(
    Shapes.get().filter(shape => {
      if (!isInBoundingRect(shape.boundingRect, point, minDist)) {
        return true
      }

      if (shape.type == "polyline") {
        const pointIsNearLine = shape.points.some(shapePoint => {
          const dx = shapePoint[0] - point[0]
          const dy = shapePoint[1] - point[1]
          const sqDist = dx * dx + dy * dy
          return sqDist < minDist * minDist
        })

        return !pointIsNearLine
      }

      return true
    })
  )
}
