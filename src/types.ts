export type Tool = 'pen' | 'line' | 'rectangle'
export type InteractionMode = 'idle' | 'drawing' | 'erasing'

export type Point = [number, number]
export type PolyLineConf = { points: Point[]; thickness: number; color: string }
