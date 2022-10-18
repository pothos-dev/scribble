export type Tool = 'pen' | 'line' | 'rectangle'
export type InteractionMode = 'idle' | 'pan-zoom' | 'drawing' | 'erasing'

export type Point = [number, number]
export type Rect = [Point, Point]

export type Shape = {
  type: 'polyline'
  boundingRect: Rect
  points: Point[]
  thickness: number
  color: string
}
