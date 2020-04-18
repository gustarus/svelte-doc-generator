<script>
  import { Router, Route, links } from 'svelte-routing';
  import Preview from './ApplicationSource';
  import { source, line } from './../../stores';

  export let menu = [];
  export let routes = [];

  let contentEl;

  let current = window.location.pathname;
  function onNavigate(e) {
    contentEl.scrollTo({ top: 0 });
    const url = new URL(e.target.href);
    current = url.pathname;
  }
</script>

<style lang="postcss">.menu{position:absolute;top:0;left:0;bottom:0;padding:24px 0;overflow:hidden;box-sizing:border-box;width:200px;height:100vh;background-color:#eee;overflow-y:scroll}.menu__item,.menu__link{display:block}.menu__link{padding:8px 24px 8px 34px;text-decoration:none;color:#333;cursor:pointer}.menu__link:focus,.menu__link:hover{background-color:rgba(51,51,51,.1)}.menu__link.active{background-color:rgba(0,0,0,.42);color:#fff}.content{position:absolute;right:0;left:200px;padding:30px 15px 0;overflow:auto;box-sizing:border-box;height:100vh}</style>

<Router>
  <div class="documentation">
    <aside class="bootstrap menu">
      <nav>
        <ul use:links class="menu__content">
          {#each menu as { path, label } (path)}
            <li class="menu__item">
              <a
                href={path}
                class="menu__link {current === path && 'active'}"
                on:click={onNavigate}>
                {label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <main class="content" bind:this={contentEl}>
      {#each routes as route}
        <Route {...route} />
      {/each}
    </main>
  </div>
</Router>

{#if $source}
  <Preview bind:source={$source} bind:line={$line} />
{/if}
