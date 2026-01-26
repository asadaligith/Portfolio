import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t" role="contentinfo">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js, Tailwind CSS, and Shadcn UI
          </p>
        </div>
      </div>
    </footer>
  );
}
