# Implementation Plan: Personal Developer Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-website/spec.md`

## Summary

Build a single-page professional portfolio for Asad Ali showcasing expertise as an Agentic AI Engineer and Full Stack Developer. The implementation uses Next.js 14+ with App Router, Tailwind CSS, TypeScript, and Shadcn UI components. The site features a hero section with professional identity, categorized skills display, 5 featured projects, and contact access—all optimized for performance (Lighthouse 90+), accessibility (WCAG 2.2 AA), and SEO.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 20 LTS
**Primary Dependencies**: Next.js 14+, Tailwind CSS 3.4+, Shadcn UI, next/image, next-sitemap
**Storage**: Static data files (TypeScript objects) — no database required
**Testing**: Playwright (E2E + accessibility), Vitest (unit), axe-core (a11y)
**Target Platform**: Web (all modern browsers), deployed to Vercel Edge
**Project Type**: Web application (single-page with sections)
**Performance Goals**: Lighthouse ≥ 95 all categories, LCP < 2.5s, CLS < 0.1, < 500KB JS
**Constraints**: Mobile-first, WCAG 2.2 AA, no runtime CSS-in-JS, no heavy animation libs
**Scale/Scope**: Single page, 4 sections, 5 projects, ~20 skill items, solo developer

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status |
|-----------|-------------|--------|
| I. Professional Clarity First | Hero communicates who/what/why | ✅ Spec defines exact copy |
| II. Performance as a Feature | LCP < 2.5s, Lighthouse ≥ 95, < 500KB JS | ✅ SSG + optimized images |
| III. Accessibility Without Compromise | WCAG 2.2 AA, semantic HTML, keyboard nav | ✅ Planned with axe-core CI |
| IV. Minimal Visual Design | Max 2 fonts, 3-4 colors, no parallax | ✅ System fonts + Tailwind |
| V. Content for Technical Audiences | Projects with problem/approach/outcome | ✅ Data model enforces this |
| VI. Production-Ready Engineering | Next.js 14+, TypeScript strict, ESLint/Prettier | ✅ All in stack |

**Constitution Gate**: ✅ PASSED — No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-website/
├── plan.md              # This file
├── research.md          # Phase 0: Technology decisions
├── data-model.md        # Phase 1: Entity definitions
├── quickstart.md        # Phase 1: Setup instructions
├── contracts/           # Phase 1: N/A (no API)
└── tasks.md             # Phase 2: Implementation tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage (all sections)
│   ├── globals.css          # Tailwind imports + CSS variables
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── robots.ts            # Robots.txt generation
├── components/
│   ├── ui/                  # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── sections/            # Page sections
│   │   ├── hero.tsx
│   │   ├── skills.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   └── shared/              # Reusable components
│       ├── section-heading.tsx
│       ├── external-link.tsx
│       └── skill-badge.tsx
├── data/
│   ├── profile.ts           # Name, title, tagline, links
│   ├── skills.ts            # Categorized skills array
│   └── projects.ts          # 5 featured projects
├── lib/
│   ├── utils.ts             # cn() utility for Tailwind
│   └── constants.ts         # Site-wide constants
└── types/
    └── index.ts             # TypeScript interfaces

public/
├── images/
│   └── profile.webp         # Professional photo (optimized)
├── favicon.ico
└── og-image.png             # Open Graph image

tests/
├── e2e/
│   ├── homepage.spec.ts     # Full page E2E tests
│   └── accessibility.spec.ts # axe-core integration
└── unit/
    └── components/          # Component unit tests

Configuration files (root):
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── playwright.config.ts
└── vitest.config.ts
```

**Structure Decision**: Next.js App Router with co-located components. Sections are standalone components composed in `page.tsx`. Data is static TypeScript files for type safety and zero API complexity.

## Design System

### Typography

```text
Font Stack: System fonts (no external fonts for performance)
- Headings: font-sans (Inter fallback chain)
- Body: font-sans
- Code: font-mono (for tech stack badges)

Scale (Tailwind defaults):
- Hero heading: text-4xl md:text-5xl lg:text-6xl (36/48/60px)
- Section headings: text-3xl md:text-4xl (30/36px)
- Subheadings: text-xl md:text-2xl (20/24px)
- Body: text-base (16px)
- Small: text-sm (14px)
```

### Color Palette

```text
Primary: slate-900 (text), slate-50 (background)
Accent: blue-600 (links, primary CTA)
Secondary: slate-600 (secondary text)
Borders: slate-200
Hover states: blue-700 (accent hover), slate-100 (card hover)

