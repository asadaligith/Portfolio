# Tasks: Personal Developer Portfolio Website

**Input**: Design documents from `/specs/001-portfolio-website/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: Not explicitly requested in specification. E2E and accessibility tests included in Polish phase for quality assurance.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Next.js App Router (single project)
- **Source**: `src/` at repository root
- **Tests**: `tests/` at repository root
- **Config**: Root level configuration files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 14+ project with TypeScript, Tailwind CSS, ESLint, App Router, src directory via `pnpm create next-app@latest`
- [ ] T002 Configure TypeScript strict mode in tsconfig.json (strict: true, noUncheckedIndexedAccess: true)
- [ ] T003 [P] Create Prettier configuration in .prettierrc with tailwindcss plugin
- [ ] T004 [P] Initialize Shadcn UI via `pnpm dlx shadcn-ui@latest init` with slate base color
- [ ] T005 Add Shadcn UI components: button, card, badge via `pnpm dlx shadcn-ui@latest add button card badge`
- [ ] T006 Create project directory structure: src/components/ui/, src/components/sections/, src/components/shared/, src/data/, src/types/, src/lib/
- [ ] T007 [P] Create public directory structure: public/images/, add placeholder favicon.ico
- [ ] T008 Configure next.config.ts with image optimization (formats: avif, webp)

**Checkpoint**: Project scaffolding complete, ready for foundational components

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Define all TypeScript interfaces in src/types/index.ts (Profile, SocialLink, Skill, SkillCategory, Project, SiteMetadata)
- [ ] T010 [P] Create cn() utility function in src/lib/utils.ts using clsx and tailwind-merge
- [ ] T011 [P] Create site constants in src/lib/constants.ts (navigation anchors, breakpoints)
- [ ] T012 Configure globals.css with Tailwind directives, CSS variables for colors, smooth scroll, and prefers-reduced-motion support in src/app/globals.css
- [ ] T013 [P] Create SectionHeading shared component in src/components/shared/section-heading.tsx with semantic h2
- [ ] T014 [P] Create ExternalLink shared component in src/components/shared/external-link.tsx with rel="noopener noreferrer" and new tab
- [ ] T015 [P] Create SkillBadge shared component in src/components/shared/skill-badge.tsx using Shadcn badge

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - First Impression Landing (Priority: P1) 🎯 MVP

**Goal**: Visitor immediately understands who Asad Ali is, sees professional photo, reads value proposition, and can access CTAs

**Independent Test**: Load homepage and verify hero section displays photo, heading "Hi, I'm Asad Ali", title, tagline, and 4 CTA buttons

### Data Layer for US1

- [ ] T016 [P] [US1] Create profile data file with name, title, tagline, email, photo config, and social links in src/data/profile.ts
- [ ] T017 [P] [US1] Create site metadata file with SEO data in src/data/site-metadata.ts

### Implementation for US1

- [ ] T018 [US1] Build Hero section component with two-column responsive layout (photo left, content right) in src/components/sections/hero.tsx
- [ ] T019 [US1] Implement profile photo using next/image with blur placeholder and priority loading in src/components/sections/hero.tsx
- [ ] T020 [US1] Add heading (h1), title, and tagline with proper semantic HTML hierarchy in src/components/sections/hero.tsx
- [ ] T021 [US1] Create CTA button group with View Projects (anchor link), GitHub, LinkedIn, Contact buttons in src/components/sections/hero.tsx
- [ ] T022 [US1] Implement smooth scroll behavior for View Projects CTA to #projects anchor in src/components/sections/hero.tsx
- [ ] T023 [US1] Add mobile-first responsive styles: stack layout on mobile (<768px), two-column on desktop in src/components/sections/hero.tsx
- [ ] T024 [US1] Compose Hero section in homepage with section id="hero" in src/app/page.tsx

**Checkpoint**: Hero section fully functional - visitor sees professional identity immediately

---

## Phase 4: User Story 5 - Mobile-First Experience (Priority: P1) 🎯 MVP

**Goal**: All content fully accessible on mobile devices without horizontal scrolling

**Independent Test**: Load site at 320px, 375px, 768px viewports - no horizontal scroll, all content visible and tappable

### Implementation for US5

- [ ] T025 [US5] Verify Hero responsive breakpoints work at 320px, 375px, 414px, 768px, 1024px viewports in src/components/sections/hero.tsx
- [ ] T026 [US5] Ensure all CTA buttons have minimum 44x44px touch targets in src/components/sections/hero.tsx
- [ ] T027 [US5] Add container max-width constraints (max-w-6xl mx-auto px-4 md:px-6) to prevent overflow in src/app/page.tsx
- [ ] T028 [US5] Test and fix any horizontal overflow issues across all viewport sizes in src/app/globals.css

**Checkpoint**: Mobile experience verified - site works on all device sizes

---

## Phase 5: User Story 2 - Skills Assessment (Priority: P2)

**Goal**: Visitor sees skills organized into Agentic AI and Full Stack categories with clear visual grouping

**Independent Test**: Navigate to Skills section and verify two categories display with all listed skills

### Data Layer for US2

- [ ] T029 [P] [US2] Create skills data file with Agentic AI (4 skills) and Full Stack (20 skills) categories in src/data/skills.ts

### Implementation for US2

- [ ] T030 [US2] Build Skills section component with section heading in src/components/sections/skills.tsx
- [ ] T031 [US2] Create skill category card component displaying category name and skill badges in src/components/sections/skills.tsx
- [ ] T032 [US2] Implement responsive grid for skill categories (stack on mobile, side-by-side on desktop) in src/components/sections/skills.tsx
- [ ] T033 [US2] Render all skills using SkillBadge component with consistent styling in src/components/sections/skills.tsx
- [ ] T034 [US2] Add section id="skills" anchor and compose Skills section in homepage in src/app/page.tsx

**Checkpoint**: Skills section complete - visitor can evaluate technical capabilities

---

## Phase 6: User Story 3 - Project Evaluation (Priority: P2)

**Goal**: Visitor sees 5 featured projects with name, description, tech stack, and links

**Independent Test**: Navigate to Projects section and verify exactly 5 projects display with all required information

### Data Layer for US3

- [ ] T035 [P] [US3] Create projects data file with 5 featured projects (placeholder data with TODO markers) in src/data/projects.ts
- [ ] T036 [P] [US3] Add getFeaturedProjects() helper function to filter and sort projects in src/data/projects.ts

### Implementation for US3

- [ ] T037 [US3] Build Projects section component with section heading in src/components/sections/projects.tsx
- [ ] T038 [US3] Create ProjectCard component with project name (h3), description, tech stack badges in src/components/sections/projects.tsx
- [ ] T039 [US3] Add GitHub link (always visible) and conditional Live Demo link to ProjectCard in src/components/sections/projects.tsx
- [ ] T040 [US3] Ensure project links open in new tabs with rel="noopener noreferrer" in src/components/sections/projects.tsx
- [ ] T041 [US3] Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop) in src/components/sections/projects.tsx
- [ ] T042 [US3] Add section id="projects" anchor and compose Projects section in homepage in src/app/page.tsx

**Checkpoint**: Projects section complete - visitor can evaluate work samples

---

## Phase 7: User Story 4 - Contact Initiation (Priority: P3)

**Goal**: Visitor can easily contact Asad via email

**Independent Test**: Click Contact CTA and verify mailto link opens email client

### Implementation for US4

- [ ] T043 [US4] Build Contact section component with heading and call-to-action text in src/components/sections/contact.tsx
- [ ] T044 [US4] Implement mailto link with email from profile data in src/components/sections/contact.tsx
- [ ] T045 [US4] Add accessible button styling to email link with proper focus indicators in src/components/sections/contact.tsx
- [ ] T046 [US4] Add section id="contact" anchor and compose Contact section in homepage in src/app/page.tsx
- [ ] T047 [US4] Wire Contact CTA in Hero to scroll to contact section in src/components/sections/hero.tsx

**Checkpoint**: Contact functionality complete - visitor can initiate outreach

---

## Phase 8: Layout & SEO

**Purpose**: Configure site-wide layout, metadata, and SEO

- [ ] T048 Configure root layout.tsx with metadata API (title, description, viewport, themeColor) in src/app/layout.tsx
- [ ] T049 Add Open Graph meta tags (og:title, og:description, og:image, og:type) in src/app/layout.tsx
- [ ] T050 Add Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image) in src/app/layout.tsx
- [ ] T051 [P] Implement JSON-LD structured data for Person schema in src/app/layout.tsx
- [ ] T052 [P] Create sitemap.ts route handler for dynamic sitemap generation in src/app/sitemap.ts
- [ ] T053 [P] Create robots.ts route handler for robots.txt in src/app/robots.ts
- [ ] T054 [P] Add placeholder og-image.png (1200x630px) to public/og-image.png
- [ ] T055 [P] Add placeholder profile photo (400x400px WebP) to public/images/profile.webp

**Checkpoint**: SEO configuration complete - site is search engine friendly

---

## Phase 9: Accessibility & Performance

**Purpose**: Ensure WCAG 2.2 AA compliance and Lighthouse 95+ scores

- [ ] T056 Verify semantic HTML structure: single h1, proper heading hierarchy (h2 for sections, h3 for cards) across all components
- [ ] T057 Add descriptive alt text to profile image and any other images in src/components/sections/hero.tsx
- [ ] T058 Verify color contrast meets WCAG AA (4.5:1 text, 3:1 large text) in src/app/globals.css
- [ ] T059 Add visible focus indicators to all interactive elements (buttons, links) in src/app/globals.css
- [ ] T060 Implement prefers-reduced-motion media query to disable animations when requested in src/app/globals.css
- [ ] T061 Verify keyboard navigation works for all interactive elements across all sections
- [ ] T062 [P] Run Lighthouse audit and document baseline scores
- [ ] T063 Optimize images: ensure all images use next/image with proper sizing in all components
- [ ] T064 [P] Analyze bundle size with next build and verify < 500KB JS

**Checkpoint**: Accessibility and performance targets met

---

## Phase 10: Testing & Quality

**Purpose**: E2E tests and final quality assurance

- [ ] T065 [P] Install Playwright and configure playwright.config.ts with desktop and mobile viewports
- [ ] T066 [P] Install axe-core Playwright integration for accessibility testing
- [ ] T067 Write E2E test: homepage loads all sections (hero, skills, projects, contact) in tests/e2e/homepage.spec.ts
- [ ] T068 Write E2E test: View Projects CTA scrolls to projects section in tests/e2e/homepage.spec.ts
- [ ] T069 Write E2E test: external links (GitHub, LinkedIn) have correct attributes in tests/e2e/homepage.spec.ts
- [ ] T070 Write E2E test: mobile responsive layout at 375px viewport in tests/e2e/homepage.spec.ts
- [ ] T071 Write accessibility test: zero axe-core violations on homepage in tests/e2e/accessibility.spec.ts
- [ ] T072 Run all tests and fix any failures
- [ ] T073 Final Lighthouse audit: verify 90+ scores in Performance, Accessibility, Best Practices, SEO

**Checkpoint**: All tests pass, quality gates met

---

## Phase 11: Deployment

**Purpose**: Deploy to Vercel and verify production

- [ ] T074 Create Vercel project and connect to Git repository
- [ ] T075 Configure Vercel build settings (framework: Next.js, build command: pnpm build)
- [ ] T076 Deploy to Vercel and verify production build succeeds
- [ ] T077 Test production site: all sections render, links work, mobile responsive
- [ ] T078 Run Lighthouse on production URL and verify scores meet targets
- [ ] T079 [P] Configure custom domain (if available)
- [ ] T080 Document deployment URL and any remaining TODOs for content replacement

**Checkpoint**: Site deployed and production-ready

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 - BLOCKS all user stories
- **Phase 3 (US1 Hero)**: Depends on Phase 2
- **Phase 4 (US5 Mobile)**: Depends on Phase 3 (requires Hero to test)
- **Phase 5 (US2 Skills)**: Depends on Phase 2 (can parallel with US1)
- **Phase 6 (US3 Projects)**: Depends on Phase 2 (can parallel with US1, US2)
- **Phase 7 (US4 Contact)**: Depends on Phase 2 (can parallel with US1, US2, US3)
- **Phase 8 (SEO)**: Depends on all user stories (US1-US4)
- **Phase 9 (A11y/Perf)**: Depends on Phase 8
- **Phase 10 (Testing)**: Depends on Phase 9
- **Phase 11 (Deploy)**: Depends on Phase 10

### User Story Dependencies

- **US1 (Hero)**: No dependencies on other stories - MVP core
- **US5 (Mobile)**: Validates US1 mobile behavior - extends MVP
- **US2 (Skills)**: Independent - can parallel with US1
- **US3 (Projects)**: Independent - can parallel with US1, US2
- **US4 (Contact)**: Independent but integrates with US1 Hero CTAs

### Within Each User Story

1. Data files first (T016-T017, T029, T035-T036)
2. Component implementation second
3. Homepage composition last

### Parallel Opportunities

**Phase 1** (can run together):
- T003, T004, T007 (all independent config files)

**Phase 2** (can run together):
- T010, T011 (utility files)
- T013, T014, T015 (shared components)

**User Stories** (after Phase 2):
- US1, US2, US3, US4 can ALL start in parallel if desired
- Within each story, data files can parallel with each other

**Phase 8** (can run together):
- T051, T052, T053, T054, T055 (all independent files)

---

## Parallel Example: Starting User Stories

```bash
# After Phase 2 completes, launch data layer for all stories:
Task: T016 [US1] Create profile data in src/data/profile.ts
Task: T029 [US2] Create skills data in src/data/skills.ts
Task: T035 [US3] Create projects data in src/data/projects.ts

