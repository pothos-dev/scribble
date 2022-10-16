import { writable } from 'svelte/store'

export let Color = writable('hsl(0, 0%, 0%)')
export let ColorSelectMode = writable(false)
export let Thickness = writable(1)
