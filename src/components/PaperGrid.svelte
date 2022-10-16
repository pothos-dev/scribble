<script lang="ts">
  import { range } from 'lodash'

  export let width: number
  export let height: number

  const squareSize = 7.5
  const mx = 7.5
  const mr = 7.5
  const mt = 12
  const mb = 7.5
</script>

{#each range(mx, width - mr, squareSize) as x}
  {#each range(mt, height - mb - squareSize, squareSize) as y}
    <rect
      x="{x}mm"
      y="{y}mm"
      width="{squareSize}mm"
      height="{squareSize}mm"
      stroke="#ddd"
      fill="transparent"
      stroke-width="0.2mm"
    />
  {/each}
{/each}
