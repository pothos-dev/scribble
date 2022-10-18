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
  class="bg-slate-100 shadow-lg cursor-crosshair touch-none"
  use:touchInteraction
>
  <PaperGrid {width} {height} />

  {#each $Shapes as shape}
    <Shape {shape} />
  {/each}
</svg>
