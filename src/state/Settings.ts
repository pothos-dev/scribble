import zustand from "zustand"
import { tools } from "~/tools"
import { ToolDef, ToolType } from "~/types"

type Settings = {
  tool: ToolDef
  toolType: ToolType
  setToolType(tool: ToolType): void

  color: string
  setColor(color: string): void

  thickness: number
  setThickness(thickness: number): void
}

export const useSettings = zustand<Settings>()(set => ({
  tool: tools.pen,
  toolType: "pen",
  setToolType: toolType =>
    set({
      toolType,
      tool: tools[toolType],
    }),

  color: "#000000",
  setColor: color => set({ color }),

  thickness: 0.5,
  setThickness: thickness => set({ thickness }),
}))

export const settings = useSettings.getState
