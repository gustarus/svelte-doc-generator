<script>
  import Source from './../../Source';
  import decodeSpecialChars from './../../../helpers/decodeSpecialChars';

  export let title = 'Component initialization';
  export let code = false;

  $: decoded = code && decodeSpecialChars(code);
</script>

<style lang="postcss">
  .title {
    font-weight: 300;
    font-size: 2.3rem;
  }
</style>

<section class="component-initialization">
  <div class="title">{title}</div>
  <br/>

  {#if decoded}
    <Source source={decoded} lang="html" />
  {:else}
    <div class="alert alert-secondary" role="alert">
      There is no component initialization.
    </div>
  {/if}
</section>
