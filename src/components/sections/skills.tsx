import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SkillBadge } from "@/components/shared/skill-badge";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-muted/50"
      aria-label="Skills"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading className="text-center mb-12">
          Skills & Expertise
        </SectionHeading>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <Card key={category.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                {category.description && (
                  <CardDescription>{category.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} name={skill.name} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
