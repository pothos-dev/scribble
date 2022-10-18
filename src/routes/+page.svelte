<script lang="ts">
  import Header from '$components/Header/Header.svelte'
  import Paper from '$components/Paper/Paper.svelte'
  import { scrollSync } from '$lib/scrollSync'
</script>

<div class="w-screen h-screen flex flex-col bg-slate-700 overflow-hidden">
  <Header />
  <div class="mx-auto overflow-y-scroll pr-2 my-2" use:scrollSync>
    <Paper />
  </div>
</div>
