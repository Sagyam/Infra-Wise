# Visual Regression Testing Setup

This project includes comprehensive visual regression testing for both **light** and **dark** modes using Playwright.

## 🎯 What's Included

### Test Coverage

- **Homepage** - Full page screenshots in light & dark modes
- **Presets Section** - Infrastructure preset selector
- **General Section** - Analysis period and calculation settings
- **Compute Section** - Server and VM configurations
- **Storage Section** - Storage tier configurations
- **Results Display** - Charts and breakdowns
- **Theme Toggle** - Theme switching functionality

### Automated CI/CD

- Tests run automatically on push and pull requests
- Baseline screenshots can be generated in CI
- Test reports and failure screenshots uploaded as artifacts
- Support for manual baseline updates via GitHub Actions

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Build the Application

```bash
npm run build
```

### 3. Generate Initial Baselines

#### Option A: Generate in CI (Recommended)

1. Go to **Actions** tab in GitHub
2. Select **Initialize Visual Regression Baselines** workflow
3. Click **Run workflow**
4. Review and merge the PR created with baselines

#### Option B: Generate Locally

```bash
npm run test:e2e:update
```

**Note**: Local baselines may differ from CI due to OS-specific font rendering. CI-generated baselines are recommended for consistency.

## 📝 Available Commands

```bash
# Run all visual regression tests
npm run test:e2e

# Run tests with interactive UI
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# Update baseline screenshots
npm run test:e2e:update

# View test report
npm run test:e2e:report
```

## 🔄 Workflow

### When Making UI Changes

1. Make your changes to components/styles
2. Run tests: `npm run test:e2e`
3. If tests fail, review the diff:
   - View report: `npm run test:e2e:report`
   - Check visual differences
4. If changes are intentional:
   - Update baselines: `npm run test:e2e:update`
   - Commit updated screenshots
5. Push and create PR

### In CI

Tests run automatically on:
- Push to main/master/develop branches
- Pull requests to main/master/develop
- Manual workflow dispatch

## 📁 Project Structure

```
Infra-Wise/
├── e2e/
│   ├── README.md                          # Detailed test documentation
│   ├── visual-regression.spec.ts          # Test suite
│   └── visual-regression.spec.ts-snapshots/  # Baseline images
│       ├── chromium-light/
│       │   ├── homepage-light.png
│       │   ├── presets-section-light.png
│       │   └── ...
│       └── chromium-dark/
│           ├── homepage-dark.png
│           ├── presets-section-dark.png
│           └── ...
├── .github/
│   └── workflows/
│       ├── visual-regression.yml          # Main CI workflow
│       └── visual-regression-init.yml     # Baseline generation
├── playwright.config.ts                    # Playwright configuration
└── VISUAL_REGRESSION_TESTING.md          # This file
```

## 🎨 Light & Dark Mode Testing

Tests are configured to run in two separate projects:

1. **chromium-light**: Tests with `colorScheme: 'light'`
2. **chromium-dark**: Tests with `colorScheme: 'dark'`

Each test explicitly sets the theme by manipulating the HTML class:

```typescript
// Light mode
await page.evaluate(() => {
  document.documentElement.classList.remove('dark')
  document.documentElement.classList.add('light')
})

// Dark mode
await page.evaluate(() => {
  document.documentElement.classList.remove('light')
  document.documentElement.classList.add('dark')
})
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

```typescript
{
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3100',
    colorScheme: 'light' | 'dark'  // Per project
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,      // Allow 100 pixels difference
      threshold: 0.2,           // 20% pixel difference tolerance
    }
  }
}
```

### Adjusting Thresholds

If you experience frequent false positives:

```typescript
// In playwright.config.ts
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 200,    // Increase if needed
    threshold: 0.3,        // Increase tolerance
  }
}
```

## 🐛 Troubleshooting

### Tests Fail with Minor Differences

**Cause**: Font rendering or anti-aliasing differences

**Solution**:
1. Review the diff: `npm run test:e2e:report`
2. If acceptable, update: `npm run test:e2e:update`
3. Or generate baselines in CI for consistency

### Tests Timeout

**Cause**: Server taking too long to start or build issues

**Solution**:
```bash
# Check build works
npm run build

# Increase timeout in playwright.config.ts
webServer: {
  timeout: 180000  // 3 minutes
}
```

### Page Crashes in Local Environment

**Cause**: Local environment configuration differences

**Solution**:
- Use CI to generate baselines (recommended)
- Check for missing environment variables
- Ensure clean build: `rm -rf .next && npm run build`

### Different Results Between Local and CI

**Cause**: OS-specific rendering (fonts, anti-aliasing)

**Solution**:
- Always use CI-generated baselines as source of truth
- Or use Docker locally to match CI environment

## 📊 CI/CD Integration

### GitHub Actions Workflows

#### 1. Main Workflow (`visual-regression.yml`)

Runs on every push and PR:
- Installs dependencies
- Builds application
- Runs visual regression tests
- Uploads test reports and failure screenshots
- Uploads baselines on main branch

#### 2. Initialization Workflow (`visual-regression-init.yml`)

Manual workflow to generate initial baselines:
- Generates all baseline screenshots
- Creates a PR with the baselines
- Requires manual review and merge

### Viewing Results

1. **Go to Actions tab** in your repository
2. **Select the workflow run**
3. **Download artifacts**:
   - `playwright-report` - Full HTML report with diffs
   - `playwright-screenshots` - Failure screenshots
   - `baseline-screenshots` - Generated baselines

## 📚 Best Practices

### 1. Always Review Visual Diffs

Never blindly update baselines. Always review the visual diff to ensure changes are intentional.

```bash
npm run test:e2e:report  # Opens HTML report in browser
```

### 2. Commit Baseline Screenshots

Baseline screenshots should be committed to version control so all developers and CI use the same reference.

```bash
git add e2e/**/*-snapshots/
git commit -m "chore: update visual regression baselines"
```

### 3. Use CI for Consistency

Generate and update baselines in CI to avoid OS-specific rendering differences.

### 4. Test Key User Journeys

Don't try to screenshot every possible state. Focus on:
- Critical user paths
- Key UI components
- Different theme modes
- Responsive breakpoints (if needed)

### 5. Keep Tests Fast

Visual tests can be slow. Optimize by:
- Testing only critical views
- Using `networkidle` wisely
- Avoiding unnecessary waits

### 6. Regular Updates

Keep Playwright and browsers updated:

```bash
npm update @playwright/test playwright
npx playwright install chromium
```

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Visual Comparison Guide](https://playwright.dev/docs/test-snapshots)
- [GitHub Actions for Playwright](https://playwright.dev/docs/ci-intro)
- [Project README](./e2e/README.md)

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review test reports: `npm run test:e2e:report`
3. Check [Playwright Documentation](https://playwright.dev/)
4. Open an issue in the repository

## 🎉 Next Steps

1. ✅ Run the **Initialize Visual Regression Baselines** workflow in GitHub Actions
2. ✅ Review and merge the PR with baseline screenshots
3. ✅ Start making UI changes confidently knowing tests will catch regressions
4. ✅ Integrate visual tests into your PR review process

Happy testing! 🚀
