<script>
  import ComponentProperties from './../ComponentProperties';

  export let data = {};

  $: visible = Object.values(data).length;
</script>

<div class="component-classes">
  <ComponentProperties title="Exported classes" {visible}>

  </ComponentProperties>
</div>
