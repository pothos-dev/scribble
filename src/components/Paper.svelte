<script lang="ts">
  import type { Mode, Point } from '$types'
  import PaperGrid from '$components/PaperGrid.svelte'
  import PolyLine from '$components/PolyLine.svelte'

  export let width = 210
  export let height = 297

  let mode: Mode = 'idle'
  let currentPoints: Point[] = []
  let recordedPoints: Point[][] = []

  function onPointerDown(event: PointerEvent) {
    if (event.buttons == 1) {
      mode = 'drawing'
    }
    if (event.buttons == 2) {
      mode = 'erasing'
    }
    currentPoints = [[event.offsetX, event.offsetY]]
  }
  function onPointerMove(event: PointerEvent) {
    if (mode == 'drawing') {
      currentPoints = [...currentPoints, [event.offsetX, event.offsetY]]
    }
  }
  function onPointerUp() {
    mode = 'idle'
    recordedPoints = [...recordedPoints, currentPoints]
    currentPoints = []
  }
</script>

<svg
  width="{width}mm"
  height="{height}mm"
  class="bg-slate-100 shadow-lg cursor-crosshair"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointerleave={onPointerUp}
  on:contextmenu={e => e.preventDefault()}
>
  <PaperGrid {width} {height} />
  {#each [...recordedPoints, currentPoints] as points}
    <PolyLine {points} />
  {/each}
</svg>
