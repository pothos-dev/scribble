export type Tool = 'pen' | 'line' | 'rectangle'
export type InteractionMode = 'idle' | 'pan-zoom' | 'drawing' | 'erasing'

export type Point = [number, number]
export type Drawing = { type: "polyline", points: Point[]; thickness: number; color: string }
