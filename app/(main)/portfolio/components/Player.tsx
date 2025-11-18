"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import {
  FullscreenIcon,
  LucideFullscreen,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import { formatShortDateTime, timeAgo } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/lib/apiClient";
import styles from "../styles/player.module.scss";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import { VideoPlayerSkeleton } from "./VideoPlayerSkeleton";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ScrollTrigger } from "gsap/all";

const getProject = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/projects/${id}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const VimeoPlayer = ({ id }: { id: string }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const playIcon = useRef<HTMLDivElement>(null);
  const player = useRef<Player>(null);
  const fullscreenButton = useRef<HTMLButtonElement>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canAction, setCanAction] = useState(false);

  const { data, isFetching, error }: any = useQuery({
    queryFn: () => getProject(id),
    queryKey: ["project", id],
  });

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    ScrollTrigger.refresh();
    if (!playerRef.current || !data?.project) return;
    if (player.current) {
      player.current
        .destroy()
        .then(() => {
          player.current = null;
        })
        .catch(console.error);
    }
    player.current = new Player(playerRef.current, {
      url: data?.project?.video,
      keyboard: true,
      playsinline: true,
      height: vh * 65,
      controls: fullscreen,
    });

    player.current.on("loaded", async () => {
      setIsLoaded(true);
      setCanAction(true);
      if (fullscreen) {
        await player.current?.requestFullscreen();
      }
    });
    player.current.on("bufferend", () => {
      setCanAction(true);
    });
    player.current.on("bufferstart", () => {
      setCanAction(false);
    });

    player.current.on("fullscreenchange", (e) => {
      setFullscreen(e.fullscreen);
    });

    return () => {
      if (!player.current) return;
      player.current.destroy().catch(console.error);
      player.current = null;
      setIsLoaded(false);
    };
  }, [id, data, fullscreen]); // Add id to dependencies

  const hover = () => {
    if (!playIcon.current || !content.current) return;
    gsap.to(playIcon.current, {
      opacity: 1,
      duration: 0,
    });
    gsap.to(content.current, {
      opacity: 1,
    });
    gsap.to(fullscreenButton.current, {
      opacity: 1,
      duration: 0,
    });
  };

  const hideElements = () => {
    if (!playIcon.current || !content.current) return;
    gsap.to(playIcon.current, {
      opacity: 0,
      duration: 0.1,
    });
    gsap.to(content.current, {
      opacity: 0,
      duration: 0.1,
    });
    gsap.to(fullscreenButton.current, {
      opacity: 0,
      duration: 0,
    });
  };

  const handlePlay = () => {
    if (!isLoaded || !canAction) return;
    setIsPlaying((prev) => {
      const newState = !prev;
      if (newState) {
        player.current?.play();
      } else {
        player.current?.pause();
      }
      return newState;
    });
  };

  const handleFullscreen = async () => {
    setFullscreen(true);
  };

  return (
    <section className="player min-h-[calc(100vh-90px)]">
      <div className="container px-0">
        <div className="default w-[99%] m-auto">
          <div className="video relative flex justify-center rounded-tl-[100px] rounded-br-[100px] overflow-hidden w-full">
            <div
              className="video w-fit rounded-br-[100px] rounded-tl-[100px] overflow-hidden relative flex justify-center"
              onMouseLeave={hideElements}
              onMouseEnter={hover}
            >
              {!isLoaded && <VideoPlayerSkeleton />}
              <div
                className={twMerge("w-fit relative", styles.player)}
                ref={playerRef}
              ></div>
              {isLoaded && (
                <button
                  className={clsx(
                    "fullscreen absolute top-4 right-4 z-10 hover:text-primary text-white w-[60px] h-[60px] rounded-full flex items-center justify-center hover:bg-[#ffffff30] transition duration-150 cursor-pointer"
                  )}
                  onClick={handleFullscreen}
                  ref={fullscreenButton}
                >
                  <LucideFullscreen width={40} height={40} />
                </button>
              )}
              <div
                className={clsx(
                  "playIcon cursor-pointer hover:text-primary transition duration-100 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4",
                  styles.playIcon,
                  {
                    "!opacity-0": !isLoaded,
                  }
                )}
                ref={playIcon}
                onClick={handlePlay}
              >
                {!isPlaying ? (
                  <button className="cursor-pointer">
                    <PlayIcon className="scale-[2] md:scale-[3]" />
                  </button>
                ) : (
                  <button className="cursor-pointer">
                    <PauseIcon className="scale-[2] md:scale-[3]" />
                  </button>
                )}
              </div>
              <div
                className={clsx(
                  "content select-none pointer-events-none w-full justify-center absolute bottom-[30px] left-2/4 -translate-x-2/4 flex items-center gap-4 md:gap-12",
                  styles.content,
                  {
                    "!opacity-0": !isLoaded,
                  }
                )}
                ref={content}
              >
                <div className="label-value text-xs lg:text-lg">
                  <h1 className="font-bold">DATE</h1>
                  <p className="font-light">
                    {formatShortDateTime(data?.project?.created_time)}
                  </p>
                </div>
                <div className="label-value text-xs lg:text-lg">
                  <h1 className="font-bold">CLIENT</h1>
                  <p className="font-light">{data?.project?.client?.name}</p>
                </div>
                <div className="label-value text-xs lg:text-lg">
                  <h1 className="font-bold">TYPE</h1>
                  <p className="font-light">{data?.project?.type}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="title px-4 sm:p-0 text-2xl sm:text-4xl my-8 font-bold">
            {isLoaded ? (
              <h1>{data?.project?.title}</h1>
            ) : (
              <Skeleton className="w-[200px] h-[30px] bg-gray-700" />
            )}
          </div>
          <Link href={"https://vimeo.com/user230152930"} target="_blank">
            <div className="profile px-4 sm:p-0 flex gap-4 hover:text-white text-gray-200">
              <Image
                src={"/portfolio/profile.png"}
                width={60}
                height={60}
                alt="profile"
                className="min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]"
              />
              <div className="content">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  Beez Production
                </h1>
                <p className="date text-xs md:text-lg font-light capitalize">
                  {timeAgo(data?.project?.created_time)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
