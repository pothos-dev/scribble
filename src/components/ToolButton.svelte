<script lang="ts">
  export let active = false
</script>

<button
  class="bg-slate-600 rounded p-1 w-10 h-10 border-2 border-transparent flex flex-col items-center justify-center"
  class:border-slate-300={active}
  on:click
>
  <slot />
</button>
