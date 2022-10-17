import type { Tool, Drawing, InteractionMode } from '$types'
import { writable } from 'svelte/store'

// User Settings
export let Color = writable<string>('hsl(0, 0%, 0%)')
export let Thickness = writable<number>(1)
export let ActiveTool = writable<Tool>('pen')

// Generated Shapes
export let Drawings = writable<Drawing[]>([])

// UI State
export let ColorSelectMode = writable<boolean>(false)
export let Interaction = writable<InteractionMode>('idle')
export let Scroll = writable<[number, number]>([0, 0])

Scroll.subscribe(([x, y]) => console.log(`Scroll ${x},${y}`))
