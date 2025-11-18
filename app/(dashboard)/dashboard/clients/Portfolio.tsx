import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/QueryProvider";
import { useDeletePortfolio } from "@/services/portfolios";
import { Portfolio as PortfolioType } from "@/types/portfolios";
import { ArrowDown, EyeClosed, EyeIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit } from "./Edit";
import { useDeleteProject } from "@/services/projects";
import { Delete } from "./DeleteProject";

export const Portfolio = ({
  portfolioData,
}: {
  portfolioData: PortfolioType;
}) => {
  const [showProjects, setShowProjects] = useState(false);
  const {
    mutate: deletePortfolio,
    isPending: isDeleting,
    error: deleteError,
  } = useDeletePortfolio((msg: string) => {
    toast.success(msg);
    queryClient.invalidateQueries({ queryKey: ["portfolios"] });
  });

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.message);
    }
  }, [deleteError]);

  return (
    <div className="portfolio w-full min-w-2xl overflow-hidden bg-white border border-gray-300 shadow rounded-lg">
      <div className="header relative w-full h-[300px] flex justify-between">
        <Image
          src={portfolioData?.image}
          fill
          alt="background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        />
        <div className="flex justify-between w-full px-3 py-2">
          <div className="logo relative z-[1] px-3 py-2 bg-white h-fit rounded-sm">
            <Image
              src={portfolioData?.logo}
              width={60}
              height={100}
              alt="Logo"
            />
          </div>
          <div className="options z-[1] relative flex flex-col gap-2">
            <Button
              variant={"outline"}
              className="w-[30px] h-[30px] hover:bg-red-400 hover:text-white hover:border-red-800"
              disabled={isDeleting}
              onClick={() => deletePortfolio({ id: portfolioData?._id })}
            >
              <TrashIcon />
            </Button>
            <Edit portfolio={portfolioData} />
          </div>
        </div>
      </div>
      <div className="content px-3 py-2 mt-2">
        <h1 className="text-2xl font-semibold">{portfolioData?.name}</h1>
        <p className="text-neutral-600 text-sm">{portfolioData?.description}</p>
      </div>
      <div className="projects-view px-3 pt-4 pb-2 flex justify-between">
        <h2 className="text-sm">Projects: {portfolioData?.projects_count}</h2>
        <div className="options">
          <Button
            onClick={() => setShowProjects(!showProjects)}
            className="show w-[30px] h-[30px] rounded-full text-black bg-white border hover:bg-gray-100 flex items-center justify-center"
          >
            {showProjects ? <EyeClosed width={24} /> : <EyeIcon width={24} />}
          </Button>
        </div>
      </div>
      {showProjects && portfolioData?.projects?.length > 0 && (
        <div className="projects flex flex-col gap-2 px-2 py-3">
          {portfolioData?.projects?.map((project, i: number) => {
            return (
              <div className="project flex gap-2" key={i}>
                <div className="image">
                  <Image
                    src={project?.thumbnail}
                    width={100}
                    height={100}
                    alt="thumbnail"
                    className="rounded-sm"
                  />
                </div>
                <div className="content flex-[1]">
                  <h1 className="text-sm">{project.title}</h1>
                  <p className="text-xs mt-1">{project.type}</p>
                </div>
                <div className="options">
                  <Delete id={project?._id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
