<script>
  import { ActiveTool } from '$stores'
  import ToolButton from './ToolButton.svelte'

  $: active = $ActiveTool == 'pen'
  const onClick = () => ($ActiveTool = 'pen')
</script>

<ToolButton {active} on:click={onClick}>Pen</ToolButton>
