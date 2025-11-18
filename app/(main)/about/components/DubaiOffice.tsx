"use client";

import { useMainStore } from "@/stores/main";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect } from "react";

export const DubaiOffice = () => {
  const { pageContent } = useMainStore((state) => state);

  useEffect(() => {
    if (pageContent) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);
    }
  }, [pageContent]);
  return (
    <>
      <div className="dubai-office bg-black text-white">
        <div className="container flex flex-col xl:flex-row flex-wrap gap-4">
          <div className="title w-full xl:w-[calc(50%-0.5rem)]">
            <h1 className="mb-2 text-5xl">
              {pageContent?.about?.office_section_title}
            </h1>
            <p className="font-medium text-sm w-full">
              {pageContent?.about?.office_section_caption}
            </p>
          </div>
          <div className="images w-full xl:w-[calc(50%-0.5rem)] flex flex-wrap gap-2 py-12">
            {pageContent?.about?.office_image_1 && (
              <Image
                src={pageContent?.about?.office_image_1}
                width={300}
                height={300}
                alt="office image"
                className="w-[calc(50%-.4rem)] -translate-y-6"
              />
            )}
            {pageContent?.about?.office_image_2 && (
              <Image
                src={pageContent?.about?.office_image_2}
                width={300}
                height={300}
                alt="office image"
                className="w-[calc(50%-.4rem)] translate-y-6"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
