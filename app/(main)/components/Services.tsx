"use client";
import * as icons from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useMainStore } from "@/stores/main";
import { Service } from "./Service";

export const Services = ({
  classes,
  title,
}: {
  classes?: string;
  title?: boolean;
}) => {
  const { pageContent } = useMainStore((state) => state);

  const [services, setServices] = useState([]);
  const titleEl = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleEl.current || !desc.current || !container.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        end: "top 0%",
      },
    });
    const titleSpans = titleEl.current.querySelectorAll("span");
    if (titleSpans) {
      tl.to(titleSpans, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
      });
      tl.to(titleEl.current, {
        opacity: 1,
        y: 0,
      });
      tl.to(desc.current, {
        opacity: 1,
        y: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (pageContent?.home) {
      setServices(pageContent?.home?.services);
    }
  }, [pageContent]);

  return (
    <section className={twMerge("services py-16", classes)} ref={container}>
      <div className="container">
        {title ? (
          <div className="title mb-20 text-center font-extralight text-xl">
            <h1
              className="font-extralight mb-4 text-4xl [&_span]:opacity-0 [&_span]:translate-y-12 [&_span]:inline-block translate-y-16"
              ref={titleEl}
            >
              <span>Our</span>{" "}
              <b>
                <span>Services</span>
              </b>
            </h1>
            <p
              className="w-full max-w-[700px] m-auto translate-y-16 opacity-0"
              ref={desc}
            >
              {pageContent?.home?.our_services}
            </p>
          </div>
        ) : null}
        <div
          className={twMerge(
            "services flex justify-between flex-wrap gap-12",
            classes
          )}
        >
          {services?.map(
            (
              service: { title: string; description: string; icon: string },
              i: number
            ) => {
              return (() => {
                const Icon = icons[
                  service.icon as keyof typeof icons
                ] as React.FC<icons.LucideProps>;
                return (
                  <Service
                    key={i}
                    icon={<Icon className="scale-[3.3] opacity-50" />}
                    title={service.title}
                    desc={service.description}
                  />
                );
              })();
            }
          )}
        </div>
      </div>
    </section>
  );
};
