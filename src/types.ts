export type Tool = "pen" | "line" | "rectangle" | "select" | "eraser"

export type TouchInteraction = "idle" | "pan-zoom" | "tool"
export type IToolInteraction = {
  onTouchDown(point: Point): void
  onTouchMove(point: Point): void
  onTouchUp(point: Point): void
}

export type Point = [number, number]
export type Rect = [Point, Point]

export type Shape = PolyLineShape | SelectShape

export type PolyLineShape = {
  id: string
  type: "polyline"
  boundingRect: Rect
  points: Point[]
  thickness: number
  color: string
}

export type SelectShape = {
  id: string
  type: "select"
  boundingRect: Rect
}
