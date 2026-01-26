"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/shared/external-link";
import { profile } from "@/data/profile";
import { Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const githubLink = profile.socialLinks.find(
    (link) => link.platform === "github"
  );
  const linkedinLink = profile.socialLinks.find(
    (link) => link.platform === "linkedin"
  );

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-20"
      aria-label="Introduction"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          {/* Profile Photo - Left on desktop, top on mobile */}
          <div className="flex justify-center md:justify-start order-1 md:order-1">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={profile.photo.width}
                height={profile.photo.height}
                priority
                className="rounded-full object-cover shadow-lg ring-4 ring-primary/10"
              />
            </div>
          </div>

          {/* Content - Right on desktop, bottom on mobile */}
          <div className="text-center md:text-left order-2 md:order-2">
            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="text-primary">{profile.name}</span>
            </h1>

            {/* Title */}
            <p className="mt-4 text-xl font-semibold text-muted-foreground md:text-2xl">
              {profile.title}
            </p>

            {/* Tagline */}
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              {/* View Projects - Primary CTA */}
              <Button asChild size="lg" className="min-h-[44px] min-w-[44px]">
                <a href="#projects" onClick={handleScrollToProjects}>
                  View Projects
                </a>
              </Button>

              {/* GitHub */}
              {githubLink && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] min-w-[44px]"
                >
                  <ExternalLink href={githubLink.url} aria-label={githubLink.label}>
                    <Github className="mr-2 h-5 w-5" aria-hidden="true" />
                    GitHub
                  </ExternalLink>
                </Button>
              )}

              {/* LinkedIn */}
              {linkedinLink && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] min-w-[44px]"
                >
                  <ExternalLink href={linkedinLink.url} aria-label={linkedinLink.label}>
                    <Linkedin className="mr-2 h-5 w-5" aria-hidden="true" />
                    LinkedIn
                  </ExternalLink>
                </Button>
              )}

              {/* Contact */}
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="min-h-[44px] min-w-[44px]"
              >
                <a href={`mailto:${profile.email}`} aria-label="Send email">
                  <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
