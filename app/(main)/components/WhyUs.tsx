"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import _ScrollTrigger, { ScrollTrigger } from "gsap/ScrollTrigger";
import ReasonIcon from "@/assets/icons/reason.svg";
import { useMainStore } from "@/stores/main";
import { useRouter } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
}

export const WhyUs = ({ classes }: { classes?: string }) => {
  const { pageContent } = useMainStore((state) => state);
  const [reasons, setReasons] = useState<Feature[]>([]);

  const imageRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const reasonsWrapper = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Memoized cleanup function
  const cleanup = useCallback(() => {
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];
  }, []);

  useEffect(() => {
    if (pageContent?.home) {
      setReasons(pageContent?.home?.features);
    }
  }, [pageContent]);

  // Single ScrollTrigger setup effect
  useEffect(() => {
    // iOS detection and optimization
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    if (isIOS) {
      document.documentElement.classList.add("is-ios");
      ScrollTrigger.defaults({
        preventOverlaps: true,
        fastScrollEnd: true,
      });
    }

    // Configure ScrollTrigger once
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    return cleanup;
  }, [cleanup]);

  // Pin image animation - optimized with better performance settings
  useEffect(() => {
    if (!imageRef.current || !container.current) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top 120px",
      end: "bottom bottom",
      pin: imageRef.current,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      // Performance optimizations
      refreshPriority: -1,
      onUpdate: (self) => {
        // Throttle updates for better performance
        if (self.progress % 0.1 < 0.01) {
          gsap.set(imageRef.current, { force3D: true });
        }
      },
    });

    scrollTriggersRef.current.push(pinTrigger);

    return () => {
      pinTrigger.kill();
      scrollTriggersRef.current = scrollTriggersRef.current.filter(
        (t) => t !== pinTrigger
      );
    };
  }, []);

  // Reasons animation - optimized with batch processing
  useGSAP(() => {
    if (!reasonsWrapper.current || reasons.length === 0) return;

    // Clear existing reason animations
    const existingReasonTriggers = scrollTriggersRef.current.filter(
      (trigger) =>
        trigger.vars.trigger &&
        trigger.vars.trigger instanceof Element &&
        trigger.vars.trigger.classList.contains("reason")
    );
    existingReasonTriggers.forEach((trigger) => {
      trigger.kill();
      scrollTriggersRef.current = scrollTriggersRef.current.filter(
        (t) => t !== trigger
      );
    });

    // Batch DOM queries
    const reasonElements = reasonsWrapper.current.querySelectorAll(".reason");

    // Set initial states in batch
    gsap.set(reasonElements, {
      opacity: 0,
      y: 200,
      x: 0,
      force3D: true, // Enable hardware acceleration
    });

    // Create animations with performance optimizations
    reasonElements.forEach((reason) => {
      const reasonTrigger = ScrollTrigger.create({
        trigger: reason,
        start: "top 100%",
        end: "top 50%",
        scrub: 0.3,
        fastScrollEnd: true,
        // Reduce refresh frequency for better performance
        refreshPriority: 0,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(reason, {
            opacity: progress,
            y: 200 * (1 - progress),
            duration: 0.1,
            ease: "none",
            overwrite: true,
          });
        },
      });

      scrollTriggersRef.current.push(reasonTrigger);
    });

    // Single refresh after all animations are set up
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [reasons]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (pageContent) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);
    }
  }, [pageContent]);

  return (
    <section className={twMerge("overflow-hidden relative", classes)}>
      <div className="container">
        <div className="title text-center font-extralight mb-28">
          <h1 className="mb-3 text-4xl">
            Why Choose <b>Beez Production?</b>
          </h1>
          <p className="w-full md:w-[800px] m-auto">
            {pageContent?.home?.why_choose_beez_production}
          </p>
        </div>
        <div
          className="content flex justify-between gap-12 relative"
          ref={container}
        >
          <div
            className="reasons flex-1 pt-24 pb-24 relative z-10"
            ref={reasonsWrapper}
          >
            {reasons?.map((reason, i: number) => {
              return (
                <div
                  className="reason flex relative gap-5 min-h-[300px] mb-8"
                  key={i}
                >
                  <div className="icon hidden md:inline-block flex-shrink-0">
                    <ReasonIcon />
                  </div>
                  <div className="title-desc relative flex-1">
                    <div className="reason-number font-extralight absolute top-[-60%] left-0 w-full h-full text-[220px] opacity-10 pointer-events-none">
                      <span className="relative z-[1]">{"0" + (i + 1)}</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold relative z-[2]">
                      {reason.title}
                    </h1>
                    <p className="text-lg font-light relative z-[2]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="image w-[45%] hidden lg:block rounded-bl-[100px] overflow-hidden shadow-lg relative"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 0)", // Force hardware acceleration
              height: "calc(100vh - 240px)",
              position: "relative",
            }}
            ref={imageRef}
          >
            <Image
              src={"/home/reasons/1.png"}
              width={1000}
              height={1000}
              alt="Image"
              className="w-full h-full object-cover"
              priority // Add priority loading for better performance
            />
          </div>
        </div>
      </div>
    </section>
  );
};
