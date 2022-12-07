import { ToolType, InteractionMode, ToolInteraction, Point } from "~/types"
import zustand from "zustand"
import { settings } from "~/state/Settings"
import { tools } from "~/tools"

type InteractionManager = {
  mode: InteractionMode
  toolInteraction: ToolInteraction
  activeToolType: ToolType

  startPanZoom(point: Point): void
  startTool(point: Point): void
  startEraser(point: Point): void
  stopInteraction(): void
}
export const useInteractionManager = zustand<InteractionManager>()(set => ({
  mode: "idle",
  activeToolType: "pen",
  toolInteraction: {
    onTouchDown: () => {},
    onTouchMove: () => {},
    onTouchUp: () => {},
    render: () => null,
  },

  startPanZoom: point => set({ mode: "pan-zoom" }),
  startTool: point => {
    const activeToolType = settings().toolType
    const toolInteraction = settings().tool.createInteraction()
    const mode = "tool"
    toolInteraction.onTouchDown(point)
    set({ mode, toolInteraction, activeToolType })
  },
  startEraser: point => {
    const activeToolType = "eraser"
    const toolInteraction = tools.eraser.createInteraction()
    const mode = "tool"
    toolInteraction.onTouchDown(point)
    set({ mode, toolInteraction, activeToolType })
  },
  stopInteraction: () => set({ mode: "idle" }),
}))

export const interactionManager = useInteractionManager.getState
