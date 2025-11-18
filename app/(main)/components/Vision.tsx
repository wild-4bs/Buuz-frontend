"use client";
import { useMainStore } from "@/stores/main";
import Player from "@vimeo/player";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export const Vision = () => {
  const { pageContent } = useMainStore((state) => state);
  // const player = useRef<Player>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (!playerRef.current || !pageContent?.home?.vision_and_value_video)
  //       return;
  //     player.current = new Player(playerRef.current, {
  //       id: Number(pageContent?.home?.vision_and_value_video),
  //       controls: false,
  //       width: 640,
  //       height: 360,
  //       autoplay: true,
  //       muted: true,
  //       loop: true,
  //       byline: false,
  //       portrait: false,
  //     });
  //   }, 500);
  //   if (!player.current) return;

  //   return () => clearTimeout(timeout);
  // }, [pageContent]);

  return (
    <section className="vission py-10 bg-black text-white">
      <div className="container">
        <div className="title mb-8">
          <h1 className="mb-2 font-bold text-2xl">Our Vision & Values</h1>
          <p className="font-light text-xl text-center md:text-left">
            {JSON.stringify(pageContent?.home?.our_vision)}
          </p>
        </div>
        <div
          className="vimeo-crop-container bg-gray-500 !pointer-events-none w-full h-[calc(100vh-200px)] relative mb-12 rounded-br-[100px] overflow-hidden"
          ref={playerRef}
          data-lenis-prevent
        >
          {pageContent?.home?.vision_and_value_video && (
            <iframe
              src={`https://player.vimeo.com/video/${pageContent?.home?.vision_and_value_video}?autoplay=1&muted=1&background=1`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};
