"use client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Project } from "./Project";
import { useGetProjects } from "@/services/projects";
import { Project as ProjectType } from "@/services/vimeo";

export const Content = ({ page }: { page: "home" | "about" }) => {
  const { data, isFetching, error } = useGetProjects({ page: 1 });

  return (
    <>
      <div className="header flex items-center justify-between">
        <h1 className="text-xl font-bold">Add new projects</h1>

        <Link
          href={`/dashboard/content/${page}`}
          className="flex items-center gap-2 hover:underline"
        >
          Go Back <ArrowRightIcon />
        </Link>
      </div>
      <ul className="projects grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(600px,1fr))] gap-4 mt-4">
        {data?.payload &&
          data?.payload?.map((project, i: number) => {
            return (
              <li key={i}>
                <Project project={project as ProjectType} />
              </li>
            );
          })}
      </ul>
    </>
  );
};
