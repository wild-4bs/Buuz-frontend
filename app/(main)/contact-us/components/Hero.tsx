"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!title.current || !desc.current) return;
    const tl = gsap.timeline();
    const titleSpans = title.current.querySelectorAll("span");
    const descSpans = desc.current.querySelectorAll("span");
    if (!titleSpans || !descSpans) return;
    tl.to(titleSpans, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
    });
    tl.to(descSpans, {
      x: 0,
      opacity: 1,
      stagger: 0.12,
    });
  }, []);
  return (
    <section className="hero relative py-16 h-[250px]">
      <div className="bg absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={"/contactUs/heroBg.png"}
          className="w-full h-full object-cover"
          alt="background"
          width={1000}
          height={250}
        />
      </div>
      <div className="container relative text-center z-[1] text-white">
        <h1
          className="text-4xl md:text-7xl mb-4 [&_span]:translate-y-[50px] [&_span]:inline-block [&_span]:opacity-0"
          ref={title}
        >
          <span>Contact</span> <span>us</span>
        </h1>
        <p
          className="font-light [&_span]:-translate-x-[50px] [&_span]:inline-block [&_span]:opacity-0"
          ref={desc}
        >
          <span>Home</span> <span>-</span> <span>Contact us</span>
        </p>
      </div>
    </section>
  );
};
