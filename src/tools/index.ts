import { pen } from "~/tools/pen"
import { select } from "~/tools/select"
import { ToolDef, ToolType } from "~/types"

export const tools: Record<ToolType, ToolDef> = {
  pen,
  select,
  eraser: null as any,
  line: null as any,
  rectangle: null as any,
}
