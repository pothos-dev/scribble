<script>
  import { ActiveTool, SelectedTool } from '$stores'
  import ToolButton from './ToolButton.svelte'

  $: active = $ActiveTool == 'select'
  const onClick = () => ($SelectedTool = 'select')
</script>

<ToolButton {active} on:click={onClick}>Sel</ToolButton>
