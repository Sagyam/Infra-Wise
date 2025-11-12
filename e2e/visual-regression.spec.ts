import { test, expect } from '@playwright/test'

/**
 * Visual Regression Tests for Light and Dark Modes
 *
 * These tests capture screenshots of the application in both light and dark modes
 * and compare them against baseline images to detect visual regressions.
 */

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/')
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle')
    // Wait for any hydration to complete
    await page.waitForTimeout(1000)
  })

  test.describe('Light Mode', () => {
    test.use({ colorScheme: 'light' })

    test('homepage should match snapshot in light mode', async ({ page }) => {
      // Set theme to light explicitly
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Take full page screenshot
      await expect(page).toHaveScreenshot('homepage-light.png', {
        fullPage: true,
      })
    })

    test('presets section should match snapshot in light mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Presets section should be visible by default
      const presetsSection = page.locator('text=Infrastructure Presets')
      await expect(presetsSection).toBeVisible()

      await expect(page).toHaveScreenshot('presets-section-light.png', {
        fullPage: true,
      })
    })

    test('general section should match snapshot in light mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Click on General section in sidebar
      await page.getByRole('button', { name: /general/i }).click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('general-section-light.png', {
        fullPage: true,
      })
    })

    test('compute section should match snapshot in light mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Click on Compute section in sidebar
      await page.getByRole('button', { name: /compute/i }).click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('compute-section-light.png', {
        fullPage: true,
      })
    })

    test('storage section should match snapshot in light mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Click on Storage section in sidebar
      await page.getByRole('button', { name: /storage/i }).click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('storage-section-light.png', {
        fullPage: true,
      })
    })
  })

  test.describe('Dark Mode', () => {
    test.use({ colorScheme: 'dark' })

    test('homepage should match snapshot in dark mode', async ({ page }) => {
      // Set theme to dark explicitly
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      })
      await page.waitForTimeout(500)

      // Take full page screenshot
      await expect(page).toHaveScreenshot('homepage-dark.png', {
        fullPage: true,
      })
    })

    test('presets section should match snapshot in dark mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      })
      await page.waitForTimeout(500)

      // Presets section should be visible by default
      const presetsSection = page.locator('text=Infrastructure Presets')
      await expect(presetsSection).toBeVisible()

      await expect(page).toHaveScreenshot('presets-section-dark.png', {
        fullPage: true,
      })
    })

    test('general section should match snapshot in dark mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      })
      await page.waitForTimeout(500)

      // Click on General section in sidebar
      await page.getByRole('button', { name: /general/i }).click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('general-section-dark.png', {
        fullPage: true,
      })
    })

    test('compute section should match snapshot in dark mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      })
      await page.waitForTimeout(500)

      // Click on Compute section in sidebar
      await page.getByRole('button', { name: /compute/i }).click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('compute-section-dark.png', {
        fullPage: true,
      })
    })

    test('storage section should match snapshot in dark mode', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      })
      await page.waitForTimeout(500)

      // Click on Storage section in sidebar
      await page.getByRole('button', { name: /storage/i }).click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('storage-section-dark.png', {
        fullPage: true,
      })
    })
  })

  test.describe('Theme Toggle', () => {
    test('theme toggle should switch between light and dark modes', async ({
      page,
    }) => {
      // Find and click the theme toggle button
      const themeToggle = page.locator('button[aria-label*="theme" i]').first()

      // Start with light mode
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Take screenshot in light mode
      await expect(page).toHaveScreenshot('theme-toggle-light.png', {
        fullPage: false,
      })

      // Click to switch to dark mode
      await themeToggle.click()
      await page.waitForTimeout(500)

      // Take screenshot in dark mode
      await expect(page).toHaveScreenshot('theme-toggle-dark.png', {
        fullPage: false,
      })
    })
  })

  test.describe('Results Display', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to general section and submit the form to see results
      await page.getByRole('button', { name: /general/i }).click()
      await page.waitForTimeout(500)

      // Click the Calculate button
      const calculateButton = page.getByRole('button', { name: /calculate/i })
      if (await calculateButton.isVisible()) {
        await calculateButton.click()
        // Wait for calculation to complete
        await page.waitForTimeout(2000)
      }
    })

    test('results should match snapshot in light mode', async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      })
      await page.waitForTimeout(500)

      // Click on Results section in sidebar
      const resultsButton = page.getByRole('button', { name: /results/i }).first()
      if (await resultsButton.isVisible()) {
        await resultsButton.click()
        await page.waitForTimeout(500)

        await expect(page).toHaveScreenshot('results-section-light.png', {
          fullPage: true,
        })
      }
    })

    test('results should match snapshot in dark mode', async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      })
      await page.waitForTimeout(500)

      // Click on Results section in sidebar
      const resultsButton = page.getByRole('button', { name: /results/i }).first()
      if (await resultsButton.isVisible()) {
        await resultsButton.click()
        await page.waitForTimeout(500)

        await expect(page).toHaveScreenshot('results-section-dark.png', {
          fullPage: true,
        })
      }
    })
  })
})
