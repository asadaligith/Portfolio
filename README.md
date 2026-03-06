# Asad Ali - Portfolio Website

A modern, production-ready portfolio website built with Next.js 14, featuring dark mode, smooth animations, and full accessibility compliance.

## Live Demo

**Website:** [Coming Soon - Deploy to Vercel]

## Features

- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Dark/Light Mode** - System preference detection with manual toggle
- **Smooth Animations** - Framer Motion entrance and hover effects
- **SEO Optimized** - JSON-LD structured data, OpenGraph, sitemap, robots.txt
- **Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- **Type-Safe** - Full TypeScript coverage with strict mode
- **E2E Testing** - Playwright tests with accessibility checks

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14.2 (App Router) |
| **Language** | TypeScript 5.5 |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Animations** | Framer Motion 12 |
| **Theming** | next-themes |
| **Icons** | Lucide React |
| **Testing** | Playwright + Axe-Core |
| **Deployment** | Vercel |

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (ThemeProvider, JSON-LD, metadata)
│   ├── page.tsx             # Homepage composition
│   ├── globals.css          # Global styles & CSS variables
│   ├── robots.ts            # SEO robots.txt generation
│   └── sitemap.ts           # XML sitemap generation
│
├── components/
│   ├── sections/            # Page sections
│   │   ├── header.tsx       # Sticky navigation with mobile menu
│   │   ├── hero.tsx         # Introduction with photo & CTAs
│   │   ├── skills.tsx       # Technical expertise grid
│   │   ├── projects.tsx     # Featured projects showcase
│   │   ├── contact.tsx      # Contact information & links
│   │   └── footer.tsx       # Copyright & credits
│   │
│   ├── shared/              # Reusable components
│   │   ├── motion.tsx       # Animation wrappers (FadeIn, Stagger)
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx # Dark/light mode switch
│   │   ├── section-heading.tsx
│   │   ├── external-link.tsx
│   │   └── skill-badge.tsx
│   │
│   └── ui/                  # Base UI primitives
│       ├── button.tsx       # CVA-based button variants
│       ├── card.tsx         # Card components
│       └── badge.tsx        # Badge component
│
├── data/                    # Centralized data layer
│   ├── profile.ts           # Personal info & social links
│   ├── projects.ts          # Project listings
│   ├── skills.ts            # Skill categories
│   └── site-metadata.ts     # SEO configuration
│
├── lib/
│   ├── constants.ts         # Navigation links
│   └── utils.ts             # cn() utility for class merging
│
└── types/
    └── index.ts             # TypeScript interfaces

tests/
└── e2e/
    ├── homepage.spec.ts     # E2E tests
    └── accessibility.spec.ts # WCAG compliance tests

public/
└── images/
    └── MyPic.jpeg           # Profile photo
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/asadaligith/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run tests with Playwright UI |

## Configuration

### Customizing Content

All content is centralized in the `src/data/` directory for easy customization:

#### Profile Information (`src/data/profile.ts`)

```typescript
export const profile: Profile = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your professional tagline",
  email: "your@email.com",
  photo: {
    src: "/images/your-photo.jpg",
    alt: "Your Name - Your Title",
    width: 400,
    height: 400,
  },
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/yourusername",
      label: "GitHub Profile",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/yourusername",
      label: "LinkedIn Profile",
    },
  ],
};
```

#### Projects (`src/data/projects.ts`)

```typescript
export const projects: Project[] = [
  {
    id: "project-slug",
    name: "Project Name",
    description: "Project description...",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/...",
    demoUrl: "https://demo.example.com",
    featured: true,
    order: 1,
  },
];
```

#### Skills (`src/data/skills.ts`)

```typescript
export const skillCategories: SkillCategory[] = [
  {
    id: "category-id",
    name: "Category Name",
    description: "Category description",
    skills: [
      { name: "Skill 1" },
      { name: "Skill 2" },
    ],
  },
];
```

#### Site Metadata (`src/data/site-metadata.ts`)

```typescript
export const siteMetadata: SiteMetadata = {
  title: "Your Name | Your Title",
  description: "Your portfolio description for SEO",
  siteUrl: "https://yourdomain.com",
  ogImage: "/og-image.png",
  twitterHandle: "@yourhandle",
};
```

