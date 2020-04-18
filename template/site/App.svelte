<script>
  import { resolveMenuFromLibrary, Application } from 'svelte-doc-generator';
  import ComponentPage from './pages/ComponentPage.svelte';
  import DefaultPage from './pages/DefaultPage.svelte';
  import { URI_TO_COMPONENTS } from './constants';
  import library from './context';

  const menu = [
    { path: '/', label: 'Home' },
    ...resolveMenuFromLibrary(library, `${URI_TO_COMPONENTS}/`)
  ];

  const routes = [
    {path: `${URI_TO_COMPONENTS}/:code/`, component: ComponentPage },
    {path: '/', component: DefaultPage },
  ];
</script>

<Application {menu} {routes} />
