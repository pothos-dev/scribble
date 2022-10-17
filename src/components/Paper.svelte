<script lang="ts">
  import PaperGrid from '$components/PaperGrid.svelte'
  import PolyLine from '$components/PolyLine.svelte'
  import { Drawings } from '$stores'
  import { touchInteraction } from '$lib/touchInteraction'

  export let width = 210
  export let height = 297
</script>

<svg
  width="{width}mm"
  height="{height}mm"
  class="bg-slate-100 shadow-lg cursor-crosshair touch-none"
  use:touchInteraction
>
  <PaperGrid {width} {height} />

  {#each $Drawings as drawing}
    <PolyLine points={drawing.points} thickness={drawing.thickness} color={drawing.color} />
  {/each}
</svg>
