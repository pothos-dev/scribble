import { Tool, Shape, TouchInteraction, IToolInteraction, Point } from "~/types"
import zustand from "zustand"
import { createToolInteraction } from "~/lib/toolInteraction"
import { settings } from "~/state/Settings"

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
    const tool = createToolInteraction(settings().tool)
    set({
      mode: "tool",
      tool,
      activeTool: settings().tool,
    })
    tool.onTouchDown(point)
  },
  startEraser: point => {
    const tool = createToolInteraction("eraser")
    set({ mode: "tool", tool, activeTool: "eraser" })
    tool.onTouchDown(point)
  },
  stopInteraction: () => set({ mode: "idle" }),
}))

export const interactionManager = useInteractionManager.getState
