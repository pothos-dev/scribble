import { Color, Shapes, Thickness } from '$stores'
import type { Point } from '$types'
import { get } from 'svelte/store'

export function createShape(point: Point) {
  Shapes.set([
    {
      type: 'polyline',
      points: [point],
      boundingRect: [point, point],
      color: get(Color),
      thickness: get(Thickness)
    },
    ...get(Shapes)
  ])
}

export function addPointToShape(point: Point) {
  let [currentShape, ...shapes] = get(Shapes)
  currentShape.points = [...currentShape.points, point]
  currentShape.boundingRect = [
    [
      Math.min(currentShape.boundingRect[0][0], point[0]),
      Math.min(currentShape.boundingRect[0][1], point[1])
    ],
    [
      Math.max(currentShape.boundingRect[1][0], point[0]),
      Math.max(currentShape.boundingRect[1][1], point[1])
    ]
  ]
  Shapes.set([currentShape, ...shapes])
}

export function eraseShapesNearPoint(point: Point) {
  // Drop all shapes that are close to the pointer (10px)
  const minDist = 10

  Shapes.set(
    get(Shapes).filter(shape => {
      const [min, max] = shape.boundingRect
      const pointIsInRect =
        point[0] > min[0] - minDist &&
        point[0] < max[0] + minDist &&
        point[1] > min[1] - minDist &&
        point[1] < max[1] + minDist

      if (!pointIsInRect) return true

      const pointIsNearLine = shape.points.some(shapePoint => {
        const dx = shapePoint[0] - point[0]
        const dy = shapePoint[1] - point[1]
        const sqDist = dx * dx + dy * dy
        return sqDist < minDist * minDist
      })

      return !pointIsNearLine
    })
  )
}
