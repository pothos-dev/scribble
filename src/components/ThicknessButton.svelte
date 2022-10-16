<script lang="ts">
  import PolyLine from '$components/PolyLine.svelte'
  import ToolButton from '$components/ToolButton.svelte'
  import { Thickness } from '$stores'

  export let thickness: number
</script>

<ToolButton active={thickness == $Thickness} on:click={() => Thickness.set(thickness)}>
  <svg class="w-full h-full" viewBox="0 0 100 100">
    <PolyLine
      thickness={thickness * 2}
      color="white"
      points={[
        [10, 10],
        [75, 25],
        [25, 50],
        [75, 90]
      ]}
    />
  </svg>
</ToolButton>
