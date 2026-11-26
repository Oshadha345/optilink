import { page } from "../lib/layout.mjs";
import { hero } from "../sections/hero.mjs";
import { problem } from "../sections/problem.mjs";
import { gap } from "../sections/gap.mjs";
import { how } from "../sections/how.mjs";
import { using } from "../sections/using.mjs";
import { cost } from "../sections/cost.mjs";
import { market } from "../sections/market.mjs";
import { technology } from "../sections/technology.mjs";
import { design } from "../sections/design.mjs";
import { safety, journey, team, faq, contact } from "../sections/rest.mjs";

export function home() {
  const body = `<main id="main">
${hero()}
${problem()}
${gap()}
${how()}
${using()}
${cost()}
${market()}
${technology()}
${design()}
${safety()}
${journey()}
${team()}
${faq()}
${contact()}
</main>`;
  return page({ path: "", body, onHome: true });
}
