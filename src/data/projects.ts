import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ai-robotics-book",
    name: "AI Humanoid Robotics Book",
    description:
      "An interactive digital book exploring AI and humanoid robotics concepts with an integrated AI chatbot. Features comprehensive documentation on robotics principles, AI integration, and future technologies.",
    techStack: ["Docusaurus", "Python", "TypeScript", "JavaScript", "CSS"],
    githubUrl: "https://github.com/asadaligith/AI-Humanoid-Robotics-Book",
    demoUrl: "https://asadaligith.github.io/AI-Humanoid-Robotics-Book/",
    featured: true,
    order: 1,
  },
  {
    id: "todo-web-application",
    name: "Full Stack Todo Web Application",
    description:
      "A complete full-stack todo application with user authentication, task management, and persistent storage. Built with modern web technologies for seamless task tracking.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/asadaligith/Todo-Web-Application",
    demoUrl: "https://todo-web-application-two.vercel.app/",
    featured: true,
    order: 2,
  },
  {
    id: "ai-todo-chatbot",
    name: "Full Stack AI Todo Chatbot",
    description:
      "An intelligent AI-powered todo chatbot that helps manage tasks through natural language conversations. Combines task management with conversational AI for enhanced productivity.",
    techStack: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/asadaligith/AI-Todo-Chatbot",
    demoUrl: "https://ai-todo-chatbot.vercel.app/",
    featured: true,
    order: 3,
  },
  {
    id: "ecommerce-marketplace",
    name: "E-Commerce Marketplace",
    description:
      "A full-featured e-commerce marketplace built during a hackathon. Includes product listings, shopping cart, checkout flow, and responsive design for all devices.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/asadaligith/Marketplace_Hackathon",
    demoUrl: "https://marketplace-hackathon-peach.vercel.app/",
    featured: true,
    order: 4,
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
