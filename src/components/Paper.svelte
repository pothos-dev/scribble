<script lang="ts">
  import type { InteractionMode, Point, PolyLineConf } from '$types'
  import PaperGrid from '$components/PaperGrid.svelte'
  import PolyLine from '$components/PolyLine.svelte'
  import { Color, Thickness } from '$stores'

  export let width = 210
  export let height = 297

  let mode: InteractionMode = 'idle'
  let currentPoints: Point[] = []
  let polyLines: PolyLineConf[] = []

  function onPointerDown(event: PointerEvent) {
    if (event.buttons == 1) mode = 'drawing'
    if (event.buttons == 2 || event.buttons == 32) mode = 'erasing'
    if (mode == 'drawing') {
      currentPoints = [[event.offsetX, event.offsetY]]
    }
  }
  function onPointerMove(event: PointerEvent) {
    if (mode == 'drawing') {
      currentPoints = [...currentPoints, [event.offsetX, event.offsetY]]
    }
    if (mode == 'erasing') {
      // Drop all polylines that are close to the pointer (10px)
      const minDist = 10
      polyLines = polyLines.filter(polyline =>
        polyline.points.every(point => {
          const dx = point[0] - event.offsetX
          const dy = point[1] - event.offsetY
          const sqDist = dx * dx + dy * dy
          return sqDist > minDist * minDist
        })
      )
    }
  }
  function onPointerUp() {
    mode = 'idle'
    if (currentPoints.length > 1) {
      polyLines = [...polyLines, { points: currentPoints, thickness: $Thickness, color: $Color }]
    }
    currentPoints = []
  }
</script>

<svg
  width="{width}mm"
  height="{height}mm"
  class="bg-slate-100 shadow-lg cursor-crosshair touch-none"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointerleave={onPointerUp}
  on:contextmenu={e => e.preventDefault()}
>
  <PaperGrid {width} {height} />

  <PolyLine points={currentPoints} thickness={$Thickness} color={$Color} />

  {#each polyLines as polyLine}
    <PolyLine points={polyLine.points} thickness={polyLine.thickness} color={polyLine.color} />
  {/each}
</svg>
