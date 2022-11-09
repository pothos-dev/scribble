import zustand from "zustand"

type UIState = {
  colorSelectMode: boolean
  toggleColorSelectMode(): void
}

export const useUIState = zustand<UIState>()(set => ({
  colorSelectMode: false,
  toggleColorSelectMode: () =>
    set(state => ({ colorSelectMode: !state.colorSelectMode })),
}))
