export type Mode = 'idle' | 'drawing' | 'erasing'

export type Point = [number, number]
export type PolyLineConf = { points: Point[]; thickness: number }
