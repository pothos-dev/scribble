<script lang="ts">
  export let active = false
</script>

<div
  class="bg-slate-700 rounded p-1 w-10 h-10 border-2 border-solid border-transparent"
  class:border-yellow-600={active}
  on:click
>
  <slot />
</div>
