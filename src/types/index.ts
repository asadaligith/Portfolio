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
  platform: "github" | "linkedin" | "twitter" | "email";
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
