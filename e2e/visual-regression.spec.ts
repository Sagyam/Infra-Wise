import { expect, type Page, test } from '@playwright/test'

/**
 * Visual regression tests.
 *
 * Each test runs once per project in playwright.config.ts (chromium-light and chromium-dark),
 * which set the OS colour scheme that the app follows by default. Baselines are rendered in the
 * Playwright Docker image so they match CI pixel for pixel; see e2e/README.md.
 */

// The "Preset loaded" toast lands at a different moment on every run.
const HIDE_TOASTS =
  '[role=region][aria-label^=Notifications] { display: none !important; }'

async function open(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await page.addStyleTag({ content: HIDE_TOASTS })
}

async function goTo(page: Page, section: string) {
  // Exact names: the preset cards mention "compute" and "storage" in their descriptions.
  await page.getByRole('button', { name: section, exact: true }).click()
  await page.waitForLoadState('networkidle')
}

async function loadPreset(page: Page) {
  await page.getByRole('button', { name: /E-commerce Platform/ }).click()
}

test.describe('Visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('presets', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /owning beats renting/ }),
    ).toBeVisible()
    await expect(page).toHaveScreenshot('presets.png', { fullPage: true })
  })

  for (const section of ['General', 'Compute', 'Storage']) {
    test(`${section.toLowerCase()} inputs`, async ({ page }) => {
      await goTo(page, section)
      await expect(page).toHaveScreenshot(`${section.toLowerCase()}.png`, {
        fullPage: true,
      })
    })
  }

  for (const section of ['Charts', 'Cumulative', 'Breakdown']) {
    test(`${section.toLowerCase()} results`, async ({ page }) => {
      // A full-page capture resizes the page mid-shot and Recharts redraws at the wrong height,
      // so results are captured in a viewport tall enough to hold them instead.
      await page.setViewportSize({ width: 1280, height: 1000 })
      await loadPreset(page)
      await goTo(page, section)
      // Recharts animates in JavaScript, which Playwright's animation freeze does not reach.
      await page.waitForTimeout(1500)
      await expect(page).toHaveScreenshot(`${section.toLowerCase()}.png`)
    })
  }
})

test.describe('Theme switch', () => {
  test('the footer switch overrides the OS theme', async ({ page }) => {
    await open(page)
    const html = page.locator('html')

    await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await expect(html).toHaveClass(/\bdark\b/)

    await page.getByRole('button', { name: 'Light', exact: true }).click()
    await expect(html).not.toHaveClass(/\bdark\b/)
  })
})