# Then implement sections in parallel:
Task: T018 [US1] Build Hero section in src/components/sections/hero.tsx
Task: T030 [US2] Build Skills section in src/components/sections/skills.tsx
Task: T037 [US3] Build Projects section in src/components/sections/projects.tsx
Task: T043 [US4] Build Contact section in src/components/sections/contact.tsx
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 5)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Hero)
4. Complete Phase 4: User Story 5 (Mobile verification)
5. **STOP and VALIDATE**: Hero works on all devices
6. Can deploy MVP at this point

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Hero) + US5 (Mobile) → Test → Deploy (MVP!)
3. Add US2 (Skills) → Test → Deploy
4. Add US3 (Projects) → Test → Deploy
5. Add US4 (Contact) → Test → Deploy
6. Add SEO + A11y + Tests → Final Deploy

### Solo Developer Strategy

Execute phases sequentially:
1. Phase 1-2: ~1 session
2. Phase 3-4: ~1 session (MVP complete)
3. Phase 5-7: ~1-2 sessions
4. Phase 8-11: ~1-2 sessions

Total: ~5-6 focused sessions

---

## Task Summary

| Phase | Tasks | Parallel |
|-------|-------|----------|
| 1. Setup | T001-T008 (8) | 3 |
| 2. Foundational | T009-T015 (7) | 5 |
| 3. US1 Hero | T016-T024 (9) | 2 |
| 4. US5 Mobile | T025-T028 (4) | 0 |
| 5. US2 Skills | T029-T034 (6) | 1 |
| 6. US3 Projects | T035-T042 (8) | 2 |
| 7. US4 Contact | T043-T047 (5) | 0 |
| 8. SEO | T048-T055 (8) | 5 |
| 9. A11y/Perf | T056-T064 (9) | 2 |
| 10. Testing | T065-T073 (9) | 2 |
| 11. Deploy | T074-T080 (7) | 1 |
| **Total** | **80 tasks** | **23 parallel** |

---

## Notes

- [P] tasks = different files, no dependencies - can run in parallel
- [Story] label maps task to specific user story for traceability
- MVP = Phase 1-4 (Setup + Foundational + Hero + Mobile) = 28 tasks
- Placeholder content marked with TODO for real data replacement
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
