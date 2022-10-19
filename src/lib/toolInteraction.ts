import { addPointToShape, createShape, eraseShapesNearPoint } from '$lib/shapes'
import { ActiveTool, SelectedTool } from '$stores'
import type { Tool, IToolInteraction } from '$types'
import { get } from 'svelte/store'

export function createToolInteraction(tool: Tool): IToolInteraction {
  if (tool == 'pen') {
    return {
      onTouchDown(point) {
        createShape(point)
      },
      onTouchMove(point) {
        addPointToShape(point)
      },
      onTouchUp(point) {}
    }
  }

  if (tool == 'eraser') {
    return {
      onTouchDown(point) {},
      onTouchMove(point) {
        eraseShapesNearPoint(point)
      },
      onTouchUp(point) {
        ActiveTool.set(get(SelectedTool))
      }
    }
  }

  return {
    onTouchDown(point) {},
    onTouchMove(point) {},
    onTouchUp(point) {}
  }
}
