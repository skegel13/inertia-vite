import "vite/dynamic-import-polyfill";
import { createApp, h } from "vue";
import {
  App as InertiaApp,
  plugin as InertiaPlugin,
} from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";

// Import Axios and set config here instead of bootstrap file.
import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const el = document.getElementById("app");

// Get all the page components. This is required for the Rollup production
// build.
const pages = import.meta.glob("./Pages/**/*.vue");

createApp({
  render: () =>
    h(InertiaApp, {
      initialPage: JSON.parse(el.dataset.page),
      // Update the resolve component to use the import syntax. The path should
      // begin with a './' instead of using the alias.
      // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      resolveComponent: (name) => {
        const page = pages[`./Pages/${name}.vue`];
        if (!page) {
          throw new Error(`Page ${name} not found.`);
        }

        return page().then((module) => module.default);
      },
    }),
})
  .mixin({ methods: { route } })
  .use(InertiaPlugin)
  .mount(el);

InertiaProgress.init({ color: "#4B5563" });
