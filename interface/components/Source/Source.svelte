<script>
  import resolveHighlightedSource from './../../helpers/resolveHighlightedSource';

  export let source;
  export let line;
  export let lang = 'html';

  function getLineIndent(count) {
    return '&nbsp;&nbsp;'.repeat(count);
  }

  function isActiveLine(index) {
    return line === index + 1;
  }

  $: lines = resolveHighlightedSource(source, lang);
</script>

<style lang="postcss">
  .code {
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .numbers {
    flex-grow: 0;
    border-right: 1px solid $gray;
  }

  .number {
    padding: 0 10px;
    color: $dark-blue;
  }

  .lines {
    flex-grow: 2;
  }

  .line {
    padding: 0 5px;
  }

  .number,
  .line {
    &:nth-child(even) {
      &.active {
        background-color: $yellow-disabled
      }
    }

    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.02);
      &.active {
        background-color: $yellow-disabled
      }
    }
  }

  .empty {
    &:after {
      display: inline-block;
      content: ' ';
    }
  }
</style>

<div class="bootstrap code">
  <div class="numbers">
    {#each lines as {indent, source}, index}
      <div class="number" class:active={isActiveLine(index)}>{index + 1}</div>
    {/each}
  </div>

  <div class="lines">
    {#each lines as {indent, source}, index}
      <div class="line" class:active={isActiveLine(index)} class:empty={!source} data-line="true" data-number={index + 1}>
        {@html getLineIndent(indent)}{@html source}
      </div>
    {/each}
  </div>
</div>
