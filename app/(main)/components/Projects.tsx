"use client";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import styles from "@/app/(main)/styles/Project.module.scss";
import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { useMainStore } from "@/stores/main";
import { Project } from "@/services/vimeo";

export const Projects = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { pageContent } = useMainStore((state) => state);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="ourProjects pt-16 bg-black text-white">
      <div className="container pb-4 ">
        <Carousel opts={{ align: "start" }} className="w-full" setApi={setApi}>
          <CarouselContent>
            {!pageContent?.home?.aboutProjects &&
              Array.from({ length: 10 }).map((_, i: number) => {
                return (
                  <CarouselItem
                    key={i}
                    className="md:basis-1/2 lg:basis-1/3 h-[261px]"
                  >
                    <Skeleton className="w-full h-full bg-gray-500 rounded-none" />
                  </CarouselItem>
                );
              })}
            {pageContent?.home?.aboutProjects &&
              pageContent?.home?.aboutProjects.map(
                (project: Project, i: number) => {
                  return (
                    <CarouselItem
                      key={i}
                      className="md:basis-1/2 lg:basis-1/3 h-[261px]"
                    >
                      <Link href={`/portfolio/${project._id}`}>
                        <div
                          className={twMerge(
                            styles.project,
                            "project relative overflow-hidden w-full h-[261px] select-none hover:[&>button]:scale-100"
                          )}
                        >
                          <button className="absolute cursor-pointer hover:bg-darkPrimary hover:text-white top-4 right-4 w-[35px] h-[35px] rounded-full bg-white z-10 flex items-center justify-center scale-0 transition duration-300 place-self-end-safe">
                            <PlayIcon />
                          </button>
                          <div className="thumbnail absolute top-0 left-0 w-full h-full z-0">
                            <Image
                              src={project.thumbnail}
                              alt="project thumbnail"
                              width={1000}
                              height={1000}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className={twMerge(
                              "conten relative z-[1] opacity-0 flex items-center justify-center h-full text-white",
                              styles.content
                            )}
                            style={{ background: "rgba(0,0,0,.5)" }}
                          >
                            <h1 className="text-3xl text-center w-[90%]">
                              {project.title}
                            </h1>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  );
                }
              )}
          </CarouselContent>
          <div className="controllers flex items-center gap-4 mt-8 justify-center md:justify-start">
            <button className="previous" onClick={() => api?.scrollPrev()}>
              <ArrowLeft
                className={clsx("cursor-pointer", {
                  "opacity-50": current == 1,
                })}
              />
            </button>
            <button className="next" onClick={() => api?.scrollNext()}>
              <ArrowRight
                className={clsx("cursor-pointer", {
                  "opacity-50": !api?.canScrollNext(),
                })}
              />
            </button>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
