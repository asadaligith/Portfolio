"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          {/* Content - Left on desktop, bottom on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center md:text-left order-2 md:order-1"
          >
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m{" "}
              <span className="text-primary">{profile.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 sm:mt-4 text-lg font-semibold text-muted-foreground sm:text-xl md:text-2xl"
            >
              {profile.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
            >
              {profile.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 justify-center md:justify-start"
            >
              {/* View Projects - Primary CTA */}
              <Button asChild size="default" className="min-h-[44px] sm:h-11 sm:px-8">
                <a href="#projects" onClick={handleScrollToProjects}>
                  View Projects
                </a>
              </Button>

              {/* GitHub */}
              {githubLink && (
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="min-h-[44px] sm:h-11 sm:px-8"
                >
                  <ExternalLink href={githubLink.url} aria-label={githubLink.label}>
                    <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    GitHub
                  </ExternalLink>
                </Button>
              )}

              {/* LinkedIn */}
              {linkedinLink && (
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="min-h-[44px] sm:h-11 sm:px-8"
                >
                  <ExternalLink href={linkedinLink.url} aria-label={linkedinLink.label}>
                    <Linkedin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    LinkedIn
                  </ExternalLink>
                </Button>
              )}

              {/* Contact */}
              <Button
                asChild
                variant="secondary"
                size="default"
                className="min-h-[44px] sm:h-11 sm:px-8"
              >
                <a href={`mailto:${profile.email}`} aria-label="Send email">
                  <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  Contact
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Photo - Right on desktop, top on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center md:justify-end order-1 md:order-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
            >
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={profile.photo.width}
                height={profile.photo.height}
                priority
                className="rounded-full object-cover shadow-2xl ring-4 ring-primary/20 w-full h-full transition-shadow duration-300 hover:shadow-primary/25"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
