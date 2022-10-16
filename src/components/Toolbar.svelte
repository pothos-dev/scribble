<script>
  import ColorButton from './ColorButton.svelte'
  import ThicknessButton from './ThicknessButton.svelte'
</script>

<div class="flex flex-row space-x-1">
  <ColorButton />
  <ThicknessButton thickness={1} />
  <ThicknessButton thickness={2} />
  <ThicknessButton thickness={3} />
</div>
