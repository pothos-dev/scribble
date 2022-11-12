import zustand from "zustand"
import { Tool } from "~/types"

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

export const settings = useSettings.getState
