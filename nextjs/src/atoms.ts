import { Tool, Shape, TouchInteraction, IToolInteraction, Point } from "~/types"
import zustand from "zustand"

type Settings = {
  tool: Tool
  setTool(tool: Tool): void

  color: string
  setColor(color: string): void

  thickness: number
  setThickness(thickness: number): void
}
export const useSettings = zustand<Settings>()(set => ({
  tool: "pen",
  setTool: tool => set({ tool }),

  color: "#000000",
  setColor: color => set({ color }),

  thickness: 0.5,
  setThickness: thickness => set({ thickness }),
}))

type UIState = {
  colorSelectMode: boolean
  toggleColorSelectMode(): void
}
export const useUIState = zustand<UIState>()(set => ({
  colorSelectMode: false,
  toggleColorSelectMode: () =>
    set(state => ({ colorSelectMode: !state.colorSelectMode })),
}))

type Interaction = {
  mode: TouchInteraction
  tool: IToolInteraction
  activeTool: Tool

  startPanZoom(point: Point): void
  startTool(point: Point): void
  startEraser(point: Point): void
  stopInteraction(): void
}
export const useInteraction = zustand<Interaction>()(set => ({
  mode: "idle",
  activeTool: "pen",
  tool: {
    onTouchDown: () => {},
    onTouchMove: () => {},
    onTouchUp: () => {},
  },

  startPanZoom: point => set({ mode: "pan-zoom" }),
  startTool: point => {
    set({ mode: "tool" })
    // onTouchDown(point)
  },
  startEraser: point => {
    set({ mode: "tool", activeTool: "eraser" })
    // onTouchDown(point)
  },
  stopInteraction: () => set({ mode: "idle" }),
}))

type Scroll = {
  x: number
  y: number
  setScroll(x: number, y: number): void
}
export const useScroll = zustand<Scroll>()(set => ({
  x: 0,
  y: 0,
  setScroll: (x, y) => set({ x, y }),
}))

// // Tool Settings
// export let SelectedTool = atom<Tool>("pen")
// export let ActiveTool = atom<Tool>("pen")
// export let ToolInteraction = atom<IToolInteraction>(null as any) // TODO

// export let Color = atom<string>("#000000")
// export let Thickness = atom<number>(0.5)

// // Generated Shapes
// export let Shapes = atom<Shape[]>([])

// // UI State
// export let ColorSelectMode = atom<boolean>(false)
// export let TouchInteractionMode = atom<TouchInteraction>("idle")
// export let Scroll = atom<[number, number]>([0, 0])
