"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    if (!title.current || !desc.current) return;
    const titleSpans = title.current.querySelectorAll("span");
    const descSpans = desc.current.querySelectorAll("span");
    if (!titleSpans || !descSpans) return;
    const tl = gsap.timeline();
    tl.to(titleSpans, {
      y: 0,
      opacity: 1,
      stagger: 0.14,
    });
    tl.to(descSpans, {
      x: 0,
      opacity: 1,
      stagger: 0.17,
    });
  }, []);
  return (
    <div className="hero py-10 relative bg-background text-onBackground min-h-[250px] flex items-center justify-center">
      <div className="bg absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={"/about/heroBg.png"}
          alt="background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container text-center relative z-[1]">
        <h1
          className="text-6xl font-medium mb-4 [&_span]:inline-block [&_span]:translate-y-12 [&_span]:opacity-0"
          ref={title}
        >
          <span>About</span> <span>us</span>
        </h1>
        <p
          className="font-light [&_span]:inline-block [&_span]:-translate-x-24 [&_span]:opacity-0"
          ref={desc}
        >
          <span>Home</span> <span>-</span> <span>About us</span>
        </p>
      </div>
    </div>
  );
};
