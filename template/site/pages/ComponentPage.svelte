<script>
  import { convertCodeToComponent } from 'svelte-doc-generator';
  import library from './../context';

  export let code;

  $: resolved = (code => {
    const name = convertCodeToComponent(code);
    const resolved = library.find(item => item.name === name);

    if (!resolved) {
      throw new Error(
        `Unable to resolve component with code '${code}' from the documentations library`
      );
    }

    return resolved.component;
  })(code);
</script>

<svelte:component this={resolved} />
