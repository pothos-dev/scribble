<script lang="ts">
  import PolyLine from '$components/PolyLine.svelte'
  import type { Shape } from '$types'

  export let shape: Shape
</script>

{#if shape.type == 'polyline'}
  <PolyLine points={shape.points} thickness={shape.thickness} color={shape.color} />
{/if}

<rect
  stroke="red"
  fill="none"
  stroke-width="0.5"
  x={shape.boundingRect[0][0]}
  y={shape.boundingRect[0][1]}
  width={shape.boundingRect[1][0] - shape.boundingRect[0][0]}
  height={shape.boundingRect[1][1] - shape.boundingRect[0][1]}
/>
