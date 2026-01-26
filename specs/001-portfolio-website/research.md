# Research: Personal Developer Portfolio Website

**Feature**: 001-portfolio-website
**Date**: 2026-01-27
**Status**: Complete

## Technology Decisions

### 1. Framework: Next.js 14+ with App Router

**Decision**: Use Next.js 14+ with App Router (not Pages Router)

**Rationale**:
- Constitution mandates Next.js 14+ with App Router
- App Router provides better performance through React Server Components
- Built-in image optimization via `next/image`
- Native metadata API for SEO (generateMetadata)
- Static Site Generation (SSG) for zero-JS static pages where possible

**Alternatives Considered**:
- Pages Router: Older pattern, less optimized, constitution forbids
- Astro: Better for static sites but not in constitution stack
- Remix: Good alternative but not in constitution stack

### 2. Styling: Tailwind CSS + Shadcn UI

**Decision**: Tailwind CSS 3.4+ with Shadcn UI components

**Rationale**:
- Constitution requires Tailwind CSS
- Shadcn UI provides accessible, customizable components without bundle bloat
- Components are copied into codebase (not npm dependency) — full control
- No runtime CSS-in-JS overhead (constitution forbids)
- Tailwind JIT provides only CSS actually used

**Alternatives Considered**:
- Chakra UI: Runtime CSS-in-JS — constitution forbids
- Material UI: Heavy bundle, runtime styles — constitution forbids
- Radix UI only: Missing button/card styles, would need more custom CSS

### 3. Typography: System Font Stack

**Decision**: Use system font stack (no custom fonts)

**Rationale**:
- Constitution principle II requires performance (< 500KB page weight)
- System fonts have zero network overhead
- Modern system fonts (SF Pro, Segoe UI, Inter) are excellent
- No FOUT/FOIT (flash of unstyled/invisible text)
- Constitution says "system fonts preferred for performance"

**Alternatives Considered**:
- Google Fonts (Inter): Would add network request, FOUT, larger page weight
- Self-hosted fonts: Better than Google but still adds weight
- Variable fonts: Interesting but unnecessary complexity for this scope

**Font Stack**:
```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### 4. Data Storage: Static TypeScript Files

**Decision**: Store all content in static TypeScript files (no CMS/database)

**Rationale**:
- Spec assumes static content (no CMS in scope)
- TypeScript files provide type safety at build time
- Zero API complexity — all data inlined at build
- Easy to edit directly in codebase
- Optimal performance (no runtime data fetching)

**Alternatives Considered**:
- Sanity CMS: Overkill for 5 projects + profile, adds complexity
- Contentlayer: Good for larger sites but unnecessary here
- JSON files: Works but loses TypeScript type checking

### 5. Image Optimization: next/image with WebP

**Decision**: Use next/image component with WebP format

**Rationale**:
- Constitution requires image optimization
- next/image provides automatic:
  - WebP/AVIF conversion
  - Responsive srcset generation
  - Lazy loading
  - Blur placeholder
  - Layout shift prevention (CLS optimization)

**Configuration**:
```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
}
```

### 6. Testing Stack: Playwright + Vitest + axe-core

**Decision**: Playwright for E2E, Vitest for unit, axe-core for accessibility

**Rationale**:
- Constitution requires testing (Playwright E2E, Jest/Vitest unit, a11y in CI)
- Playwright: Best-in-class E2E, built-in accessibility testing
- Vitest: Fast, Vite-native, Jest-compatible API
- axe-core: Industry standard for accessibility automation

**Alternatives Considered**:
- Cypress: Good but Playwright is faster and has better browser support
- Jest: Works but Vitest is faster for modern projects
- pa11y: Good but axe-core has better Playwright integration

### 7. Dark Mode: System Preference with Tailwind

**Decision**: Implement dark mode via system preference (prefers-color-scheme)

**Rationale**:
- Spec assumption: "default to system preference with light mode fallback"
- Tailwind `dark:` variant handles styling easily
- No client-side JS needed for initial preference
- Respects user's OS-level setting

**Implementation**:
```typescript
// tailwind.config.ts
darkMode: 'media', // Uses prefers-color-scheme
```

### 8. SEO: Next.js Metadata API + JSON-LD

**Decision**: Use Next.js Metadata API with JSON-LD structured data

**Rationale**:
- FR-019 to FR-022 require comprehensive SEO
- Metadata API is native to Next.js App Router
- JSON-LD Person schema improves search presence
- Sitemap and robots.txt via route handlers

**Structured Data Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Asad Ali",
  "jobTitle": "Agentic AI Engineer + Full Stack Developer",
  "url": "https://asadali.dev",
  "sameAs": ["https://github.com/asadali", "https://linkedin.com/in/asadali"]
}
```

### 9. Smooth Scroll: CSS + Scroll Behavior

**Decision**: Use CSS `scroll-behavior: smooth` with anchor links

**Rationale**:
- Constitution forbids heavy animation libraries
- Native CSS is performant and accessible
- Respects `prefers-reduced-motion`
- Works without JavaScript

**Implementation**:
```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### 10. Deployment: Vercel

**Decision**: Deploy to Vercel

**Rationale**:
- Constitution specifies "Vercel (primary)"
- Native Next.js support with zero config
- Automatic preview deployments for PRs
- Edge network for global performance
- Built-in analytics and Web Vitals

## Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| LCP | < 2.5s | Constitution requirement |
| FID/INP | < 100ms | Constitution requirement |
| CLS | < 0.1 | Constitution requirement |
| Total JS | < 500KB | Constitution requirement |
| Lighthouse Performance | ≥ 95 | Spec SC-004 |
| Lighthouse Accessibility | ≥ 100 | Constitution principle III |
| Lighthouse Best Practices | ≥ 95 | Constitution requirement |
| Lighthouse SEO | ≥ 100 | Constitution requirement |

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| WCAG 2.2 AA | axe-core automated tests |
| Semantic HTML | Proper heading hierarchy, landmarks |
| Keyboard navigation | Focus management, skip links |
| Screen reader | ARIA labels where needed |
| Color contrast | 4.5:1 text, 3:1 large text |
| Focus indicators | Visible focus rings |
| Reduced motion | prefers-reduced-motion media query |

## Unresolved Items

None. All technical decisions are resolved.
