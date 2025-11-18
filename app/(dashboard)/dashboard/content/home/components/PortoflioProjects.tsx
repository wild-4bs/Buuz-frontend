"use client";
import { Button } from "@/components/ui/button";
import { Project } from "@/services/vimeo";
import { useMainStore } from "@/stores/main";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useUpdateHomePageProjects } from "@/services/pages";
import { toast } from "sonner";
import { PortfolioProject } from "./PortoflioProject";

export const PortfolioProjects = () => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [portfolioProjects, setPortflioProjects] = useState([] as Project[]);
  const [disableSave, setDisableSave] = useState(true);
  useEffect(() => {
    if (pageContent) {
      const projects = pageContent?.home?.portfolioProjects as Project[];
      setPortflioProjects(projects);
    }
  }, [pageContent]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setDisableSave(false);
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = portfolioProjects.findIndex((p) => p._id == active.id);
      const newIndex = portfolioProjects.findIndex((p) => p._id == over.id);

      if (oldIndex === -1 || newIndex === -1) return;
      setPortflioProjects((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));
  const { mutate, isPending, error } = useUpdateHomePageProjects((data) => {
    toast.success(data.message);
    setPageContent(data.updated_data);
    setPortflioProjects(data?.updated_data?.home?.portoflioProjects);
  });

  const updateData = () => {
    const data = {
      section: "portfolioProjects" as "portfolioProjects",
      projects: portfolioProjects as Project[],
      pageContent,
    };
    mutate(data);
  };
  return (
    <div className="portfolioProjectsSection mt-8 overflow-hidden">
      <div className="header flex items-center justify-between">
        <h1 className="font-bold">Portfolio Projects</h1>
        <Button
          disabled={
            disableSave ||
            portfolioProjects == pageContent?.home?.portfolioProjects ||
            isPending
          }
          className="cursor-pointer"
          onClick={updateData}
        >
          Save
        </Button>
      </div>
      <div className="projects mt-4">
        {portfolioProjects?.length < 1 && (
          <h1 className="text-center text-gray-500 text-lg">No Projects</h1>
        )}
        {Array.isArray(portfolioProjects) && portfolioProjects.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={portfolioProjects.map((p) => p._id)}
              strategy={rectSortingStrategy}
            >
              <ul className="projects flex flex-col gap-2">
                {portfolioProjects?.map((project, i: number) => {
                  return <PortfolioProject key={i} project={project} />;
                })}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};
