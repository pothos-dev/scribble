<script>
  import { ActiveTool, SelectedTool } from '$stores'
  import ToolButton from './ToolButton.svelte'

  $: active = $ActiveTool == 'pen'
  const onClick = () => ($SelectedTool = 'pen')
</script>

<ToolButton {active} on:click={onClick}>Pen</ToolButton>
