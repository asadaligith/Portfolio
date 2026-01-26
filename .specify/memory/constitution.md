<!--
Sync Impact Report
==================
Version change: 0.0.0 → 1.0.0 (MAJOR - initial ratification)
Modified principles: N/A (initial version)
Added sections:
  - Core Principles (6 principles)
  - Technology Standards
  - Quality Gates
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (compatible)
  - .specify/templates/spec-template.md ✅ (compatible)
  - .specify/templates/tasks-template.md ✅ (compatible)
Follow-up TODOs: None
-->

# Asad Ali Portfolio Constitution

## Core Principles

### I. Professional Clarity First

The portfolio MUST communicate three things with absolute clarity:
- **Who**: Asad Ali — Agentic AI Engineer + Full Stack Developer
- **What**: Problems solved through AI-driven engineering and modern full-stack systems
- **Why**: Unique value proposition in 2026's AI-centric technology landscape

All design and content decisions MUST serve these communication goals. If an element does not directly support clarity, credibility, or technical depth, it MUST be removed.

### II. Performance as a Feature

The portfolio MUST demonstrate technical excellence through its own implementation:
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Lighthouse scores: Performance ≥ 95, Accessibility ≥ 100, Best Practices ≥ 95, SEO ≥ 100
- Total page weight < 500KB (excluding images), images optimized via Next.js Image
- No render-blocking resources; critical CSS inlined
- Server-side rendering (SSR) or static generation (SSG) for all public pages

Performance metrics are not suggestions — they are acceptance criteria.

### III. Accessibility Without Compromise

The portfolio MUST be fully accessible to demonstrate professional standards:
- WCAG 2.2 Level AA compliance REQUIRED; Level AAA where practical
- Semantic HTML throughout — no div soup
- Keyboard navigation for all interactive elements
- Screen reader tested (NVDA/VoiceOver)
- Color contrast ratios MUST meet or exceed 4.5:1 for normal text, 3:1 for large text
- Focus indicators visible and clear
- Reduced motion support via `prefers-reduced-motion`

Accessibility failures are blocking defects.

### IV. Minimal Visual Design

The visual design MUST prioritize clarity over aesthetics:
- Clean, minimal, professional — no unnecessary animations or visual noise
- Typography: Maximum 2 font families; system fonts preferred for performance
- Color palette: Limited to 3-4 primary colors plus semantic colors (success, error, etc.)
- Whitespace: Generous margins and padding for readability
- Animations: Only micro-interactions that serve UX (hover states, page transitions)
- No parallax, no scroll hijacking, no autoplay media

If a visual element requires justification beyond "it looks nice," it MUST be justified in terms of user comprehension or trust-building.

### V. Content for Technical Audiences

All content MUST be written for three primary audiences:
1. **Recruiters**: Clear career narrative, searchable skills, verifiable credentials
2. **Startup Founders**: Problem-solving focus, project outcomes, collaboration style
3. **Technical Teams**: Code quality signals, architecture decisions, depth indicators

Content guidelines:
- Lead with outcomes, not technologies
- Quantify impact where possible (performance gains, user metrics, business results)
- Technical depth available but not forced — progressive disclosure pattern
- No buzzword bingo; specific, verifiable claims only
- Projects MUST include: problem, approach, outcome, and technologies used

### VI. Production-Ready Engineering

The codebase MUST reflect production standards:
- **Stack**: Next.js 14+ (App Router), Tailwind CSS, TypeScript
- **Structure**: Feature-based organization; co-located components, tests, and styles
- **Testing**: Playwright for E2E; Jest/Vitest for unit; accessibility tests in CI
- **SEO**: Open Graph meta, JSON-LD structured data, sitemap.xml, robots.txt
- **Deployment**: Edge-ready; Vercel or equivalent with preview deployments
- **Security**: CSP headers, no exposed secrets, dependency audit in CI
- **Code Quality**: ESLint + Prettier enforced; no `any` types; strict TypeScript

Code MUST be maintainable by a future developer who has never seen this project.

## Technology Standards

**Required Stack**:
- Runtime: Node.js 20 LTS
- Framework: Next.js 14+ with App Router
- Styling: Tailwind CSS 3.4+
- Language: TypeScript 5.x (strict mode)
- Package Manager: pnpm (preferred) or npm
- Hosting: Vercel (primary), Cloudflare Pages (alternative)

**Forbidden**:
- Client-side-only rendering for public pages
- CSS-in-JS libraries with runtime cost (styled-components, emotion)
- Heavy animation libraries (GSAP, Framer Motion for non-essential animations)
- Any dependency with known security vulnerabilities
- Inline styles except for dynamic values

**Permitted with Justification**:
- External fonts (must be self-hosted, display: swap)
- Third-party analytics (must be privacy-respecting, e.g., Plausible, Fathom)
- CMS integration (headless only, e.g., Sanity, Contentlayer)

## Quality Gates

All changes MUST pass these gates before merge:

| Gate | Requirement | Enforcement |
|------|-------------|-------------|
| Type Safety | Zero TypeScript errors | CI (tsc --noEmit) |
| Lint | Zero ESLint errors/warnings | CI (eslint .) |
| Format | Prettier-compliant | CI (prettier --check) |
| Tests | All tests pass | CI (test suite) |
| Build | Successful production build | CI (next build) |
| Accessibility | Zero axe-core violations | CI (Playwright + axe) |
| Performance | Lighthouse ≥ 95 | Manual/CI check |
| Bundle Size | < 500KB initial JS | CI (bundle analyzer) |

No exceptions. If a gate fails, the change does not ship.

## Governance

### Amendment Process

1. Propose change via PR to this file
2. Document rationale and impact assessment
3. Update dependent templates if affected
4. Increment version according to:
   - **MAJOR**: Principle removal, redefinition, or backward-incompatible change
   - **MINOR**: New principle, section, or material guidance expansion
   - **PATCH**: Clarification, typo fix, non-semantic refinement
5. Obtain review approval
6. Merge and announce

### Compliance

- All PRs MUST reference this constitution in review
- Deviations MUST be justified in PR description with clear rationale
- Unjustified deviations are blocking defects
- Constitution violations discovered post-merge MUST be remediated within one sprint

### Runtime Guidance

For implementation details and development workflow, see:
- `README.md` — Project setup and contribution guide
- `specs/` — Feature specifications and plans
- `history/adr/` — Architectural Decision Records

**Version**: 1.0.0 | **Ratified**: 2026-01-27 | **Last Amended**: 2026-01-27
