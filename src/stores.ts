import { createToolInteraction } from '$lib/toolInteraction'
import type { Tool, Shape, TouchInteraction } from '$types'
import { derived, writable } from 'svelte/store'

// Tool Settings
export let SelectedTool = writable<Tool>('pen')
export let ActiveTool = writable<Tool>('pen')
export let ToolInteraction = derived(ActiveTool, createToolInteraction)

export let Color = writable<string>('#000000')
export let Thickness = writable<number>(0.5)

// Generated Shapes
export let Shapes = writable<Shape[]>([])

// UI State
export let ColorSelectMode = writable<boolean>(false)
export let TouchInteractionMode = writable<TouchInteraction>('idle')
export let Scroll = writable<[number, number]>([0, 0])
