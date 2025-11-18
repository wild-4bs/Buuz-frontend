"use client";
import { Button } from "@/components/ui/button";
import { useMainStore } from "@/stores/main";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "./Textarea";
import { useUpdateHomePageContent } from "@/services/pages";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchVideo } from "@/services/vimeo";
import Player from "@vimeo/player";
import { extractId } from "@/helpers/vimeo";
import { HeroVideo } from "./HeroVideo";

export const TextUpdaters = () => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [texts, setTexts] = useState({});
  const [initText, setInitText] = useState<any>(null);
  const [videoId, setVideoId] = useState("");
  const [canSend, setCandSend] = useState(false);
  const [vidoeLoading, setVideoLoading] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<Player>(null);

  useEffect(() => {
    if (pageContent && pageContent?.home) {
      if (!playerRef.current) return;
      if (pageContent?.home?.vision_and_value_video) {
        setVideoLoading(true);
      }
      player.current = new Player(playerRef.current, {
        id: Number(pageContent?.home?.vision_and_value_video),
        controls: false,
        width: 640,
        height: 360,
        autoplay: true,
        muted: true,
        loop: true,
        byline: false,
        portrait: false,
      });
      player.current.on("play", () => {
        setVideoLoading(false);
      });
      const newTexts = Object.fromEntries(
        Object.entries(pageContent?.home).filter(
          ([_, value]) => typeof value === "string"
        )
      );
      setTexts(newTexts);
      if (!initText) {
        setInitText(newTexts);
      }
    }
  }, [pageContent]);

  useEffect(() => {
    if (videoId) {
      setCandSend(true);
    }
  }, [videoId]);

  const {
    mutate,
    isPending,
    error: updateError,
  } = useUpdateHomePageContent((data) => {
    setPageContent(data.updated_data);
    toast.success(data.message);
  });

  const { data, isFetching, refetch, isSuccess, error } = useFetchVideo({
    id: videoId,
  }) as {
    data: any;
    isFetching: boolean;
    refetch: () => void;
    isSuccess: boolean;
    error: any;
  };

  useEffect(() => {
    if (data) {
      setCandSend(false);
      if (!playerRef.current) return;
      if (player.current) {
        player.current?.destroy();
      }
      player.current = new Player(playerRef.current, {
        id: Number(videoId),
        controls: false,
        width: 640,
        height: 360,
        autoplay: true,
        muted: true,
        loop: true,
        byline: false,
        portrait: false,
      });
    }
  }, [data]);

  const save = () => {
    setPageContent({
      ...pageContent,
      home: { ...pageContent?.home, vision_and_value_video: videoId },
    });
    const newPageContent = {
      ...pageContent,
      home: { ...pageContent?.home, vision_and_value_video: videoId },
    };
    mutate({ pageContent: newPageContent });
    setVideoId("");
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError?.message);
    }
    if (error) {
      toast.error(error?.error);
    }
  }, [updateError, error]);

  return (
    <div className="textUpdaters mt-12">
      <div className="header flex items-center justify-between mb-4">
        <h1 className="font-bold">Page Text Content</h1>
        <Button
          disabled={initText == texts || isPending}
          className="cursor-pointer select-none"
          onClick={() => mutate({ pageContent })}
        >
          Save
        </Button>
      </div>
      <HeroVideo />
      <div className="texts flex gap-4 flex-wrap">
        {Object.entries(texts).map(([key, value], i: number) => {
          return (
            key != "vision_and_value_video" &&
            key != "hero_video" && (
              <Textarea title={key} value={value as string} key={i} />
            )
          );
        })}
        <div className="vimeo-video flex flex-wrap w-full xl:w-2/4 gap-2">
          <div className="w-full flex flex-col gap-2">
            <Label className="capitalize text-sm flex items-center gap-2 h-[30px]">
              Vision And Value Video
            </Label>
            <div className="input flex gap-2 w-full">
              <Input
                type="link"
                onInput={(e: any) => setVideoId(e.target.value)}
                value={videoId}
                placeholder="Video id from vimeo only!"
              />
              <Button
                disabled={!videoId || isFetching || !canSend}
                onClick={() => refetch()}
              >
                {isFetching ? "Fetching..." : "Fetch"}{" "}
              </Button>
              <Button
                disabled={
                  !player.current ||
                  (data &&
                    extractId(data?.uri) ==
                      pageContent?.home?.vision_and_value_video) ||
                  videoId == pageContent?.home?.vision_and_value_video ||
                  !videoId
                }
                onClick={save}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
          <div
            className="video vimeo-crop-container w-full h-96 border-2 border-dotted flex items-center justify-center"
            ref={playerRef}
          >
            {pageContent?.home?.vision_and_value_video ? (
              (vidoeLoading || isFetching) && (
                <h1 className="select-none text-gray-400">Loading video...</h1>
              )
            ) : (
              <h1 className="select-none text-gray-400">Video Will Be Here</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
