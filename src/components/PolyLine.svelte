<script lang="ts">
  import type { Point } from '$types'

  export let points: Point[]
</script>

<polyline points={points.map(([x, y]) => `${x},${y}`).join(' ')} stroke="black" fill="none" />
