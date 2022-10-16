<script>
  import Header from '$components/Header.svelte'
  import Paper from '$components/Paper.svelte'
</script>

<div class="w-screen h-screen flex flex-col bg-slate-700 overflow-hidden">
  <Header />
  <div class="mx-auto overflow-y-scroll pr-2 my-2">
    <Paper />
  </div>
</div>
