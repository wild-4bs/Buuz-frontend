import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateHomePageProjects } from "@/services/pages";
import { Project as ProjectType } from "@/services/vimeo";
import { useMainStore } from "@/stores/main";
import { MoreVertical, PlusIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Project = ({ project }: { project: ProjectType }) => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [sectionsProjects, setSectionsProjects] = useState({
    aboutProjects: [] as ProjectType[],
    portfolioProjects: [] as ProjectType[],
  });
  useEffect(() => {
    const aboutProjects = pageContent?.home?.aboutProjects as ProjectType[];
    const portfolioProjects = pageContent?.home
      ?.portfolioProjects as ProjectType[];
    if (pageContent) {
      setSectionsProjects({ aboutProjects, portfolioProjects });
    }
  }, [pageContent]);

  const { mutate, isPending, error } = useUpdateHomePageProjects((data) => {
    toast.success(data.message);
    setPageContent(data.updated_data);
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const addProject = (section: "aboutProjects" | "portfolioProjects") => {
    const projects = [...sectionsProjects[section]];
    projects.push(project);
    const data = {
      section,
      projects,
      pageContent,
    };
    mutate(data);
  };
  return (
    <>
      <div className="project flex gap-2 justify-between border-gray-200 border px-4 py-2 rounded-sm">
        <div className="thumbnail-title flex gap-2 relative">
          <Image
            src={project?.thumbnail}
            alt="Project_thumbnail"
            width={200}
            height={100}
            className="rounded-tr-4xl rounded-bl-4xl"
          />
          <div className="title flex flex-col">
            <h1 className="font-bold flex-[1]">{project.title}</h1>
            <p className="flex gap-2">
              <UserIcon width={19} /> {project?.client?.name}
            </p>
          </div>
        </div>
        <div className="content">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="cursor-pointer w-[30px] h-[30px]">
                <MoreVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-[200px]">
              <h1 className="text-sm">Add The Project To:</h1>
              <Button
                variant={"outline"}
                className="w-full my-2 cursor-pointer"
                disabled={
                  isPending ||
                  sectionsProjects.aboutProjects.filter(
                    (p) => p._id == project._id
                  ).length > 0
                }
                onClick={() => addProject("aboutProjects")}
              >
                <PlusIcon />
                About section
              </Button>
              <Button
                variant={"outline"}
                className="w-full cursor-pointer"
                disabled={
                  isPending ||
                  sectionsProjects.portfolioProjects.filter(
                    (p) => p._id == project._id
                  ).length > 0
                }
                onClick={() => addProject("portfolioProjects")}
              >
                <PlusIcon />
                Portfolio section
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};
