<script lang="ts">
  import PaperGrid from '$components/PaperGrid.svelte'
  import Shape from '$components/Shape.svelte'
  import { Shapes } from '$stores'
  import { touchInteraction } from '$lib/touchInteraction'

  export let width = 210
  export let height = 297
</script>

<svg
  width="{width}mm"
  height="{height}mm"
  viewBox="0 0 {width} {height}"
  class="bg-slate-100 shadow-lg cursor-crosshair touch-none"
  use:touchInteraction
>
  <g class="pointer-events-none">
    <PaperGrid {width} {height} />

    {#each $Shapes as shape}
      <Shape {shape} />
    {/each}
  </g>
</svg>