## Components Documentation

### Animation Components (`src/components/shared/motion.tsx`)

#### FadeIn
Scroll-triggered fade-in animation with directional entrance.

```tsx
<FadeIn delay={0.2} direction="up">
  <p>This content fades in from below</p>
</FadeIn>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | number | 0 | Animation delay in seconds |
| `direction` | "up" \| "down" \| "left" \| "right" | "up" | Entrance direction |
| `className` | string | - | Additional CSS classes |

#### StaggerContainer & StaggerItem
Container for staggered child animations.

```tsx
<StaggerContainer className="grid gap-4">
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
  <StaggerItem>Item 3</StaggerItem>
</StaggerContainer>
```

#### ScaleOnHover
Subtle scale effect on hover with tap feedback.

```tsx
<ScaleOnHover scale={1.05}>
  <Card>Hover me</Card>
</ScaleOnHover>
```

### UI Components

#### Button (`src/components/ui/button.tsx`)

```tsx
// Variants: default, secondary, outline, ghost, link, destructive
// Sizes: default, sm, lg, icon

<Button variant="outline" size="lg">
  Click me
</Button>

// As child (polymorphic)
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

#### Card (`src/components/ui/card.tsx`)

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

## Theming

### Dark Mode

The portfolio uses `next-themes` for dark mode support with CSS variables.

#### How It Works

1. **ThemeProvider** wraps the app in `layout.tsx`
2. **CSS Variables** define colors in `globals.css` for both modes
3. **ThemeToggle** allows manual switching
4. **System preference** is respected by default

#### Theme CSS Variables (`globals.css`)

```css
:root {
  --background: 210 40% 98%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... */
}
```

#### Using Theme Colors

```tsx
// In Tailwind classes
<div className="bg-background text-foreground">
  <span className="text-primary">Themed text</span>
</div>
```

## SEO

### JSON-LD Structured Data

The portfolio includes Person schema markup in `layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Asad Ali",
  "jobTitle": "Agentic AI Engineer + Full Stack Developer",
  "url": "https://asadali.dev",
  "sameAs": ["https://github.com/asadaligith", "..."]
}
```

### Auto-Generated Files

- **`/sitemap.xml`** - Generated from `src/app/sitemap.ts`
- **`/robots.txt`** - Generated from `src/app/robots.ts`

### OpenGraph & Twitter Cards

Configured in `layout.tsx` metadata for social media previews.

## Testing

### Running Tests

```bash
# Install Playwright browsers (first time)
npx playwright install

# Run all tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/homepage.spec.ts
```

### Test Coverage

#### E2E Tests (`homepage.spec.ts`)
- All sections load correctly
- "View Projects" CTA scrolls to projects
- External links have security attributes
- Mobile responsive (no horizontal overflow)
- Touch targets meet minimum size (44px)

#### Accessibility Tests (`accessibility.spec.ts`)
- WCAG 2.1 AA compliance (Axe-Core)
- Proper heading hierarchy (single h1)
- Keyboard navigation (Tab through 10+ elements)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys

Or use CLI:

```bash
npm i -g vercel
vercel --prod
```

### Environment Variables

For production, update `src/data/site-metadata.ts`:

```typescript
siteUrl: "https://your-actual-domain.com",
ogImage: "/og-image.png",  // Create 1200x630 image
```

## Type Definitions

### Core Types (`src/types/index.ts`)

```typescript
interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  photo: { src: string; alt: string; width: number; height: number };
  socialLinks: SocialLink[];
}

interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email";
  url: string;
  label: string;
}

interface Skill {
  name: string;
  icon?: string;
}

interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
}

interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle?: string;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Lighthouse Score:** 95+ across all metrics
- **Static Generation:** All pages pre-rendered at build time
- **Image Optimization:** Next.js automatic AVIF/WebP conversion
- **Font Optimization:** System font stack (no external fonts)

## License

MIT License - Feel free to use this as a template for your own portfolio.

## Author

**Asad Ali**
- GitHub: [@asadaligith](https://github.com/asadaligith)
- LinkedIn: [Asad Ali](https://www.linkedin.com/in/asad-ali-1a3070268)
- Email: asad2747982@gmail.com
