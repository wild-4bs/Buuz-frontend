"use client";
import { ReactNode, useEffect, useRef } from "react";
import styles from "../styles/Services.module.scss";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button";
import gsap from "gsap";
import Link from "next/link";

type props = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export const Service = ({ icon, title, desc }: props) => {
  const titleEl = useRef(null);
  const descEl = useRef(null);
  const container = useRef(null);
  const iconEl = useRef(null);

  useEffect(() => {
    if (
      !titleEl.current ||
      !descEl.current ||
      !container.current ||
      !iconEl.current
    )
      return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
      },
    });

    tl.to(iconEl.current, {
      opacity: 1,
    });
    tl.to(titleEl.current, {
      opacity: 1,
      y: 60,
    });
    tl.to(titleEl.current, {
      y: 0,
      ease: "power1.out",
    });
    tl.to(
      descEl.current,
      {
        opacity: 1,
        y: 0,
        ease: "power1.out",
      },
      "<"
    );
  }, []);
  return (
    <div
      className={twMerge("service rounded-2xl pt-28 pb-4 px-4 w-full lg:w-[calc(50%-40px)] flex items-center justify-center gap-2 flex-col text-center border-2 border-[#31313156]", styles.serviceContainer)}
      ref={container}
    >
      <div
        className="icon mb-24 w-[200px] h-[200px] flex items-center justify-center relative opacity-0"
        ref={iconEl}
      >
        <div className="spheres w-full h-full absolute top-0 left-0">
          <div
            className={twMerge(
              "w-[calc(90%+72px)] h-[calc(90%+72px)]",
              styles.roundedBorder
            )}
          ></div>
          <div
            className={twMerge(
              "w-[calc(70%+72px)] h-[calc(70%+72px)]",
              styles.roundedBorder
            )}
          ></div>
          <div
            className={twMerge(
              "w-[calc(50%+72px)] h-[calc(50%+72px)]",
              styles.roundedBorder
            )}
          ></div>
        </div>
        {icon}
      </div>
      <div className="title mb-7 flex-1">
        <h1
          className="mb-6 font-bold text-3xl translate-y-12 opacity-0"
          ref={titleEl}
        >
          {title}
        </h1>
        <p
          className="w-full md:w-[90%] font-extralight leading-snug m-auto translate-y-24 opacity-0"
          ref={descEl}
        >
          {desc}
        </p>
      </div>
      <Link href={"/contact-us"} className="self-end">
        <Button
          content="Contact us"
          classes="border-[#696969]"
          iconClasses="bg-[#2D2D2D]"
        />
      </Link>
    </div>
  );
};
