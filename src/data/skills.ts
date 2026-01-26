import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "agentic-ai",
    name: "Agentic AI",
    description: "Building intelligent, autonomous AI systems",
    skills: [
      { name: "OpenAI API" },
      { name: "Anthropic Claude" },
      { name: "RAG Systems" },
      { name: "Vector Databases" },
      { name: "Prompt Engineering" },
      { name: "AI Agent Orchestration" },
    ],
  },
  {
    id: "full-stack",
    name: "Full Stack Development",
    description: "Modern web application development",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Vercel" },
      { name: "Git" },
      { name: "REST APIs" },
      { name: "Tailwind CSS" },
    ],
  },
];
