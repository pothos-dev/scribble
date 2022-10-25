<script>
  import { downloadAsPdf } from '$lib/pdf'
  import ToolButton from './ToolButton.svelte'
</script>

<ToolButton on:click={downloadAsPdf}>PDF</ToolButton>
