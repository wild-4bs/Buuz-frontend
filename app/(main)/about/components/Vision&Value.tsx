"use client";
import Image from "next/image";
import styles from "../styles/visionAndValues.module.scss";
import { twMerge } from "tailwind-merge";
import { Ref, Reference, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useMainStore } from "@/stores/main";

interface Card {
  title: string;
  areaId: string;
  ref: Ref<HTMLDivElement> | undefined;
  desc: string;
  list: { title: string; description: string }[];
}

export const VisionAndValue = () => {
  const { pageContent } = useMainStore((state) => state);
  const [cards, setCards] = useState<Card[]>([]);

  const mainCard = useRef<HTMLDivElement>(null);
  const firstCard = useRef<HTMLDivElement>(null);
  const secondCard = useRef<HTMLDivElement>(null);
  const thirdCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainCard.current || !firstCard.current || !secondCard.current) return;
    gsap.to(mainCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: mainCard.current,
        scrub: 1,
        end: "top center",
      },
    });
    gsap.to(firstCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: firstCard.current,
        scrub: 1,
        end: "top center",
      },
    });
    gsap.to(secondCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: secondCard.current,
        scrub: 1,
        end: "top center",
      },
    });
    gsap.to(thirdCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: thirdCard.current,
        scrub: 1,
        end: "top center",
      },
    });
  }, [cards]);

  useEffect(() => {
    if (!pageContent?.about) return;
    const newCards = [
      {
        title: "The Buzz That You Need",
        desc: "",
        list: [],
        areaId: "main",
        ref: mainCard,
      },
      {
        title: "Our Mission",
        desc: pageContent?.about?.our_mission,
        areaId: "mission",
        list: [],
        ref: firstCard,
      },
      {
        title: "Our Vision",
        desc: pageContent?.about?.our_vision,
        areaId: "vision",
        list: [],
        ref: secondCard,
      },
      {
        title: "Our Values",
        desc: "",
        ref: thirdCard,
        list: pageContent?.about?.our_values,
        areaId: "values",
      },
    ];
    setCards(newCards);
  }, [pageContent]);

  const cardsEl = cards.map((card, i: number) => {
    return (
      <div
        className={clsx(
          "card relative overflow-hidden py-6 px-8 bg-[#0B0B0B] text-onBackground rounded-2xl text-xl",
          styles.card,
          styles[card.areaId],
          {
            "-translate-x-[300px] opacity-0": card.areaId != "main",
            "translate-x-[300px] opacity-0": card.areaId == "main",
          }
        )}
        key={i}
        ref={card.ref}
      >
        {card.areaId != "main" ? (
          <>
            <h1 className="font-bold mb-6 text-black py-3 px-4 bg-white w-fit rounded-xl">
              {card.title}
            </h1>
            <p className="font-light">{card.desc}</p>
            <ul className="values flex flex-col gap-4">
              {card.list.map((item, i: number) => {
                return (
                  <li key={i} className="font-light">
                    <b>{item.title}:</b> {item.description}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <h1 className="text-5xl text-right w-full xl:w-[400px] ml-0 md:ml-auto z-[1] relative font-bold">
              {card.title}
            </h1>
            <Image
              src={"/about/mainCardBg.png"}
              alt="background"
              width={1000}
              height={1000}
              className="w-full z-0 h-full absolute top-0 left-0 object-cover"
            />
          </>
        )}
      </div>
    );
  });
  return (
    <section className={twMerge("mission-vision-value bg-black/50", styles.section)}>
      <div className="container">
        <div className={twMerge("cards grid gap-2", styles.cards)}>
          {cardsEl}
        </div>
      </div>
    </section>
  );
};
