import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold tracking-tight text-foreground md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
