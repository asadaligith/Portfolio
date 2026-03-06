# Architecture Documentation

This document provides a deep dive into the portfolio's architecture, design decisions, and code organization.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Flow](#data-flow)
3. [Component Architecture](#component-architecture)
4. [Styling System](#styling-system)
5. [Animation System](#animation-system)
6. [Theme System](#theme-system)
7. [SEO Implementation](#seo-implementation)
8. [Accessibility](#accessibility)
9. [Testing Strategy](#testing-strategy)
10. [Key Design Decisions](#key-design-decisions)

---

## Architecture Overview

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js App Router                       │
├─────────────────────────────────────────────────────────────────┤
│  layout.tsx                                                      │
│  ├── ThemeProvider (next-themes)                                │
│  ├── JSON-LD Script                                             │
│  └── Metadata (SEO)                                             │
├─────────────────────────────────────────────────────────────────┤
│  page.tsx                                                        │
│  ├── Header (navigation, theme toggle)                          │
│  ├── main                                                        │
│  │   ├── Hero (intro, photo, CTAs)                              │
│  │   ├── Skills (categories grid)                               │
│  │   ├── Projects (featured projects)                           │
│  │   └── Contact (email, social links)                          │
│  └── Footer                                                      │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Data Layer  │    │ UI Components   │    │ Shared Utils    │
│ src/data/   │    │ src/components/ │    │ src/lib/        │
│             │    │ ui/             │    │                 │
│ - profile   │    │ - Button        │    │ - utils.ts      │
│ - projects  │    │ - Card          │    │ - constants.ts  │
│ - skills    │    │ - Badge         │    │                 │
│ - metadata  │    │                 │    │                 │
└─────────────┘    └─────────────────┘    └─────────────────┘
```

### Core Principles

1. **Data-Driven Content** - All portfolio content lives in `src/data/`
2. **Component Composition** - Small, focused components combined for sections
3. **Type Safety** - Full TypeScript with strict mode
4. **Accessibility First** - WCAG 2.1 AA compliance
5. **Performance** - Static generation, optimized images

---

## Data Flow

### Centralized Data Pattern

All content is managed through TypeScript data files, providing:
- Single source of truth
- Type safety with autocomplete
- Easy content updates without touching components

```
src/data/
├── profile.ts      → Hero, Contact, Header
├── projects.ts     → Projects section
├── skills.ts       → Skills section
└── site-metadata.ts → Layout metadata, SEO
```

### Data to Component Flow

```typescript
// src/data/profile.ts
export const profile: Profile = {
  name: "Asad Ali",
  title: "...",
  socialLinks: [...]
};

// src/components/sections/hero.tsx
import { profile } from "@/data/profile";

export function Hero() {
  // Access profile data with full type safety
  return <h1>Hi, I'm {profile.name}</h1>;
}
```

### Helper Functions

Data files can export helper functions for common operations:

```typescript
// src/data/projects.ts
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}
```

---

## Component Architecture

### Component Hierarchy

```
Components
├── sections/          # Page-level sections
│   ├── header.tsx    # Navigation, branding, theme toggle
│   ├── hero.tsx      # Main introduction
│   ├── skills.tsx    # Skills grid
│   ├── projects.tsx  # Project cards
│   ├── contact.tsx   # Contact info
│   └── footer.tsx    # Copyright
│
├── shared/           # Reusable across sections
│   ├── motion.tsx    # Animation wrappers
│   ├── theme-*.tsx   # Theming components
│   ├── section-heading.tsx
│   ├── external-link.tsx
│   └── skill-badge.tsx
│
└── ui/               # Base primitives
    ├── button.tsx    # CVA variants
    ├── card.tsx      # Compound component
    └── badge.tsx     # CVA variants
```

### Section Component Pattern

Each section follows a consistent pattern:

```typescript
"use client";  // Client component for interactivity

import { motion } from "framer-motion";  // Animations
import { FadeIn, StaggerContainer } from "@/components/shared/motion";
import { dataSource } from "@/data/...";  // Centralized data

export function SectionName() {
  return (
    <section
      id="section-id"           // For anchor links
      className="py-16 md:py-24" // Consistent spacing
      aria-label="Section Name"  // Accessibility
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn>
          <SectionHeading>Title</SectionHeading>
        </FadeIn>

        <StaggerContainer className="grid gap-6">
          {/* Content */}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

### UI Component Pattern (shadcn/ui style)

Using Class Variance Authority (CVA) for variant management:

```typescript
// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center...",  // Base styles
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Polymorphic Button (asChild)

The Button supports rendering as different elements using Radix Slot:

```typescript
import { Slot } from "@radix-ui/react-slot";

const Button = ({ asChild, ...props }) => {
  const Comp = asChild ? Slot : "button";
  return <Comp {...props} />;
};

// Usage
<Button asChild>
  <a href="/link">I'm an anchor tag styled as a button</a>
</Button>
```

---

## Styling System

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
export default {
  darkMode: "class",  // Manual toggle via class
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more semantic colors
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
```

### CSS Variables (globals.css)

```css
@layer base {
  :root {
    /* Light mode */
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 44%;
    --card: 0 0% 100%;
    --radius: 0.5rem;
  }

  .dark {
    /* Dark mode overrides */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --card: 222.2 84% 4.9%;
  }
}
```

### Utility: cn() Function

Combines clsx (conditional classes) with tailwind-merge (deduplication):

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className  // Props override
)} />
```

---

## Animation System

### Framer Motion Components

Located in `src/components/shared/motion.tsx`:

#### FadeIn - Viewport-Triggered Entrance

```typescript
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}  // Trigger early
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],  // Custom easing
      }}
    >
      {children}
    </motion.div>
  );
}
```

#### StaggerContainer - Orchestrated Children

```typescript
export function StaggerContainer({ children, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}
```

### Animation Usage Pattern

```tsx
// Section with staggered cards
<FadeIn>
  <SectionHeading>Projects</SectionHeading>
</FadeIn>

<StaggerContainer className="grid gap-6 md:grid-cols-2">
  {projects.map((project) => (
    <StaggerItem key={project.id}>
      <ProjectCard project={project} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Hero Animations

The hero uses direct motion.div for page-load animations:

```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}  // Immediate, not scroll-triggered
  transition={{ duration: 0.5, delay: 0.2 }}
>
  Hi, I'm {profile.name}
</motion.h1>
```

---

## Theme System

### Architecture

```
┌────────────────────────────────────────────────────┐
│              layout.tsx                            │
│  <html suppressHydrationWarning>                   │
│    <body>                                          │
│      <ThemeProvider                                │
│        attribute="class"    ← Adds .dark to <html> │
│        defaultTheme="system"← Respects OS pref     │
│        enableSystem         ← Watches for changes  │
│      >                                             │
│        {children}                                  │
│      </ThemeProvider>                              │
│    </body>                                         │
│  </html>                                           │
└────────────────────────────────────────────────────┘
```

### ThemeToggle Component

```typescript
// src/components/shared/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Placeholder />;

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Animated sun/moon icons */}
      <Sun className="... dark:-rotate-90 dark:scale-0" />
      <Moon className="... dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

### Why `suppressHydrationWarning`?

The theme is determined client-side by `next-themes`. Without this:
- SSR renders with default theme
- Client hydration might have different theme
- React warns about mismatch

---

## SEO Implementation

### Metadata (layout.tsx)

```typescript
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),

  openGraph: {
    title: siteMetadata.title,
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    creator: siteMetadata.twitterHandle,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
    },
  },
};
```

### JSON-LD Structured Data

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteMetadata.siteUrl,
  sameAs: profile.socialLinks.map((link) => link.url),
};

// Injected in <head>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Dynamic Sitemap (src/app/sitemap.ts)

```typescript
import { MetadataRoute } from "next";
import { siteMetadata } from "@/data/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

### Robots.txt (src/app/robots.ts)

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Color Contrast** | 4.5:1 minimum ratio (tested via Axe-Core) |
| **Focus Indicators** | `focus-visible:ring-2 focus-visible:ring-ring` |
| **Touch Targets** | `min-h-[44px] min-w-[44px]` on all buttons |
| **Screen Readers** | `aria-label`, `sr-only` text for icon buttons |
| **Keyboard Nav** | Tab through all interactive elements |
| **Semantic HTML** | `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>` |
| **Heading Hierarchy** | Single `<h1>`, proper `<h2>` structure |

### Accessible Patterns

```tsx
// Icon-only button with screen reader text
<Button>
  <Github aria-hidden="true" />
  <span className="sr-only">View GitHub profile</span>
</Button>

// External links with security
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Open in new tab"
>

// Section landmarks
<section aria-label="Featured Projects" id="projects">
```

---

## Testing Strategy

### E2E Tests (Playwright)

```typescript
// tests/e2e/homepage.spec.ts
test("loads all sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#hero")).toBeVisible();
  await expect(page.locator("#skills")).toBeVisible();
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("CTA scrolls to projects", async ({ page }) => {
  await page.goto("/");
  await page.click('a[href="#projects"]');
  await expect(page.locator("#projects")).toBeInViewport();
});
```

### Accessibility Tests (Axe-Core)

```typescript
// tests/e2e/accessibility.spec.ts
import AxeBuilder from "@axe-core/playwright";

test("passes WCAG 2.1 AA", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

### Test Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
  },
});
```

---

## Key Design Decisions

### 1. Data-Driven Architecture

**Decision:** Separate content from components

**Rationale:**
- Single source of truth for all content
- Non-developers can update content easily
- Type safety prevents runtime errors
- Components remain focused on presentation

### 2. CSS Variables for Theming

**Decision:** Use HSL CSS variables instead of Tailwind dark: classes

**Rationale:**
- Cleaner component code (no dark: prefixes everywhere)
- Easier theme customization
- Works with next-themes attribute="class"

### 3. Framer Motion for Animations

**Decision:** Use Framer Motion instead of CSS animations

**Rationale:**
- Viewport-triggered animations (whileInView)
- Orchestrated stagger effects
- Respects prefers-reduced-motion automatically
- More control over easing and sequencing

### 4. shadcn/ui Component Pattern

**Decision:** Use CVA-based components over a full UI library

**Rationale:**
- Full control over styling
- No external dependencies for core UI
- Easy to customize variants
- Copy-paste philosophy (own your components)

### 5. Static Generation

**Decision:** Use Next.js static generation (no SSR)

**Rationale:**
- Portfolio content doesn't change frequently
- Fastest possible page loads
- Zero server costs (static hosting)
- Perfect Lighthouse scores

---

## File Dependencies

```
layout.tsx
├── ThemeProvider ← src/components/shared/theme-provider.tsx
├── siteMetadata  ← src/data/site-metadata.ts
├── profile       ← src/data/profile.ts
└── globals.css

page.tsx
├── Header        ← src/components/sections/header.tsx
│   ├── ThemeToggle
│   └── NAV_LINKS ← src/lib/constants.ts
├── Hero          ← src/components/sections/hero.tsx
│   ├── profile   ← src/data/profile.ts
│   └── motion    ← framer-motion
├── Skills        ← src/components/sections/skills.tsx
│   ├── skillCategories ← src/data/skills.ts
│   └── FadeIn, Stagger ← src/components/shared/motion.tsx
├── Projects      ← src/components/sections/projects.tsx
│   └── getFeaturedProjects ← src/data/projects.ts
├── Contact       ← src/components/sections/contact.tsx
│   └── profile   ← src/data/profile.ts
└── Footer        ← src/components/sections/footer.tsx
```
