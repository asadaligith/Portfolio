# Data Model: Personal Developer Portfolio Website

**Feature**: 001-portfolio-website
**Date**: 2026-01-27
**Status**: Complete

## Overview

All data is stored as static TypeScript objects in the `src/data/` directory. No database or API required. Type definitions are in `src/types/index.ts`.

## Entity Definitions

### Profile

Represents Asad Ali's professional identity.

```typescript
// src/types/index.ts
interface Profile {
  name: string;           // "Asad Ali"
  title: string;          // "Agentic AI Engineer + Full Stack Developer"
  tagline: string;        // "Designing and engineering..."
  email: string;          // Contact email address
  photo: {
    src: string;          // Path to image in public/
    alt: string;          // Descriptive alt text
    width: number;        // Image width in pixels
    height: number;       // Image height in pixels
  };
  socialLinks: SocialLink[];
}

interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;            // Full URL or mailto:
  label: string;          // Accessible label
}
```

**Data File**: `src/data/profile.ts`

```typescript
import type { Profile } from '@/types';

export const profile: Profile = {
  name: "Asad Ali",
  title: "Agentic AI Engineer + Full Stack Developer",
  tagline: "Designing and engineering intelligent, agent-driven systems with modern full-stack architecture",
  email: "asad@example.com", // TODO: Replace with actual email
  photo: {
    src: "/images/profile.webp",
    alt: "Asad Ali - Agentic AI Engineer",
    width: 400,
    height: 400,
  },
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/asadali", // TODO: Replace
      label: "GitHub Profile",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/asadali", // TODO: Replace
      label: "LinkedIn Profile",
    },
  ],
};
```

### SkillCategory & Skill

Represents categorized technical competencies.

```typescript
// src/types/index.ts
interface Skill {
  name: string;           // Display name (e.g., "Next.js")
  icon?: string;          // Optional icon identifier
}

interface SkillCategory {
  id: string;             // Unique identifier (e.g., "agentic-ai")
  name: string;           // Display name (e.g., "Agentic AI Skills")
  description?: string;   // Optional category description
  skills: Skill[];
}
```

**Data File**: `src/data/skills.ts`

```typescript
import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: "agentic-ai",
    name: "Agentic AI Skills",
    skills: [
      { name: "OpenAI Agents SDK" },
      { name: "SpecKitPlus" },
      { name: "Claude Code" },
      { name: "Agentic workflows and AI automation" },
    ],
  },
  {
    id: "full-stack",
    name: "Full Stack Skills",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Python" },
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "Firebase" },
      { name: "MongoDB" },
      { name: "Neon (PostgreSQL)" },
      { name: "Sanity" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Figma" },
      { name: "Render" },
      { name: "Vercel" },
      { name: "Shadcn UI" },
    ],
  },
];
```

### Project

Represents a portfolio project.

```typescript
// src/types/index.ts
interface Project {
  id: string;             // Unique identifier
  name: string;           // Project name
  description: string;    // Problem-solution description
  techStack: string[];    // Technologies used
  githubUrl: string;      // GitHub repository URL (required)
  demoUrl?: string;       // Live demo URL (optional)
  featured: boolean;      // Whether to display on homepage
  order: number;          // Display order (lower = first)
}
```

**Data File**: `src/data/projects.ts`

```typescript
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: "project-1",
    name: "Project One", // TODO: Replace with actual project
    description: "Solved [problem] by building [solution]. Resulted in [outcome].",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/asadali/project-1",
    demoUrl: "https://project-1.vercel.app",
    featured: true,
    order: 1,
  },
  {
    id: "project-2",
    name: "Project Two", // TODO: Replace with actual project
    description: "Solved [problem] by building [solution]. Resulted in [outcome].",
    techStack: ["Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/asadali/project-2",
    featured: true,
    order: 2,
  },
  {
    id: "project-3",
    name: "Project Three", // TODO: Replace with actual project
    description: "Solved [problem] by building [solution]. Resulted in [outcome].",
    techStack: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/asadali/project-3",
    demoUrl: "https://project-3.vercel.app",
    featured: true,
    order: 3,
  },
  {
    id: "project-4",
    name: "Project Four", // TODO: Replace with actual project
    description: "Solved [problem] by building [solution]. Resulted in [outcome].",
    techStack: ["OpenAI Agents SDK", "Python", "Claude Code"],
    githubUrl: "https://github.com/asadali/project-4",
    featured: true,
    order: 4,
  },
  {
    id: "project-5",
    name: "Project Five", // TODO: Replace with actual project
    description: "Solved [problem] by building [solution]. Resulted in [outcome].",
    techStack: ["Next.js", "Sanity", "Vercel"],
    githubUrl: "https://github.com/asadali/project-5",
    demoUrl: "https://project-5.vercel.app",
    featured: true,
    order: 5,
  },
];

// Helper to get featured projects sorted by order
export const getFeaturedProjects = (): Project[] => {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 5); // Ensure max 5 per spec
};
```

### SiteMetadata

Represents site-wide metadata for SEO.

```typescript
// src/types/index.ts
interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle?: string;
}
```

**Data File**: `src/data/site-metadata.ts`

```typescript
import type { SiteMetadata } from '@/types';

export const siteMetadata: SiteMetadata = {
  title: "Asad Ali | Agentic AI Engineer + Full Stack Developer",
  description: "Designing and engineering intelligent, agent-driven systems with modern full-stack architecture. View my projects and skills.",
  siteUrl: "https://asadali.dev", // TODO: Replace with actual domain
  ogImage: "/og-image.png",
  twitterHandle: "@asadali", // TODO: Replace or remove
};
```

## Type Definitions Summary

**File**: `src/types/index.ts`

```typescript
// Profile types
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  label: string;
}

// Skills types
export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
}

// Site metadata types
export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle?: string;
}
```

## Data Validation Rules

| Entity | Field | Validation |
|--------|-------|------------|
| Profile | name | Required, non-empty string |
| Profile | email | Required, valid email format |
| Profile | photo.src | Required, valid path in public/ |
| SocialLink | url | Required, valid URL or mailto: |
| Skill | name | Required, non-empty string |
| SkillCategory | skills | Required, at least 1 skill |
| Project | name | Required, non-empty string |
| Project | description | Required, non-empty string |
| Project | githubUrl | Required, valid GitHub URL |
| Project | techStack | Required, at least 1 item |

## State Transitions

Not applicable. All data is static and read-only at runtime.

## Data File Locations

```text
src/
├── types/
│   └── index.ts           # All TypeScript interfaces
└── data/
    ├── profile.ts         # Profile entity
    ├── skills.ts          # SkillCategory[] with skills
    ├── projects.ts        # Project[] with helper functions
    └── site-metadata.ts   # SiteMetadata for SEO
```
