"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { ExternalLink } from "@/components/shared/external-link";
import { SkillBadge } from "@/components/shared/skill-badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { getFeaturedProjects } from "@/data/projects";
import { Github, ExternalLink as ExternalLinkIcon } from "lucide-react";

export function Projects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section
      id="projects"
      className="py-16 md:py-24"
      aria-label="Featured Projects"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn>
          <SectionHeading className="text-center mb-12">
            Featured Projects
          </SectionHeading>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <SkillBadge
                      key={tech}
                      name={tech}
                      className="text-xs px-2 py-0.5"
                    />
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="min-h-[44px]"
                  >
                    <ExternalLink
                      href={project.githubUrl}
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                      GitHub
                    </ExternalLink>
                  </Button>

                  {project.demoUrl && (
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="min-h-[44px]"
                    >
                      <ExternalLink
                        href={project.demoUrl}
                        aria-label={`View live demo of ${project.name}`}
                      >
                        <ExternalLinkIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                        Live Demo
                      </ExternalLink>
                    </Button>
                  )}
                </div>
              </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
