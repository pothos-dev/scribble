<script>
  import ColorButton from './ColorButton.svelte'
  import ThicknessButton from './ThicknessButton.svelte'
</script>

<div class="flex flex-row space-x-1">
  <ColorButton />
  <ThicknessButton thickness={0.25} />
  <ThicknessButton thickness={0.5} />
  <ThicknessButton thickness={1} />
  <ThicknessButton thickness={2} />
</div>
