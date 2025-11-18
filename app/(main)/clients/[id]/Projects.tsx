import { Project } from "@/services/vimeo";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Projects = ({ projects }: { projects?: Project[] }) => {
  return (
    <>
      <div className="our-projects container mt-12 flex flex-wrap gap-4">
        {projects && projects?.length < 1 && (
          <h1 className="text-3xl font-medium text-center text-gray-500 w-full">
            No projects yet
          </h1>
        )}
        {projects &&
          projects?.map((project, i: number) => {
            return (
              <div
                className="project w-full min-w-sm max-w-[33%] flex-[1] relative hover:[&_span]:scale-100 hover:opacity-90 duration-150"
                key={i}
              >
                <Link href={`/portfolio/${project?._id}`}>
                  <div className="thumbnail relative w-full h-[200px]">
                    <div className="options absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-10">
                      <span className="playIcon transition duration-200 scale-0 w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white">
                        <PlayIcon />
                      </span>
                    </div>
                    <Image
                      src={project?.thumbnail}
                      fill
                      alt={project?.title}
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="content">
                    <h1 className="font-bold text-center mt-3 w-[90%]">
                      {project?.title}
                    </h1>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};
