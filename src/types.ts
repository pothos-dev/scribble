export type ToolType = "pen" | "line" | "rectangle" | "select" | "eraser"

export type InteractionMode = "idle" | "pan-zoom" | "tool"
export type ToolInteraction = {
  onTouchDown(point: Point): void
  onTouchMove(point: Point): void
  onTouchUp(point: Point): void
}
export type ToolDef = {
  createInteraction: () => ToolInteraction
}

export type Point = [number, number]
export type Rect = [Point, Point]

export type ShapeId = string
export type Shape = PolyLineShape | RectShape

export type PolyLineShape = {
  id: ShapeId
  type: "polyline"
  boundingRect: Rect
  points: Point[]
  thickness: number
  color: string
}

export type RectShape = {
  id: ShapeId
  type: "rect"
  boundingRect: Rect
}
