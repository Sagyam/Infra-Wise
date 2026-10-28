# 📦 Installation Guide

## Prerequisites

Before installing InfraWise, ensure you have the following installed:

- **Node.js**: Version 22 or higher ([Download](https://nodejs.org/))
- **Bun**: Version 1.4 or higher ([Installation Guide](https://bun.sh/docs/installation))

### Verify Prerequisites

Check your installed versions:

```bash
node --version  # Should be v22.0.0 or higher
bun --version   # Should be 1.4.0 or higher
```

### Installing Bun

If you don't have Bun installed:

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Using Homebrew (macOS)
brew install oven-sh/bun/bun
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Sagyam/Infra-Wise.git
cd infra-wise
```

### 2. Install Dependencies

```bash
bun install
```

This will install all required packages including:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts
- React Hook Form
- Zod
- And all other dependencies

### 3. Start Development Server

```bash
bun dev
```

The application will start on [http://localhost:3100](http://localhost:3100)

You should see output similar to:

```
▲ Next.js 15.x.x
- Local:        http://localhost:3100
- Ready in xxxms
```

### 4. Open in Browser

Navigate to [http://localhost:3100](http://localhost:3100) in your web browser.

You should see the InfraWise interface with default values pre-populated.

## Available Scripts

### Development

```bash
# Start development server with Turbopack
bun dev
```

Starts the development server with hot module replacement.

### Production Build

```bash
# Build for production
bun run build

# Start production server
bun start
```

Creates an optimized production build and starts the production server.

### Code Quality

```bash
# Run ESLint with auto-fix
bun lint

# Check linting without fixes
bun lint:check

# Format code with Prettier
bun format

# Check formatting without changes
bun format:check

# Run TypeScript type checking
bun typecheck
```

## Troubleshooting

### Node Version Issues

If you encounter Node.js version errors:

```bash
# Using nvm (Node Version Manager)
nvm install 22
nvm use 22

# Or update Node.js from nodejs.org
```

### Bun Installation Issues

If installation fails:

```bash
# Clear Bun's cache
bun pm cache rm

# Reinstall dependencies
rm -rf node_modules
bun install
```

### Port Already in Use

If port 3100 is already in use:

```bash
# Use a different port
bunx next dev -p 3101
```

Or kill the process using port 3100:

```bash
# macOS/Linux
lsof -ti:3100 | xargs kill -9

# Windows
netstat -ano | findstr :3100
taskkill /PID <PID> /F
```

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Clear Bun's cache
bun pm cache rm

# Reinstall dependencies
rm -rf node_modules
bun install

# Rebuild
bun run build
```

### TypeScript Errors

If you see TypeScript errors:

```bash
# Run type checking
bun typecheck

# Ensure all dependencies are installed
bun install

# Clear TypeScript cache
rm -rf .next tsconfig.tsbuildinfo
```

## Environment Setup (Optional)

InfraWise doesn't require environment variables for basic operation. All calculations are performed client-side.

If you want to customize settings, create a `.env.local` file:

```bash
# .env.local (optional)
NEXT_PUBLIC_APP_NAME=InfraWise
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Development Environment

### Recommended IDE Setup

- **Visual Studio Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Docker Setup (Optional)

If you prefer using Docker:

```bash
# Build Docker image
docker build -t infra-wise .

# Run container
docker run -p 3000:3000 infra-wise
```

**Note:** Dockerfile is not included by default. You'll need to create one if you want to use Docker.

## Deployment

### Vercel (Recommended)

InfraWise is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sagyam/Infra-Wise)

### Other Platforms

InfraWise can be deployed on any platform that supports Next.js:

- **Netlify**: Use Next.js plugin
- **AWS Amplify**: Configure build settings
- **Railway**: Zero-config deployment
- **DigitalOcean App Platform**: Node.js buildpack
- **Self-Hosted**: Build and deploy with Node.js

Build command: `bun run build`
Start command: `bun start`
Node version: 22+

## Next Steps

After installation:

1. 📖 Read the [Usage Guide](USAGE.md) to learn how to use InfraWise
2. 📋 Check out [Features](FEATURES.md) for a comprehensive feature list
3. 🤝 See [Contributing](CONTRIBUTING.md) if you want to contribute

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Search existing [GitHub Issues](https://github.com/Sagyam/Infra-Wise/issues)
3. Open a new issue with:
   - Node.js version (`node --version`)
   - Bun version (`bun --version`)
   - Operating system
   - Error messages or screenshots
   - Steps to reproduce
