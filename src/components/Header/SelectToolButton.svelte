<script>
  import { ActiveTool } from '$stores'
  import ToolButton from './ToolButton.svelte'

  $: active = $ActiveTool == 'select'
  const onClick = () => ($ActiveTool = 'select')
</script>

<ToolButton {active} on:click={onClick}>Sel</ToolButton>
