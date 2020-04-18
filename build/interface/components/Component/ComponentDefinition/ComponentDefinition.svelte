<script>
  import ComponentContext from '../ComponentContext';

  export let title = 'Component definitions';
  export let module;
  export let instance;
</script>

<style lang="postcss">.title{font-weight:300;font-size:2.3rem}</style>

<div class="component-declaration">
  <div class="title">{title}</div>

  <ComponentContext type="module" title="Module context" {...module} on:source />

  {#if module && instance}
    <br/>
  {/if}

  <ComponentContext type="instance" title="Instance context" {...instance} on:source />
</div>
