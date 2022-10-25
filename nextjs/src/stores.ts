import type { Tool, Shape, TouchInteraction } from "~/types"
import { createHookstate } from "@hookstate/core"

// Tool Settings
export let SelectedTool = createHookstate<Tool>("pen")
export let ActiveTool = createHookstate<Tool>("pen")
// export let ToolInteraction = derived(ActiveTool, createToolInteraction)

export let Color = createHookstate<string>("#000000")
export let Thickness = createHookstate<number>(0.5)

// Generated Shapes
export let Shapes = createHookstate<Shape[]>([])

// UI State
export let ColorSelectMode = createHookstate<boolean>(false)
export let TouchInteractionMode = createHookstate<TouchInteraction>("idle")
export let Scroll = createHookstate<[number, number]>([0, 0])
