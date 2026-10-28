# Visual regression tests

Playwright screenshots of every main view, in light and dark, compared against baselines in
`visual-regression.spec.ts-snapshots/`.

| View | Captured |
| --- | --- |
| Presets, General, Compute, Storage | full page |
| Charts, Cumulative, Breakdown (E-commerce preset loaded) | 1280×1000 viewport |

A functional test also checks that the footer's theme switch overrides the OS theme.

## Why Docker

Screenshots depend on the fonts and renderer of the machine that takes them. Baselines are
rendered in the official Playwright image, `mcr.microsoft.com/playwright:v1.64.1-noble`, and CI
runs in the same image, so they match pixel for pixel. Run the suite through Docker locally too.
A bare `bun run test:e2e` on your own OS will report differences that are not real.

## Running

Start the app, then run the suite in the container:

```bash
bun run build && bun start      # terminal 1, serves http://localhost:3100
bun run test:e2e:docker         # terminal 2, compares against the baselines
bun run test:e2e:report         # open the HTML report
```

Pass Playwright arguments through, for example `bun run test:e2e:docker -g presets`.

## Updating baselines

After an intended visual change:

```bash
bun run test:e2e:update         # renders new baselines in the container
```

Review the changed PNGs before committing them. In CI, running the **Visual Regression Tests**
workflow by hand does the same and commits the result.

If you bump `@playwright/test`, bump the image tag in `docker.sh` and
`.github/workflows/visual-regression.yml` to the same version, then update the baselines.
