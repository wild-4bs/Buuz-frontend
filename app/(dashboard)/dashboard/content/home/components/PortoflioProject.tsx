import { Button } from "@/components/ui/button";
import { Project } from "@/services/vimeo";
import { useSortable } from "@dnd-kit/sortable";
import { TrashIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { useUpdateHomePageProjects } from "@/services/pages";
import { toast } from "sonner";
import { useMainStore } from "@/stores/main";
import { useState } from "react";
import clsx from "clsx";

export const PortfolioProject = ({ project }: { project: Project }) => {
  const [grabbing, setGrabbing] = useState(false);
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project._id });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const { mutate, isPending, error } = useUpdateHomePageProjects((data) => {
    toast.success(data.message);
    setPageContent(data.updated_data);
  });

  const deleteProject = () => {
    const projects = [...pageContent?.home?.portfolioProjects] as Project[];
    const index = projects.findIndex((p) => p._id == project._id);
    projects.splice(index, 1);
    const data = {
      section: "portfolioProjects" as "portfolioProjects",
      pageContent,
      projects,
    };
    mutate(data);
  };
  return (
    <>
      <li
        className={clsx(
          "w-full flex justify-between border border-gray-400 bg-white rounded-sm overflow-hidden",
          {
            "cursor-grab": !grabbing,
            "cursor-grabbing": grabbing,
          }
        )}
        onMouseDown={() => setGrabbing(true)}
        onMouseUp={() => setGrabbing(false)}
        id={project._id}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="image-content flex gap-2">
          <Image
            src={project.thumbnail}
            width={200}
            height={100}
            alt="Thumnail"
          />
          <div className="content flex flex-col py-2">
            <h1 className="font-bold flex-[1]">{project?.title}</h1>
            <p className="flex gap-2 items-center">
              <UserIcon width={18} />
              {project?.client?.name}
            </p>
          </div>
        </div>
        <div className="options flex items-start gap-2 p-2">
          <Button
            variant={"ghost"}
            className="w-[30px] h-[30px] cursor-pointer border border-gray-200 hover:bg-red-100 hover:text-red-500 hover:border-red-500"
            disabled={isPending}
            onMouseUp={deleteProject}
          >
            <TrashIcon />
          </Button>
        </div>
      </li>
    </>
  );
};
