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

<style lang="postcss">.code{padding:0;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-align:start;align-items:flex-start}.numbers{-webkit-box-flex:0;flex-grow:0;border-right:1px solid #f2f2f2}.number{padding:0 10px;color:#0a055f}.lines{-webkit-box-flex:2;flex-grow:2}.line{padding:0 5px}.line:nth-child(2n).active,.number:nth-child(2n).active{background-color:#fff18e}.line:nth-child(odd),.number:nth-child(odd){background-color:rgba(0,0,0,.02)}.line:nth-child(odd).active,.number:nth-child(odd).active{background-color:#fff18e}.empty:after{display:inline-block;content:" "}</style>

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
