import { ReactNode } from "react"
import { HeaderButton } from "~/components/Header/HeaderButton"
import { Tool } from "~/types"
import { useSettings } from "~/atoms"

export function PenToolButton() {
  return <ToolButton tool="pen">Pen</ToolButton>
}

export function SelectToolButton() {
  return <ToolButton tool="select">Sel</ToolButton>
}

function ToolButton({ tool, children }: { tool: Tool; children: ReactNode }) {
  const activeTool = useSettings(s => s.tool)
  const setTool = useSettings(s => s.setTool)

  return (
    <HeaderButton active={tool == activeTool} onClick={() => setTool(tool)}>
      {children}
    </HeaderButton>
  )
}