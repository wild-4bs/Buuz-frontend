"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { extractId } from "@/helpers/vimeo";
import { queryClient } from "@/providers/QueryProvider";
import { useUpdateHomePageProjects } from "@/services/pages";
import { useGetPortfoliosByFields } from "@/services/portfolios";
import { UpdateResponse, useEditProject } from "@/services/projects";
import { useGetServices } from "@/services/services";
import { Project, useFetchVideos } from "@/services/vimeo";
import { useMainStore } from "@/stores/main";
import { SelectValue } from "@radix-ui/react-select";
import { PenIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Edit = ({
  project,
  refetch,
}: {
  project: Project;
  refetch: () => void;
}) => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [videoId, setVideoId] = useState("");

  const {
    mutate: updateHomePageProjects,
    isPending: isUpdatingHomePageProjects,
    error: homePageProjectsError,
  } = useUpdateHomePageProjects((data) => {
    toast.success(data.message);
    setPageContent(data.updated_data);
  });

  const success = (data: UpdateResponse) => {
    toast.success(data?.message);
    setOpen(false);
    const aboutProjects = pageContent?.home?.aboutProjects;
    const portfolioProjects = pageContent?.home?.portfolioProjects;
    if (aboutProjects?.length > 0) {
      const updatedProject = aboutProjects?.find(
        (project: Project) => project?._id == data?.result?._id
      );
      if (updatedProject) {
        let projectsToUpdate = pageContent?.home?.aboutProjects;
        let projectIndex = projectsToUpdate.findIndex(
          (project: Project) => project?._id == updatedProject._id
        );
        projectsToUpdate[projectIndex] = data?.result;
        updateHomePageProjects({
          section: "aboutProjects",
          projects: [...projectsToUpdate] as Project[],
          pageContent,
        });
      }
    }
    if (portfolioProjects?.length > 0) {
      const updatedProject = portfolioProjects?.find(
        (project: Project) => project?._id == data?.result?._id
      );

      if (updatedProject) {
        let projectsToUpdate = pageContent?.home?.portfolioProjects;
        let projectIndex = projectsToUpdate.findIndex(
          (project: Project) => project?._id == updatedProject._id
        );
        projectsToUpdate[projectIndex] = data?.result;
        updateHomePageProjects({
          section: "portfolioProjects",
          projects: [...projectsToUpdate] as Project[],
          pageContent,
        });
      }
    }
    refetch();
  };
  const { mutate, isPending, error } = useEditProject(success);
  const [videoIdValue, setVideoIdValue] = useState(project.project_id);
  const {
    data,
    isFetching,
    error: video_error,
    refetch: refetchVideo,
  }: any = useFetchVideos(videoId || project.project_id, "single");

  const editProject = (e: any) => {
    const form = new FormData(e.target);
    const projectData = {
      ...(form.get("title") && { title: form.get("title") }),
      ...(form.get("description") && { description: form.get("description") }),
      ...(client != "" ? { client } : {}),
      ...(type && { type: type }),
      ...(data?.link && { video: data?.link }),
      ...(data?.uri && { video_uri: data?.uri }),
      ...(data?.pictures && { thumbnail: data?.pictures.base_link }),
      ...(form.get("created_time") && {
        created_time: form.get("created_time"),
      }),
      ...(form.get("thumbnail") && { thumbnail: form.get("thumbnail") }),
      id: project._id,
    };
    e.preventDefault();
    mutate(projectData);
  };

  useEffect(() => {
    if (error || video_error) {
      toast.error(error?.message || video_error?.error);
    }
  }, [error, video_error]);

  const fetchVideo = () => {
    setVideoId(videoIdValue);
    refetchVideo();
  };

  const { data: services, isFetching: isFetchingServices } = useGetServices();
  const { data: portfolios, isFetching: isFetchingPortfolios } =
    useGetPortfoliosByFields();
  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <PenIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[767px] bg-white">
          <form onSubmit={(e) => editProject(e)}>
            <DialogHeader className="pb-4">
              <DialogTitle>Edit this project</DialogTitle>
              <DialogDescription className="font-light">
                This edits will effect the projects on the website not the
                original project in vimeo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Project title..."
                  className="text-sm font-light"
                  name="title"
                  defaultValue={project.title}
                />
              </div>
              <div className="flex justify-between gap-2">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="client" className="text-right">
                    Client
                  </Label>
                  <Select
                    onValueChange={setClient}
                    defaultValue={project?.client?._id}
                    disabled={isFetchingPortfolios}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Client" />
                    </SelectTrigger>
                    <SelectContent>
                      {portfolios?.payload?.map((portoflio, i: number) => {
                        return (
                          <SelectItem key={i} value={portoflio._id}>
                            {portoflio.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    onValueChange={setType}
                    defaultValue={project?.type}
                    disabled={isFetchingServices}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {services?.payload?.map((service, i: number) => {
                        return (
                          <SelectItem key={i} value={service.name}>
                            {service.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="thumbnail flex gap-2 mt-4 justify-between">
                  <div className="input flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        id="video_id"
                        placeholder="Video id..."
                        className="text-sm font-light w-full"
                        name="video_id"
                        value={videoIdValue}
                        onInput={(e: any) => setVideoIdValue(e.target.value)}
                      />
                      <Button
                        className="cursor-pointer bg-darkPrimary"
                        type="button"
                        onClick={fetchVideo}
                        disabled={
                          isFetching ||
                          videoIdValue == project.project_id ||
                          (data && videoId == extractId(data?.uri))
                        }
                      >
                        {isFetching ? <Loader color="white" /> : "Fetch"}
                      </Button>
                    </div>
                    <Label htmlFor="video_id" className="text-right">
                      Video id
                    </Label>
                    <p className="font-light text-sm">
                      The thumbnail and the video will be taken from this
                      project, You can get the project id from the project url
                      like this: "https://vimeo.com/
                      <span className="px-1 bg-green-100 border border-green-400 rounded-xs">
                        project_id
                      </span>
                      "
                    </p>
                  </div>
                  <Image
                    src={data?.pictures?.base_link || project.thumbnail}
                    alt="thumbnail"
                    width={300}
                    height={200}
                    className="w-[40%]"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-white border-gray-300 border text-black hover:bg-white"
                disabled={false}
              >
                {isPending ? <Loader content="Editing" /> : "Edit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
