<script lang="ts">
  import type { Point } from '$types'

  export let points: Point[]
  export let color = 'black'
  export let thickness = 1
</script>

<polyline
  points={points.map(([x, y]) => `${x},${y}`).join(' ')}
  stroke={color}
  fill="none"
  stroke-width={thickness}
  stroke-linejoin="round"
  stroke-linecap="round"
/>
