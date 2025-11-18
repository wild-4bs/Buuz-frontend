"use client";
import { useGetProjects } from "@/services/projects";
import { PauseIcon, PlayIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectSkeleton } from "./ProjectSkeleton";
import clsx from "clsx";
import { NotFound } from "./Projects-404";
import { ScrollTrigger } from "gsap/all";
import { useGetServices } from "@/services/services";

export const Projects = () => {
  const { id } = useParams();

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([
    {
      name: "All",
      value: "",
      active: true,
    },
    {
      name: "Commercial",
      value: "commercial",
      active: false,
    },
    {
      name: "Films",
      value: "films",
      active: false,
    },
    {
      name: "Short Films",
      value: "short-films",
      active: false,
    },
    {
      name: "TV Programs",
      value: "tv-programs",
      active: false,
    },
    {
      name: "Series",
      value: "series",
      active: false,
    },
    {
      name: "Video Clip",
      value: "video-clip",
      active: false,
    },
    {
      name: "Sketch",
      value: "sketch",
      active: false,
    },
  ]);

  const { data, isFetching, error, refetch } = useGetProjects({
    type: category,
  });

  const {
    data: services,
    isFetching: isFetchingServices,
    error: servicesError,
  } = useGetServices();

  useEffect(() => {
    if (!data?.payload && !error) {
      refetch();
    }
    if (data) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    }
  }, [data]);

  useEffect(() => {
    if (services) {
      const newServices = services?.payload?.map((service) => ({
        name: service.name,
        value: service.name,
        active: false,
      }));
      newServices.unshift({
        name: "All",
        value: "",
        active: true,
      });
      setCategories(newServices);
    }
  }, [services]);

  const handleActive = (i: number) => {
    const cats = [...categories];
    cats.forEach((cat) => {
      cat.active = false;
    });
    cats[i].active = true;
    setCategories(cats);
    setCategory(cats[i].value);
  };

  return (
    <section className="projects pb-24">
      <div className="categories justify-center flex items-center gap-2 flex-wrap container px-0 py-2">
        {categories.map((category, i: number) => {
          return (
            <button
              className={clsx(
                "category text-sm cursor-pointer py-2 px-4 bg-[#2b2b2bad] border border-[#2b2b2b] rounded-sm hover:text-primary transition duration-200",
                {
                  "bg-[#303030] text-primary": category.active,
                }
              )}
              key={i}
              onClick={() => handleActive(i)}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div className="container px-0 gap-8 grid grid-cols-[repeat(auto-fill,minmax(100%,1fr))] md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
        {isFetching &&
          Array.from({ length: 12 }).map((_, i: number) => {
            return <ProjectSkeleton key={i} />;
          })}

        {!isFetching &&
          data?.payload?.map((project, i: number) => {
            return (
              <Link href={`/portfolio/${project._id}`} key={i}>
                <div
                  className="project w-full max-h-[300px] flex flex-col gap-4 cursor-pointer hover:[&_img]:opacity-90 hover:[&_.client]:opacity-100 transition duration-100 hover:[&_button]:scale-100"
                  key={i}
                >
                  <div className="thumbnail relative w-full rounded-[25px] overflow-hidden">
                    <button
                      className={clsx(
                        "absolute z-10 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full text-black hover:bg-darkPrimary hover:text-white cursor-pointer transition duration-200",
                        {
                          "scale-1": project.id == id,
                          "scale-0": project._id != id,
                        }
                      )}
                    >
                      {project._id == id ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <div className="client absolute z-10 top-4 left-4 opacity-0 text-xl font-bold transition duration-200">
                      <h2 className="flex gap-2">
                        <User /> {project?.client?.name}
                      </h2>
                    </div>
                    <Image
                      src={project.thumbnail}
                      alt="thumbnail"
                      width={415}
                      height={226}
                      className="w-full h-[226px] object-cover transition duration-100"
                    />
                  </div>
                  <h1 className="text-center text-xl">{project.title}</h1>
                </div>
              </Link>
            );
          })}
      </div>
      {data?.payload && data?.payload?.length < 1 && (
        <div className="flex items-center justify-center w-full">
          <NotFound />
        </div>
      )}
    </section>
  );
};
