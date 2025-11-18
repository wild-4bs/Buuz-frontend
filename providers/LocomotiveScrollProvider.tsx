"use client";

import { useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type LocomotiveScroll from "locomotive-scroll";

interface LocomotiveScrollProviderProps {
  children: ReactNode;
}

export default function LocomotiveScrollProvider({
  children,
}: LocomotiveScrollProviderProps) {
  useEffect(() => {
    let locoScroll: LocomotiveScroll | null = null;

    import("locomotive-scroll").then((locomotiveModule) => {
      gsap.registerPlugin(ScrollTrigger);

      const scrollContainer = document.querySelector(
        "[data-scroll-container]"
      ) as HTMLElement | null;

      if (!scrollContainer) return;

      locoScroll = new locomotiveModule.default({
        el: scrollContainer,
        smooth: true,
        smoothMobile: false,
        resetNativeScroll: true,
        getDirection: true,
      });

      locoScroll.on("scroll", () => {
        ScrollTrigger.update();
      });

      const scrollerElement = document.querySelector(
        ".smooth-scroll-gsap"
      ) as HTMLElement | null;

      if (!scrollerElement) return;

      ScrollTrigger.scrollerProxy(scrollerElement, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll!.scrollTo(value, 0, 0)
            : locoScroll!.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollerElement.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.addEventListener("refresh", () => {
        locoScroll?.update();
      });

      ScrollTrigger.refresh();
    });

    const updateScroll = () => {
      locoScroll?.update();
    };

    window.addEventListener("DOMContentLoaded", updateScroll);
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("DOMContentLoaded", updateScroll);
      window.removeEventListener("resize", updateScroll);
      locoScroll?.destroy();
    };
  }, []);

  return (
    <div data-scroll-container>
      <div className="smooth-scroll-gsap">{children}</div>
    </div>
  );
}
