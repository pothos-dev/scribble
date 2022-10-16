<script lang="ts">
  import { range } from 'lodash'

  // All sizes in mm
  const width = 210
  const height = 297
  const squareSize = 7.5
  const mx = 7.5
  const mr = 7.5
  const mt = 12
  const mb = 7.5
</script>

<svg width="{width}mm" height="{height}mm" class="bg-slate-100 shadow-lg">
  {#each range(mx, width - mr, squareSize) as x}
    {#each range(mt, height - mb - squareSize, squareSize) as y}
      <rect
        x="{x}mm"
        y="{y}mm"
        width="{squareSize}mm"
        height="{squareSize}mm"
        stroke="#ccc"
        fill="transparent"
      />
    {/each}
  {/each}
</svg>
