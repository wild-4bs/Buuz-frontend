"use client";
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "locomotive-scroll/dist/locomotive-scroll.css";

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.08,
      smartphone: {
        smooth: true,
      },
    });

    // ScrollTrigger Proxy
    ScrollTrigger.scrollerProxy(containerRef.current, {
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    scroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: containerRef.current });
    ScrollTrigger.refresh();

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div id="smooth-scroll" data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
};
