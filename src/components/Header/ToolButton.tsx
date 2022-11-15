import { ReactNode } from "react"
import { HeaderButton } from "~/components/Header/HeaderButton"
import { useSettings } from "~/state/Settings"
import { ToolType } from "~/types"

export function PenToolButton() {
  return <ToolButton tool="pen">Pen</ToolButton>
}

export function SelectToolButton() {
  return <ToolButton tool="select">Sel</ToolButton>
}

function ToolButton({
  tool,
  children,
}: {
  tool: ToolType
  children: ReactNode
}) {
  const activeTool = useSettings(s => s.toolType)
  const setTool = useSettings(s => s.setToolType)

  return (
    <HeaderButton active={tool == activeTool} onClick={() => setTool(tool)}>
      {children}
    </HeaderButton>
  )
}
