export type Tool = 'pen' | 'line' | 'rectangle' | 'select'
export type InteractionMode = 'idle' | 'pan-zoom' | 'drawing' | 'erasing'

export type Point = [number, number]
export type Rect = [Point, Point]

export type Shape = PolyLineShape | SelectShape

export type PolyLineShape = {
  type: 'polyline'
  boundingRect: Rect
  points: Point[]
  thickness: number
  color: string
}

export type SelectShape = {
  type: 'select'
  boundingRect: Rect
}