Dark mode (system preference):
- Background: slate-950
- Text: slate-50
- Accent: blue-400
```

### Spacing

```text
Section padding: py-16 md:py-24 (64/96px vertical)
Container: max-w-6xl mx-auto px-4 md:px-6 (1152px max width)
Component gaps: gap-4 md:gap-6 (16/24px)
Card padding: p-6 (24px)
```

### Breakpoints (Tailwind defaults)

```text
sm: 640px   (small tablets)
md: 768px   (tablets, mobile landscape)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
2xl: 1536px (extra large)
```

## Implementation Phases

### Phase 1: Project Setup

1. Initialize Next.js 14+ with App Router, TypeScript, Tailwind CSS
2. Configure ESLint, Prettier, TypeScript strict mode
3. Install and configure Shadcn UI (button, card, badge components)
4. Set up project structure (directories as documented above)
5. Configure next.config.ts for image optimization
6. Create global CSS with Tailwind imports and CSS variables

### Phase 2: Design System Foundation

1. Define color palette CSS variables in globals.css
2. Configure Tailwind theme extensions (if needed beyond defaults)
3. Create `cn()` utility function in lib/utils.ts
4. Build base Shadcn UI components (button, card, badge)
5. Create shared components (section-heading, external-link, skill-badge)

### Phase 3: Data Layer

1. Define TypeScript interfaces in types/index.ts
2. Create profile.ts with name, title, tagline, social links
3. Create skills.ts with categorized skills arrays
4. Create projects.ts with 5 featured project objects
5. Add placeholder data (to be replaced with real content)

### Phase 4: Hero Section

1. Build Hero component with two-column responsive layout
2. Implement profile photo with next/image optimization
3. Add heading, title, and tagline with proper semantic HTML
4. Create CTA button group (View Projects, GitHub, LinkedIn, Contact)
5. Implement smooth scroll for View Projects CTA
6. Ensure mobile-first responsive behavior (stack on mobile)

### Phase 5: Skills Section

1. Build Skills component with section heading
2. Create skill category cards (Agentic AI, Full Stack)
3. Implement skill badges with consistent styling
4. Ensure responsive grid layout
5. Test keyboard navigation and screen reader compatibility

### Phase 6: Projects Section

1. Build Projects component with section heading
2. Create ProjectCard component with:
   - Project name (heading)
   - Problem-solution description
   - Tech stack badges
   - GitHub link (always present)
   - Live Demo link (conditional)
3. Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
4. Ensure all links open in new tabs with proper rel attributes

### Phase 7: Contact Section

1. Build minimal Contact section/CTA
2. Implement mailto link with email address
3. Ensure accessibility for email link
4. Optional: Add social links footer

### Phase 8: Layout & SEO

1. Configure root layout.tsx with:
   - Metadata API (title, description, Open Graph, Twitter Card)
   - JSON-LD structured data (Person schema)
   - Viewport and theme-color meta
2. Implement sitemap.ts for dynamic sitemap generation
3. Implement robots.ts for robots.txt
4. Add favicon and OG image to public/
5. Test meta tags with social sharing debuggers

### Phase 9: Accessibility & Performance

1. Audit with axe-core and fix violations
2. Test keyboard navigation throughout
3. Verify focus indicators on all interactive elements
4. Implement prefers-reduced-motion media query
5. Run Lighthouse audit and optimize:
   - Image compression and sizing
   - Font loading strategy
   - Bundle analysis and code splitting
6. Verify < 500KB JS bundle size

### Phase 10: Testing & Quality

1. Write Playwright E2E tests for:
   - Homepage renders all sections
   - CTA links function correctly
   - Mobile responsive behavior
2. Write accessibility tests with axe-core
3. Configure CI workflow (lint, type-check, test, build)
4. Final Lighthouse audit (target: 95+ all categories)

### Phase 11: Deployment

1. Configure Vercel project
2. Set up preview deployments for PRs
3. Configure production domain (if available)
4. Verify production build and performance
5. Set up monitoring (optional: Web Vitals)

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Photo not provided | Use placeholder with correct dimensions; document requirement |
| Project data incomplete | Create data structure with clear TODO markers |
| Performance regression | CI gate with Lighthouse budget; bundle analyzer |
| Accessibility gaps | axe-core in CI; manual screen reader testing |

## Complexity Tracking

> No violations requiring justification. Design follows constitution principles.

## ADR Candidates

The following decisions may warrant formal ADR documentation:

1. **Static data vs CMS**: Chose static TypeScript files over headless CMS for simplicity
2. **System fonts**: Chose system font stack over custom fonts for performance
3. **Shadcn UI**: Chose Shadcn over full component library for bundle size control

📋 Architectural decisions detected. Document reasoning and tradeoffs? Run `/sp.adr <decision-title>` after reviewing.
