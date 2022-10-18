<script>
  import PdfExportButton from './PdfExportButton.svelte'
  import ToolBar from './ToolBar.svelte'
</script>

<header
  class="bg-slate-900 text-white shadow-lg items-center flex flex-row justify-between px-2 py-1"
>
  <div>
    <h1>Scribble</h1>
  </div>

  <div><ToolBar /></div>

  <div />

  <div><PdfExportButton /></div>
</header>
