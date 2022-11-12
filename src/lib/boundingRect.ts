import type { Point, Rect } from "~/types"

export function isInBoundingRect(
  boundingRect: Rect,
  point: Point,
  margin = 0
): boolean {
  const [min, max] = boundingRect
  return (
    point[0] > min[0] - margin &&
    point[0] < max[0] + margin &&
    point[1] > min[1] - margin &&
    point[1] < max[1] + margin
  )
}

export function extendBoundingRect(boundingRect: Rect, point: Point): Rect {
  const [min, max] = boundingRect
  return [
    [Math.min(min[0], point[0]), Math.min(min[1], point[1])],
    [Math.max(max[0], point[0]), Math.max(max[1], point[1])],
  ]
}
