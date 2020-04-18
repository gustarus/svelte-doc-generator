<script>
  import { createEventDispatcher } from 'svelte';
  import ComponentProperties from './../ComponentProperties';

  const MarkdownIt = require('markdown-it');

  const dispatch = createEventDispatcher();
  const md = new MarkdownIt;

  export let data = {};

  function resolveFunctionArgumentLabel(argument) {
    const suffix = typeof argument.default !== 'undefined'
      ? ` = ${JSON.stringify(argument.default)}` : '';
    return `${argument.name}${suffix}`;
  }

  function onClickDefinition(e) {
    e.preventDefault();
    const line = parseInt(e.target.dataset.line, 10);
    dispatch('source', { line });
  }

  $: mapped = Object.keys(data).map((name) => ({ name, ...data[name] }));
  $: sorted = mapped.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
</script>

<div class="component-functions">
  <ComponentProperties title="Exported functions" visible={sorted.length}>
    <div class="content">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Arguments</th>
          <th scope="col">Description</th>
          <th scope="col">Note</th>
        </tr>
        </thead>

        <tbody>
        {#each sorted as item}
          <tr>
            <th scope="row">
              <kbd>{item.name}</kbd>
              (<a href="/" on:click={onClickDefinition} data-line={item.location.start.line}>definitions</a>)
            </th>
            <td>
              {#each item.arguments as argument}
                <kbd>{@html resolveFunctionArgumentLabel(argument)}</kbd>&nbsp;
              {/each}
            </td>
            <td>{@html md.render(item.description || '')}</td>
            <td>{@html md.render(item.note || '')}</td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
  </ComponentProperties>
</div>
