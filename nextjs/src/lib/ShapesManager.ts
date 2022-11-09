import zustand from "zustand"
import { extendBoundingRect, isInBoundingRect } from "~/lib/boundingRect"
import { useSettings } from "~/lib/Settings"
import type { Point, Shape } from "~/types"

type ShapesManager = {
  shapes: Shape[]

  createShape(point: Point): void
  addPointToShape(point: Point): void
  eraseShapesNearPoint(point: Point): void
}

export const useShapesManager = zustand<ShapesManager>()(set => ({
  shapes: [] as Shape[],

  createShape(point) {
    const { tool, color, thickness } = useSettings.getState()

    const shape: Shape | null =
      tool == "pen"
        ? {
            type: "polyline",
            points: [point],
            boundingRect: [point, point],
            color,
            thickness,
          }
        : tool == "select"
        ? {
            type: "select",
            boundingRect: [point, point],
          }
        : null

    if (shape) {
      set(state => ({ shapes: [...state.shapes, shape] }))
    }
  },

  addPointToShape(point) {
    set(state => {
      let [currentShape, ...shapes] = state.shapes

      // Extend BoundingBox with the new Point
      currentShape.boundingRect = extendBoundingRect(
        currentShape.boundingRect,
        point
      )

      if ("points" in currentShape) {
        currentShape.points = [...currentShape.points, point]
      }

      return { shapes: [currentShape, ...shapes] }
    })
  },

  eraseShapesNearPoint(point) {
    set(state => {
      const minDist = 10

      return {
        shapes: state.shapes.filter(shape => {
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
        }),
      }
    })
  },
}))
