import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ai-agent-platform",
    name: "AI Agent Platform", // TODO: Replace with actual project name
    description:
      "A comprehensive platform for building, deploying, and managing autonomous AI agents. Features multi-agent orchestration, tool integration, and real-time monitoring.",
    techStack: ["LangChain", "Python", "FastAPI", "React", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/asadaligith/ai-agent-platform", // TODO: Replace with actual URL
    demoUrl: "https://ai-agents.demo.com", // TODO: Replace with actual URL
    featured: true,
    order: 1,
  },
  {
    id: "rag-knowledge-base",
    name: "RAG Knowledge Base", // TODO: Replace with actual project name
    description:
      "An intelligent document retrieval system using Retrieval-Augmented Generation. Supports multiple file formats with semantic search and context-aware responses.",
    techStack: ["LangChain", "OpenAI", "Pinecone", "Next.js", "TypeScript"],
    githubUrl: "https://github.com/asadaligith/rag-knowledge-base", // TODO: Replace with actual URL
    demoUrl: "https://rag-kb.demo.com", // TODO: Replace with actual URL
    featured: true,
    order: 2,
  },
  {
    id: "fullstack-saas-starter",
    name: "Full Stack SaaS Starter", // TODO: Replace with actual project name
    description:
      "A production-ready SaaS boilerplate with authentication, billing, multi-tenancy, and a complete CI/CD pipeline. Built with modern best practices.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/asadaligith/saas-starter", // TODO: Replace with actual URL
    featured: true,
    order: 3,
  },
  {
    id: "realtime-collab-editor",
    name: "Real-time Collaborative Editor", // TODO: Replace with actual project name
    description:
      "A collaborative document editor with real-time synchronization, presence indicators, and version history. Supports rich text formatting and comments.",
    techStack: ["React", "TypeScript", "WebSockets", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/asadaligith/collab-editor", // TODO: Replace with actual URL
    demoUrl: "https://collab-editor.demo.com", // TODO: Replace with actual URL
    featured: true,
    order: 4,
  },
  {
    id: "devops-automation-toolkit",
    name: "DevOps Automation Toolkit", // TODO: Replace with actual project name
    description:
      "A collection of scripts and tools for automating cloud infrastructure, CI/CD pipelines, and deployment workflows across multiple cloud providers.",
    techStack: ["Python", "Terraform", "Docker", "AWS", "GitHub Actions"],
    githubUrl: "https://github.com/asadaligith/devops-toolkit", // TODO: Replace with actual URL
    featured: true,
    order: 5,
  },
];

/**
 * Get featured projects sorted by order
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}
