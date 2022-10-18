import type { Tool, Shape, InteractionMode } from '$types'
import { writable } from 'svelte/store'

// Tool Settings
export let ActiveTool = writable<Tool>('pen')
export let Color = writable<string>('#000000')
export let Thickness = writable<number>(0.5)

// Generated Shapes
export let Shapes = writable<Shape[]>([])

// UI State
export let ColorSelectMode = writable<boolean>(false)
export let Interaction = writable<InteractionMode>('idle')
export let Scroll = writable<[number, number]>([0, 0])
