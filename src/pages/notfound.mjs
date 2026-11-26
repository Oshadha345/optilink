import { page } from "../lib/layout.mjs";
import { href } from "../lib/util.mjs";

export function notFound() {
  const body = `<main id="main" class="setup"><div class="container setup-wrap"><section class="setup-block"><h1>Page not found</h1><p>That page does not exist.</p><p class="back-link"><a class="btn btn-primary" href="${href()}">Go to the OptiLink site</a></p></section></div></main>`;
  return page({ title: "Page not found | OptiLink", path: "404.html", body });
}
