<script>
  import decodeSpecialChars from './../../../helpers/decodeSpecialChars';
  import Source from './../../Source';
  import { COMPONENT_USAGE_THEME_LIGHT, COMPONENT_USAGE_ACCEPTABLE_THEMES } from './consntants';

  export let title = 'Usage example';
  export let badge = false;
  export let theme = COMPONENT_USAGE_THEME_LIGHT;
  export let source = '';
  export let padding = true;
  export let overflow = true;

  if (!COMPONENT_USAGE_ACCEPTABLE_THEMES.includes(theme)) {
    console.error(`Invalid theme '${theme}' passed: should be ${COMPONENT_USAGE_ACCEPTABLE_THEMES.join(' or ')}`);
  }

  $: badgeCompiled = badge ? `<span class="badge badge-secondary badge-dark">${badge}</span>` : '';
  $: decoded = decodeSpecialChars(source);
</script>

<style lang="postcss">
  .component-usage {
    margin-top: 20px;
  }

  .title {
    font-weight: 300;
    font-size: 1.8rem;
  }

  .content {
    padding: 20px;
    border-radius: 5px;
    background: $cloudy-gray;
  }

  .preview {
    border-radius: 5px 5px 0 0;
    border: 1px solid $gray;

    &.theme {
      &_light {
        background: $white;
      }

      &_dark {
        background: $black;
      }

      &_neutral {
        background: $gray-disabled;
      }
    }

    &.with-overflow {
      overflow: hidden;
    }

    &.with-padding {
      padding: 20px;
    }
  }

  .source {
    border-radius: 0 0 5px 5px;
    margin-top: 20px;
    background: $white;
    border: 1px solid $gray;
  }
</style>

<section class="component-usage">
  <div class="title bootstrap">{title} {@html badgeCompiled}</div>

  <div class="content">
    <div class="preview theme_{theme}" class:with-padding={padding} class:with-overflow={overflow}>
      <slot />
    </div>

    {#if decoded}
      <div class="source bootstrap">
        <Source source={decoded} />
      </div>
    {/if}
  </div>
</section>
