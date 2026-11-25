# OptiLink — Dummy Product Site

A static, dependency-free demo landing page for the fictional **OptiLink** link-management product.

## Structure

```
site/
├── src/            # source files (index.html, styles.css, main.js)
├── build.mjs       # build script: copies + minifies src/ into dist/
├── package.json
└── dist/           # generated output (git-ignored)
```

## Build

Requires Node.js 18+.

```bash
cd site
npm run build      # outputs to site/dist
# open site/dist/index.html in a browser to preview
```

## Publish

Pushing changes under `site/` to `main` triggers `.github/workflows/deploy-site.yml`,
which builds the site and deploys `site/dist` to GitHub Pages.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

> This is a demo. The shortener and signup forms do not send data anywhere.
