<script>
  import { onMount } from 'svelte';
  import Source from '../../Source';

  export let source;
  export let line;

  let contentEl;

  onMount(() => {
    if (line) {
      const lineEl = contentEl.querySelector(`[data-line][data-number="${line - 5}"]`);
      lineEl && contentEl.scrollTo({ top: lineEl.offsetTop });
    }
  });

  function onCloseClick(e) {
    e.preventDefault();
    source = false;
    line = false;
  }
</script>

<style lang="postcss">
  .application-source {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .overlay {
    background: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .content {
    padding: 0;
  }
</style>

<div class="bootstrap application-source">
  <div class="overlay" on:click={onCloseClick} />

  <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document" style="display: block;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" on:click={onCloseClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body content" bind:this={contentEl}>
        <Source {source} {line} />
      </div>
    </div>
  </div>
</div>
