import { useTranslations } from "next-intl";
import { getAllProjects, toSummary } from "@/shared/lib/content-loader";
import { ProjectCard } from "./project-card";

export function ProjectGrid() {
  const t = useTranslations("projects");
  const projects = getAllProjects().map(toSummary);

  return (
    <section
      id="projects"
      className="flex min-h-screen flex-col justify-center bg-foreground/[0.03] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="font-display text-4xl text-foreground sm:text-5xl">
            {t("heading")}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg sm:leading-relaxed">
            {t("subtext")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
