"use client";
import { Button } from "@/components/ui/button";
import { Project as ProjectType } from "@/services/vimeo";
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
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "./Project";
import { useUpdateHomePageProjects } from "@/services/pages";
import { toast } from "sonner";

export const Content = () => {
  const { pageContent } = useMainStore((state) => state);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [sectionProjects, setSectionProjects] = useState({
    aboutProjects: [] as ProjectType[],
    portfolioProjects: [] as ProjectType[],
  });

  useEffect(() => {
    if (pageContent) {
      const aboutProjects = pageContent?.home?.aboutProjects;
      const portfolioProjects = pageContent?.home?.portoflioProjects;

      setSectionProjects({
        aboutProjects,
        portfolioProjects,
      });
    }
  }, [pageContent]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setSaveDisabled(false);
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = sectionProjects.aboutProjects.findIndex(
        (project) => project._id === active.id
      );
      const newIndex = sectionProjects.aboutProjects.findIndex(
        (project) => project._id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) return;

      setSectionProjects((prev) => ({
        ...prev,
        aboutProjects: arrayMove(prev.aboutProjects, oldIndex, newIndex),
      }));
    }
  };
  const sensors = useSensors(useSensor(PointerSensor));

  const { mutate, isPending, error } = useUpdateHomePageProjects((data) => {
    toast.success(data.message);
    setSaveDisabled(true);
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const saveAboutProjects = () => {
    const data = {
      section: "aboutProjects" as "aboutProjects",
      projects: sectionProjects?.aboutProjects,
      pageContent,
    };
    mutate(data);
  };
  return (
    <>
      <div className="header flex items-center justify-between">
        <h1 className="text-xl font-bold">Home page content</h1>
        <Link href={"/dashboard/content/add_project/home"}>
          <Button variant={"outline"} className="cursor-pointer">
            <PlusIcon />
            Add New Project
          </Button>
        </Link>
      </div>
      <div className="about-projects mt-8">
        <div className="header flex items-center justify-between">
          <h2 className="font-bold">About Projects</h2>
          <Button
            className="cursor-pointer"
            disabled={
              sectionProjects.aboutProjects ==
                pageContent?.home?.aboutProjects ||
              isPending ||
              saveDisabled
            }
            onClick={saveAboutProjects}
          >
            Save
          </Button>
        </div>
        <ul className="projects overflow-hidden mt-4">
          {sectionProjects.aboutProjects?.length < 1 && (
            <h1 className="text-center text-gray-500 text-lg">No Projects</h1>
          )}
          {Array.isArray(sectionProjects?.aboutProjects) &&
            sectionProjects?.aboutProjects?.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sectionProjects?.aboutProjects?.map((p) => p._id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="flex flex-wrap gap-4 p-0 m-0 items-start">
                    {sectionProjects?.aboutProjects?.map((project) => (
                      <Project key={project._id} projectDetails={project} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
        </ul>
      </div>
    </>
  );
};
