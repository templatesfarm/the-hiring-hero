import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ProjectsInfoType } from "./project.types";
import { HeroSkeleton } from "../Loaders";

export function ProjectsTimelineView({
  projectsInfo,
}: {
  projectsInfo: ProjectsInfoType;
}) {
  const data = projectsInfo.projects.map((project) => ({
    title: project.timeline,
    content: (
      <div className="space-y-5">
        <ProjectHeadline headline={project.headline1} />
        <ProjectHeadline headline={project.headline2} />
        <div className="flex flex-row gap-4 items-center">
          {project.companyName && (
            <div>
              <span className="mr-2 text-xs">✧</span>Company:{" "}
              {project.companyName}
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4 items-center">
          {project.clientName && (
            <div>
              <span className="mr-2 text-xs">✧</span>Client:{" "}
              {project.clientName}
              <br />
              <br />
            </div>
          )}
        </div>
        <ProjectSkills skills={project.skills} />
        <ProjectImages images={project.images} />
      </div>
    ),
  }));
  if (projectsInfo.projects.length === 0) {
    return <HeroSkeleton />;
  }
  return (
    <div className="w-full">
      <Timeline data={data} className="from-orange-700 via-oranghe-400" />
    </div>
  );
}

const ProjectSkills = ({ skills = "" }: { skills: string }) => {
  const skillsArray = skills.split(",").map((skill) => skill.trim());
  return (
    <div className="flex flex-row flex-wrap justify-start gap-4 items-center">
      {skillsArray?.map((skill, index) => (
        <div
          className="bg-gray-900 dark:bg-white border border-spacing-1 w-fit px-2 py-0.5 rounded-lg text-white dark:text-black text-sm"
          key={skill + index}
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

const ProjectHeadline = ({ headline }: { headline: string }) => {
  return (
    <p className="text-neutral-800 dark:text-neutral-200 text-md md:text-md font-normal">
      <span className="mr-2 text-xs">✦</span>
      {headline}
    </p>
  );
};

const ProjectImages = ({ images = [] }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((imageUrl, index) => (
        <Image
          src={imageUrl}
          alt="startup template"
          width={500}
          height={500}
          className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          key={imageUrl + index}
        />
      ))}
    </div>
  );
};
