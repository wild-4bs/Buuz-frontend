"use client";
import { useMainStore } from "@/stores/main";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Portfolio = () => {
  const { pageContent } = useMainStore((state) => state);
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        end: "top 20%",
      },
    });
    const spanEls = title.current?.querySelectorAll("span");
    if (spanEls) {
      tl.to(spanEls, {
        stagger: 0.1,
        y: 0,
        ease: "power1.out",
      });
      tl.to(title.current, {
        y: 0,
        ease: "power1.out",
      });
      tl.to(
        desc.current,
        {
          y: 0,
          opacity: 1,
          ease: "power1.out",
        },
        "<"
      );
    }
  }, []);
  return (
    <div className="portfolio relative bg-[#0B0B0B] text-white" ref={container}>
      <div className="bg absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={"/home/portfolioBg.png"}
          alt="Background"
          width={1000}
          height={1000}
          className="w-full h-full object-top object-cover"
        />
      </div>
      <div className="container py-16 relative z-[1]">
        <h1
          className="font-extralight text-5xl md:text-8xl mb-4 overflow-hidden translate-y-16"
          ref={title}
        >
          <b>
            <span className="translate-y-24 inline-block">P</span>
            <span className="translate-y-24 inline-block">o</span>
            <span className="translate-y-24 inline-block">r</span>
            <span className="translate-y-24 inline-block">t</span>
          </b>
          <span className="translate-y-24 inline-block">f</span>
          <span className="translate-y-24 inline-block">o</span>
          <span className="translate-y-24 inline-block">l</span>
          <span className="translate-y-24 inline-block">i</span>
          <span className="translate-y-24 inline-block">o</span>
        </h1>
        <p
          className="font-light text-lg w-[100%] md:w-[80%] mb-4 translate-y-23 opacity-0"
          ref={desc}
        >
          {pageContent?.home?.portfolio}
        </p>
      </div>
    </div>
  );
};
