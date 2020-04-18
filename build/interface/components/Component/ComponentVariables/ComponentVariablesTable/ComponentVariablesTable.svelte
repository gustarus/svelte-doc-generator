<script>
  import { createEventDispatcher } from 'svelte';

  const MarkdownIt = require('markdown-it');

  const dispatch = createEventDispatcher();
  const md = new MarkdownIt();

  export let type;
  export let title;
  export let data = [];

  function onClickDefinition(e) {
    e.preventDefault();
    const line = parseInt(e.target.dataset.line, 10);
    dispatch('source', { line });
  }
</script>

<style lang="postcss">.title{font-weight:400;font-size:1rem}.content{margin-top:10px}</style>

<div class="component-variables-table">
  <div class="title">{title} <kbd>export {type}</kbd></div>
  <div class="content">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Description</th>
          <th scope="col">Note</th>
        </tr>
      </thead>

      <tbody>
        {#each data as item}
          <tr>
            <th scope="row">
              <kbd>{item.name}</kbd>
              (<a href="/" on:click={onClickDefinition} data-line={item.location.start.line}>definitions</a>)
            </th>
            <td><code>{typeof item.default}</code></td>
            <td><code>{JSON.stringify(item.default)}</code></td>
            <td>{@html md.render(item.description || '')}</td>
            <td>{@html md.render(item.note || '')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
