import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ExternalLink } from "@/components/shared/external-link";
import { profile } from "@/data/profile";
import { Mail, Github, Linkedin } from "lucide-react";

export function Contact() {
  const githubLink = profile.socialLinks.find(
    (link) => link.platform === "github"
  );
  const linkedinLink = profile.socialLinks.find(
    (link) => link.platform === "linkedin"
  );

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-muted/50"
      aria-label="Contact"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading className="text-center mb-4">
          Get In Touch
        </SectionHeading>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          I&apos;m always open to discussing new opportunities, interesting projects,
          or collaborations. Feel free to reach out!
        </p>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Let&apos;s Connect</CardTitle>
            <CardDescription>
              Choose your preferred way to get in touch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email - Primary CTA */}
            <Button
              asChild
              size="lg"
              className="w-full min-h-[44px]"
            >
              <a href={`mailto:${profile.email}`} aria-label="Send email">
                <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                Send an Email
              </a>
            </Button>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              {githubLink && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] min-w-[44px]"
                >
                  <ExternalLink href={githubLink.url} aria-label={githubLink.label}>
                    <Github className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">GitHub</span>
                  </ExternalLink>
                </Button>
              )}

              {linkedinLink && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] min-w-[44px]"
                >
                  <ExternalLink href={linkedinLink.url} aria-label={linkedinLink.label}>
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">LinkedIn</span>
                  </ExternalLink>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
