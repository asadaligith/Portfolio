import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Asad Ali",
  title: "Agentic AI Engineer + Full Stack Developer",
  tagline:
    "Designing and engineering intelligent, agent-driven systems with modern full-stack architecture",
  email: "asad@example.com", // TODO: Replace with actual email
  photo: {
    src: "/images/profile-placeholder.svg", // TODO: Replace with actual profile photo (profile.webp)
    alt: "Asad Ali - Agentic AI Engineer and Full Stack Developer",
    width: 400,
    height: 400,
  },
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/asadaligith", // TODO: Replace with actual GitHub
      label: "GitHub Profile",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/asadali", // TODO: Replace with actual LinkedIn
      label: "LinkedIn Profile",
    },
  ],
};
