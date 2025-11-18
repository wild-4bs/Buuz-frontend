"use client";
import Image from "next/image";
import styles from "../styles/about.module.scss";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMainStore } from "@/stores/main";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const { pageContent } = useMainStore((state) => state);

  const firstCard = useRef<HTMLDivElement>(null);
  const secondCard = useRef<HTMLDivElement>(null);
  const lastCard = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !firstCard.current ||
      !secondCard.current ||
      !lastCard.current ||
      !container.current
    )
      return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: 1,
        end: "top 10%",
        start: "top bottom",
      },
    });
    tl.to(firstCard.current, {
      x: 0,
      y: 0,
      opacity: 1,
    });
    tl.to(
      secondCard.current,
      {
        x: 0,
        y: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      lastCard.current,
      {
        x: 0,
        y: 0,
        opacity: 1,
      },
      "<"
    );
  }, []);
  return (
    <section className={twMerge("about overflow-hidden", styles.about)}>
      <div className="container" ref={container}>
        <div className={styles.cards}>
          <div
            className={twMerge(
              "overflow-hidden -translate-x-[400px] opacity-0",
              styles.card,
              styles.card1
            )}
            ref={firstCard}
          >
            <Image
              src={"/about/card-1.png"}
              alt="background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div
            className={twMerge(
              "-translate-y-[200px] opacity-0",
              styles.card,
              styles.card2
            )}
            ref={secondCard}
          >
            <Image
              src={"/about/card-2.png"}
              alt="background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          <div
            className={twMerge(
              "bg-gray-300 py-10 px-8 translate-x-[300px] opacity-0",
              styles.card,
              styles.card4
            )}
            ref={lastCard}
          >
            <h2 className="uppercase mb-12 text-sm sm:text-lg font-medium">
              Who We Are
            </h2>
            <h1 className="font-bold text-4xl sm:text-5xl mb-12">
              {pageContent?.about?.who_we_are}
            </h1>
            <p className="font-light text-lg sm:text-xl text-justify">
              {pageContent?.about?.about_us}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
