# 🤝 Contributing to InfraWise

Thank you for considering contributing to InfraWise! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Areas for Contribution](#areas-for-contribution)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Git
- Familiarity with TypeScript, React, and Next.js

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/infra-wise.git
   cd infra-wise
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Sagyam/Infra-Wise.git
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```
5. **Start development server**:
   ```bash
   pnpm dev
   ```

## Development Workflow

### 1. Create a Branch

Create a branch for your work:

```bash
# For new features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/issue-description

# For documentation
git checkout -b docs/what-you-are-documenting
```

### 2. Make Changes

- Write clean, readable code
- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

Before committing:

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Fix linting issues automatically
pnpm lint --fix

# Format code
pnpm format

# Test the application
pnpm dev
# Then manually test in browser
```

### 4. Commit Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add sensitivity analysis for storage costs"
```

**Commit message format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Keep Your Branch Updated

```bash
# Fetch upstream changes
git fetch upstream

# Rebase on main
git rebase upstream/master
```

### 6. Push Changes

```bash
git push origin feature/your-feature-name
```

### 7. Open Pull Request

1. Go to GitHub and open a Pull Request
2. Fill out the PR template
3. Link related issues
4. Wait for review

## Code Standards

### TypeScript

- **Use strict typing**: No `any` types unless absolutely necessary
- **Define interfaces**: Create types for all data structures
- **Use Zod schemas**: For form validation and runtime type checking
- **Export types**: Make types reusable across components

Example:
```typescript
// Good
interface CostBreakdown {
  energy: number
  storage: number
  compute: number
}

// Avoid
const breakdown: any = { ... }
```

### React Components

- **Functional components**: Use function components with hooks
- **Component naming**: PascalCase for components
- **File naming**: kebab-case for files
- **Props interfaces**: Define clear prop types
- **Use hooks**: Leverage React hooks for state and effects

Example structure:
```typescript
interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  // Component implementation
}
```

### Styling

- **Tailwind CSS**: Use Tailwind utility classes
- **Component variants**: Use cva (class-variance-authority) for variants
- **Responsive design**: Mobile-first approach
- **Theme variables**: Use CSS variables from theme
- **Consistency**: Follow existing patterns in the codebase

Example:
```typescript
<div className="rounded-lg border bg-card p-6 shadow-sm">
  <h2 className="text-2xl font-bold tracking-tight">Title</h2>
</div>
```

### Code Organization

- **Component structure**:
  ```
  components/
  ├── app/              # Application-specific components
  │   ├── sections/     # Section components
  │   ├── form/         # Form components
  │   └── ...
  └── ui/               # Reusable UI components (shadcn)
  ```

- **File structure**:
  - One component per file
  - Export from index files for cleaner imports
  - Colocate related files (component, styles, tests)

### Performance

- **Memoization**: Use `useMemo` and `useCallback` appropriately
- **Lazy loading**: Use dynamic imports for large components
- **Avoid unnecessary re-renders**: Optimize component updates
- **Server components**: Use server components where possible (Next.js 15)

### Accessibility

- **Semantic HTML**: Use appropriate HTML elements
- **ARIA labels**: Add labels for screen readers
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Focus management**: Visible focus indicators
- **Color contrast**: Meet WCAG AA standards

## Areas for Contribution

### High Priority

1. **Additional Cost Categories**
   - Disaster recovery
   - Business continuity
   - Backup and archival
   - Support contracts

2. **Cloud Provider Templates**
   - AWS-specific pricing
   - Azure-specific pricing
   - GCP-specific pricing
   - Multi-cloud scenarios

3. **Enhanced Visualizations**
   - Additional chart types
   - Custom color themes
   - Comparison views
   - Trend analysis

4. **Export Formats**
   - PDF generation
   - Excel/XLSX export
   - PowerPoint slides
   - JSON/YAML export

### Medium Priority

5. **Scenario Comparison**
   - Save multiple scenarios
   - Side-by-side comparison
   - Scenario versioning
   - Diff views

6. **Multi-Currency Support**
   - Currency conversion
   - Regional pricing
   - Exchange rate handling

7. **Advanced Features**
   - What-if analysis
   - Monte Carlo simulations
   - Risk modeling
   - Probability distributions

8. **API Integration**
   - Real-time cloud pricing APIs
   - Cost optimization suggestions
   - Historical price tracking

### Documentation

9. **Tutorials and Guides**
   - Video tutorials
   - Use case examples
   - Best practices guide
   - FAQ section

10. **Code Documentation**
    - JSDoc comments
    - Architecture documentation
    - API documentation
    - Calculation methodology

## Pull Request Process

### Before Submitting

1. ✅ Code passes all type checks (`pnpm typecheck`)
2. ✅ Code passes linting (`pnpm lint`)
3. ✅ Code is formatted (`pnpm format`)
4. ✅ Application runs without errors (`pnpm dev`)
5. ✅ Changes are tested manually
6. ✅ Documentation is updated if needed
7. ✅ Commit messages follow conventions

### PR Template

When opening a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code passes typecheck
- [ ] Code passes linting
- [ ] Documentation updated
- [ ] Changes tested manually
```

### Review Process

1. **Automated checks**: CI/CD will run automatically
2. **Code review**: Maintainer will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Merge**: Squash and merge into main branch

### After Merge

- Your contribution will be in the next release
- You'll be added to contributors list
- Delete your feature branch

## Reporting Issues

### Before Creating an Issue

1. **Search existing issues**: Check if already reported
2. **Verify it's a bug**: Confirm it's not expected behavior
3. **Collect information**:
   - Node.js version
   - pnpm version
   - Operating system
   - Browser (if UI issue)
   - Steps to reproduce

### Issue Template

```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. ...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node.js version:
- pnpm version:
- OS:
- Browser:

## Screenshots
If applicable

## Additional Context
Any other relevant information
```

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `question`: Further information requested

## Questions?

If you have questions:

1. Check existing [documentation](../README.md)
2. Search [GitHub Discussions](https://github.com/Sagyam/Infra-Wise/discussions)
3. Open a new discussion
4. Ask in pull request comments

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to InfraWise!** 💙

Your contributions help infrastructure teams make better decisions worldwide.
