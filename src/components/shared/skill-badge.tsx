import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  className?: string;
}

export function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("font-medium", className)}>
      {name}
    </Badge>
  );
}
