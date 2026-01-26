# Quickstart: Personal Developer Portfolio Website

**Feature**: 001-portfolio-website
**Date**: 2026-01-27

## Prerequisites

- Node.js 20 LTS or later
- pnpm (recommended) or npm
- Git

## Initial Setup

### 1. Create Next.js Project

```bash
# Using pnpm (recommended)
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Or using npm
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When prompted:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use `src/` directory? **Yes**
- Would you like to use App Router? **Yes**
- Would you like to customize the default import alias? **Yes** (@/*)

### 2. Configure TypeScript Strict Mode

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 3. Install Additional Dependencies

```bash
# Shadcn UI CLI
pnpm add -D @shadcn/ui

# Initialize Shadcn UI
pnpm dlx shadcn-ui@latest init

# When prompted:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
# - Tailwind config: tailwind.config.ts
# - Components location: src/components
# - Utility location: src/lib/utils

# Add required components
pnpm dlx shadcn-ui@latest add button card badge

# Testing dependencies
pnpm add -D @playwright/test vitest @vitejs/plugin-react
pnpm add -D @axe-core/playwright

# Development dependencies
pnpm add -D prettier prettier-plugin-tailwindcss
```

### 4. Create Project Structure

```bash
# Create directories
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/components/shared
mkdir -p src/data
mkdir -p src/types
mkdir -p src/lib
mkdir -p public/images
mkdir -p tests/e2e
mkdir -p tests/unit/components
```

### 5. Configure Prettier

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 6. Configure ESLint

Update `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### 7. Configure Next.js

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
};

export default nextConfig;
```

### 8. Configure Playwright

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

### 9. Configure Vitest

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Create `tests/setup.ts`:

```typescript
import "@testing-library/jest-dom";
```

### 10. Add Package Scripts

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/e2e/accessibility.spec.ts"
  }
}
```

## Verification

Run these commands to verify setup:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Formatting
pnpm format:check

# Development server
pnpm dev
```

Visit http://localhost:3000 to confirm the app runs.

## Next Steps

1. Create type definitions in `src/types/index.ts`
2. Add data files in `src/data/`
3. Build components in `src/components/`
4. Compose page in `src/app/page.tsx`
5. Add tests in `tests/`
6. Deploy to Vercel

## Common Issues

### Shadcn UI Components Not Found

```bash
# Reinstall shadcn-ui and add components
pnpm dlx shadcn-ui@latest init --force
pnpm dlx shadcn-ui@latest add button card badge
```

### TypeScript Import Errors

Ensure `tsconfig.json` has correct path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Classes Not Applied

1. Check `tailwind.config.ts` content paths include all component locations
2. Ensure `globals.css` has Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Environment Variables

Create `.env.local` (not committed):

```bash
# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=

# Optional: Contact form (if added later)
CONTACT_EMAIL=
```

Create `.env.example` (committed):

```bash
# Copy to .env.local and fill in values
NEXT_PUBLIC_ANALYTICS_ID=
CONTACT_EMAIL=
```
