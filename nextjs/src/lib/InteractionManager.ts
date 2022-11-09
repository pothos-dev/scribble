import { Tool, Shape, TouchInteraction, IToolInteraction, Point } from "~/types"
import zustand from "zustand"

type InteractionManager = {
  mode: TouchInteraction
  tool: IToolInteraction
  activeTool: Tool

  startPanZoom(point: Point): void
  startTool(point: Point): void
  startEraser(point: Point): void
  stopInteraction(): void
}
export const useInteractionManager = zustand<InteractionManager>()(set => ({
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
export const interactionManager = useInteractionManager.getState
