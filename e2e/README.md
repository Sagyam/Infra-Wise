# Visual Regression Testing

This directory contains visual regression tests for the InfraWise application using Playwright.

## Overview

Visual regression tests automatically capture screenshots of the application in both **light** and **dark** modes and compare them against baseline images to detect unintended visual changes.

## What's Tested

The test suite covers:

- **Homepage** (light & dark modes)
- **Presets Section** (light & dark modes)
- **General Section** (light & dark modes)
- **Compute Section** (light & dark modes)
- **Storage Section** (light & dark modes)
- **Results Display** (light & dark modes)
- **Theme Toggle** functionality

## Running Tests

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers (one-time setup)
npx playwright install chromium
```

### Run Tests

```bash
# Run all visual regression tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

### Update Baseline Screenshots

When you intentionally make visual changes to the application, you'll need to update the baseline screenshots:

```bash
# Update all baselines
npm run test:e2e:update

# Update specific test baselines
npx playwright test --update-snapshots visual-regression.spec.ts
```

**Important**: Review the visual changes carefully before committing updated baselines!

## CI/CD Integration

Visual regression tests run automatically in GitHub Actions on:

- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches
- Manual workflow dispatch

### Viewing Test Results in CI

When tests run in CI:

1. **Test Reports**: Available as artifacts in the GitHub Actions run
2. **Screenshots**: Failure screenshots are uploaded as artifacts
3. **Baseline Updates**: Can be triggered via manual workflow dispatch

### Updating Baselines in CI

To update baselines through GitHub Actions:

1. Go to **Actions** tab in your repository
2. Select **Visual Regression Tests** workflow
3. Click **Run workflow**
4. The workflow will update baselines and commit them automatically

## Test Structure

```
e2e/
├── README.md                          # This file
├── visual-regression.spec.ts          # Visual regression test suite
└── visual-regression.spec.ts-snapshots/  # Baseline screenshots (git-tracked)
    ├── chromium-light/
    │   ├── homepage-light.png
    │   ├── presets-section-light.png
    │   └── ...
    └── chromium-dark/
        ├── homepage-dark.png
        ├── presets-section-dark.png
        └── ...
```

## How It Works

1. **Test Execution**: Playwright launches a Chromium browser and navigates to the application
2. **Theme Application**: Tests explicitly set light or dark mode via CSS classes
3. **Screenshot Capture**: Full-page screenshots are captured for each test scenario
4. **Comparison**: Screenshots are compared against baseline images
5. **Reporting**: Any differences are highlighted in the test report

## Configuration

The tests are configured in `playwright.config.ts`:

- **Browser**: Chromium (Chrome-based)
- **Viewport**: Desktop Chrome default (1280x720)
- **Color Schemes**: Light and Dark modes tested separately
- **Threshold**: 0.2 (20% pixel difference tolerance)
- **Max Diff Pixels**: 100 pixels

## Troubleshooting

### Tests Fail Due to Minor Differences

If tests fail due to minor pixel differences:

1. Check the test report: `npm run test:e2e:report`
2. Review the visual diff images
3. If changes are expected, update baselines: `npm run test:e2e:update`

### Tests Timeout

If tests timeout during execution:

- Ensure the development server is not already running on port 3100
- Increase timeout in `playwright.config.ts` if needed
- Check for build errors: `npm run build`

### Baselines Look Different Locally vs CI

This can happen due to font rendering differences between operating systems:

- Generate baselines in CI using the manual workflow
- Or use Docker to match the CI environment

## Best Practices

1. **Review Visual Changes**: Always review screenshot diffs before updating baselines
2. **Commit Baselines**: Baseline screenshots should be committed to version control
3. **Test on CI**: Run tests on CI before merging to catch platform-specific issues
4. **Keep Tests Fast**: Avoid testing every possible state; focus on key user journeys
5. **Update Regularly**: Keep Playwright and browsers up to date

## Learn More

- [Playwright Documentation](https://playwright.dev/)
- [Visual Comparison Testing Guide](https://playwright.dev/docs/test-snapshots)
- [Best Practices for Visual Testing](https://playwright.dev/docs/best-practices)
