import { Skeleton } from "@/components/ui/skeleton";

export function ProjectSkeleton() {
  return (
    <div className="project w-full max-h-[300px] flex flex-col gap-4">
      {/* Thumbnail with play button */}
      <div className="thumbnail relative w-full rounded-[25px] overflow-hidden">
        {/* Play button skeleton (hidden by default like in original) */}
        <Skeleton className="absolute z-10 scale-0 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-[50px] h-[50px] rounded-full bg-gray-300" />

        {/* Image placeholder */}
        <Skeleton className="w-full h-[226px] bg-gray-800 rounded-[25px]" />
      </div>

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mx-auto bg-gray-700 rounded-md" />
    </div>
  );
}
