import { Skeleton } from "@/components/ui/skeleton";

export function VideoPlayerSkeleton() {
  return (
    <div className="video absolute top-0 left-0 w-full h-full bg-gray-900">
      <div className="video-player relative z-0 flex items-center justify-center h-full w-full">
        <Skeleton className="h-full w-full rounded-none bg-gray-800" />
      </div>
      <div className="playIcon cursor-pointer absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <Skeleton className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-700" />
      </div>
      <div className="content select-none pointer-events-none w-full justify-center absolute bottom-[30px] left-2/4 -translate-x-2/4 flex items-center gap-4 md:gap-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="label-value flex flex-col gap-2">
            <Skeleton className="h-5 w-16 md:w-24 bg-gray-700" />
            <Skeleton className="h-4 w-20 md:w-32 bg-gray-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
