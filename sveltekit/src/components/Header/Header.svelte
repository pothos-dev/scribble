<script>
  import ColorButton from './ColorButton.svelte'
  import PdfExportButton from './PdfExportButton.svelte'
  import PenToolButton from './PenToolButton.svelte'
  import SelectToolButton from './SelectToolButton.svelte'
  import ThicknessButton from './ThicknessButton.svelte'
</script>

<header
  class="bg-slate-900 text-white shadow-lg items-center flex flex-row justify-between px-2 py-1"
>
  <div>
    <h1>Scribble</h1>
  </div>

  <div class="flex flex-row space-x-1">
    <ColorButton />

    <div class="w-1" />

    {#each [0.25, 0.5, 1, 2] as thickness}
      <ThicknessButton {thickness} />
    {/each}

    <div class="w-1" />

    <PenToolButton />
    <SelectToolButton />
  </div>

  <div><PdfExportButton /></div>
</header>
