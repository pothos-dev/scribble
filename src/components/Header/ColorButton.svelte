<script>
  import { Color, ColorSelectMode } from '$stores'
  import ColorSelect from './ColorSelect.svelte'
  import ToolButton from './ToolButton.svelte'

  $: active = $ColorSelectMode

  function onClick() {
    if (active) {
      ColorSelectMode.set(false)
    } else {
      // We must defer the mounting of the <ColorSelect/> here,
      // otherwise it will observe the same click that mounted it, and close immediately -
      // because it closes whenever it sees a click outside of itself.
      setTimeout(() => ColorSelectMode.set(true), 1)
    }
  }
</script>

<div>
  <ToolButton on:click={onClick} {active}>
    <div class="w-6 h-6 rounded-full" style="background-color: {$Color}" />
  </ToolButton>

  <div class="absolute">
    {#if $ColorSelectMode}
      <ColorSelect />
    {/if}
  </div>
</div>
