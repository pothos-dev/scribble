import type { Tool } from '$types'
import { writable } from 'svelte/store'

export let Color = writable('hsl(0, 0%, 0%)')
export let ColorSelectMode = writable(false)
export let Thickness = writable(1)
export let ActiveTool = writable('pen' as Tool)
