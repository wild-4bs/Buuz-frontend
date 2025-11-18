"use client";

import { Button } from "@/components/ui/button";
import { useUpdateHomePageProjects } from "@/services/pages";
import { Project as ProjectType } from "@/services/vimeo";
import { useMainStore } from "@/stores/main";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Project = ({
  projectDetails,
}: {
  projectDetails: ProjectType;
}) => {
  const [grabbing, setGrabbing] = useState(false);
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const { mutate, isPending, error } = useUpdateHomePageProjects((data) => {
    toast.success(data.message);
    setPageContent(data.updated_data);
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: projectDetails._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: ".5rem",
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const deleteProject = () => {
    const projects = [...pageContent?.home?.aboutProjects] as ProjectType[];
    const index = projects.findIndex((p) => p._id == projectDetails._id);
    projects.splice(index, 1);
    const data = {
      section: "aboutProjects" as "aboutProjects",
      projects,
      pageContent,
    };
    mutate(data);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "!w-full max-w-[300px] min-w-[300px] h-[160px] relative flex-[1]",
        {
          "cursor-grab": !grabbing,
          "cursor-grabbing": grabbing,
        }
      )}
      onMouseDown={() => setGrabbing(true)}
      onMouseUp={() => setGrabbing(false)}
    >
      <Button
        className="delete z-10 pointer-events-auto cursor-pointer text-black hover:bg-red-100 transition duration-200 hover:border-red-400 hover:text-red-600 w-[30px] h-[30px] rounded-sm absolute top-4 right-4 bg-gray-50 border border-gray-400 flex items-center justify-center"
        onMouseUp={deleteProject}
        disabled={isPending}
      >
        <TrashIcon width={18} />
      </Button>
      <Image
        src={projectDetails?.thumbnail}
        alt="thumbnail"
        width={300}
        height={200}
        className="w-[100%] h-full rounded-sm object-cover"
      />
    </div>
  );
};
