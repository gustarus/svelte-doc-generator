<script>
  import decodeSpecialChars from './../../helpers/decodeSpecialChars';
  import ComponentDefinition from './ComponentDefinition';
  import ComponentDescription from './ComponentDescription';
  import ComponentUsages from './ComponentUsages';
  import ComponentInitialization from './ComponentInitialization';
  import { source as sourceStore, line as lineStore } from './../../stores';

  export let title = 'Component';
  export let raw;
  export let definition;
  export let initialization;
  export let badge;

  const withDefinition = !!definition;
  const withInitialization = !!initialization;
  const withDescription = !!($$props.$$slots && $$props.$$slots.description);
  const withUsages = !!($$props.$$slots && $$props.$$slots.usages);
  const witContent = withDefinition || withInitialization || withUsages;

  function onSource({ detail }) {
    $sourceStore = decodeSpecialChars(raw);
    $lineStore = detail.line;
  }

  $: badgeCompiled = badge ? `<span class="badge badge-secondary badge-dark">${badge}</span>` : '';
</script>

<style lang="postcss">.title{margin-top:1rem;margin-bottom:.5rem;font-weight:300;font-size:3rem}.brick{margin-top:3rem;padding-top:1rem;border-top:1px solid #f2f2f2}</style>

<section class="component">
  <div class="bootstrap">
    <div class="title">{title} {@html badgeCompiled}</div>

    {#if withDescription}
      <div class="description">
        <ComponentDescription>
          <slot name="description" />
        </ComponentDescription>
      </div>
    {/if}
  </div>

  <div class="content">
    {#if withUsages}
      <div class="brick usages">
        <ComponentUsages>
          <slot name="usages" />
        </ComponentUsages>
      </div>
    {/if}

    <div class="brick bootstrap">
      {#if withInitialization}
        <div class="initialization">
          <ComponentInitialization {...initialization} />
        </div>
      {/if}

      {#if withDefinition}
        <div class="brick definition">
          <ComponentDefinition {...definition} on:source={onSource} />
        </div>
      {/if}
    </div>
  </div>
</section>
