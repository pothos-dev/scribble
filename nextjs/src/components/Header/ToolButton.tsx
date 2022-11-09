import { useHookstate } from "@hookstate/core"
import { ReactNode } from "react"
import { HeaderButton } from "~/components/Header/HeaderButton"
import { ActiveTool, SelectedTool } from "~/stores"
import { Tool } from "~/types"

export function PenToolButton() {
  return <ToolButton tool="pen">Pen</ToolButton>
}

export function SelectToolButton() {
  return <ToolButton tool="select">Sel</ToolButton>
}

function ToolButton({ tool, children }: { tool: Tool; children: ReactNode }) {
  const active = tool == useHookstate(ActiveTool).get()
  return (
    <HeaderButton active={active} onClick={() => SelectedTool.set(tool)}>
      {children}
    </HeaderButton>
  )
}
