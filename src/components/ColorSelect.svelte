<script lang="ts">
  import { Color, ColorSelectMode } from '$stores'
  import { last, range } from 'lodash'
  import { onMount } from 'svelte'

  const colorCols: string[][] = []

  colorCols.push([])
  for (const lightness of range(0, 100, 20)) {
    last(colorCols)!.push(`hsl(0, 0%, ${lightness}%)`)
  }

  for (const hue of range(0, 360, 36)) {
    colorCols.push([])
    for (const lightness of range(20, 90, 15)) {
      last(colorCols)!.push(`hsl(${hue}, 100%, ${lightness}%)`)
    }
  }

  onMount(() => {
    function onClick() {
      ColorSelectMode.set(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  })
</script>

<div class="absolute top-2 -left-40 bg-slate-900 rounded flex flex-row p-2">
  {#each colorCols as col}
    <div class="flex flex-col">
      {#each col as color}
        <button
          class="w-8 h-8 rounded-full m-1 border-2 border-transparent"
          class:border-slate-300={$Color == color}
          style="background-color: {color}"
          on:click={() => Color.set(color)}
        />
      {/each}
    </div>
  {/each}
</div>
