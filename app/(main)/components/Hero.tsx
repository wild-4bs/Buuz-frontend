"use client";
import { useMainStore } from "@/stores/main";
import gsap from "gsap";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [useIframe, setUseIframe] = useState(true); // لتبديل العرض بين الفيديو والـiframe
  const title = useRef<HTMLHeadingElement>(null);
  const { pageContent } = useMainStore((state) => state);

  const togglePlay = async () => {
    if (useIframe && iframeRef.current) {
      const player = new Player(iframeRef.current);
      const paused = await player.getPaused();
      if (paused) {
        player.play();
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    } else if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (!title.current) return;
    const firstSpans = title.current.querySelectorAll(".first");
    const secondSpans = title.current.querySelectorAll(".second");
    const tl = gsap.timeline();
    if (firstSpans && secondSpans) {
      tl.to(firstSpans, {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
      });
      tl.to(secondSpans, {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
        delay: 0.3,
      });
    }
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      const player = new Player(iframeRef.current);

      // عندما يبدأ الفيديو بالفعل
      player.on("play", () => {
        setUseIframe(true); // أخفي الفيديو المحلي
        setIsPlaying(true);
      });
    }
  }, []);

  return (
    <div className="hero relative h-[calc(80vh-200px)] md:h-[calc(100vh-90px)] bg-black overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent to-black"></div>

      {pageContent?.home?.hero_video && (
        <div
          className={`vimeo-crop-container !z-0 bg-black !absolute w-full h-full overflow-hidden transition-opacity duration-500 ${
            useIframe ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          data-lenis-prevent
        >
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${pageContent?.home?.hero_video}?autoplay=1&muted=1&controls=0&loop=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* الفيديو المحلي يظهر فقط قبل ما يبدأ الـiframe */}
      {!useIframe && (
        <div className="bg absolute top-0 left-0 w-full h-full z-[0] pointer-events-none transition-opacity duration-500">
          <video
            src={"/bg-video.mp4"}
            playsInline
            autoPlay
            className="w-full h-full object-cover opacity-50"
            muted
            ref={videoRef}
            loop
          />
        </div>
      )}

      <div className="container relative z-10 h-full hover:[&_button]:opacity-100">
        <div
          className="playIcon absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 cursor-pointer z-20"
          onClick={togglePlay}
        >
          <button className="cursor-pointer opacity-0 transition duration-200">
            {isPlaying ? (
              <PauseIcon className="scale-[3] text-white" />
            ) : (
              <PlayIcon className="scale-[3] text-white" />
            )}
          </button>
        </div>

        <div className="content relative z-10 h-full flex items-end text-white">
          <h1
            className="font-extralight text-center text-3xl w-full md:text-left mb-10 md:mb-16 [&_span]:opacity-0 [&_span]:translate-y-12 [&_span]:inline-block overflow-hidden"
            ref={title}
          >
            <span className="first">Welcome</span>{" "}
            <span className="first">to</span>{" "}
            <b>
              <span className="second">Beez</span>{" "}
              <span className="second">Production</span>
            </b>{" "}
            <br /> <span className="first">The</span>{" "}
            <b>
              <span className="first">Buzz</span>
            </b>{" "}
            <span className="second">That</span>{" "}
            <span className="second">You</span>{" "}
            <b>
              <span className="second">Need</span>
            </b>
          </h1>
        </div>
      </div>
    </div>
  );
};
