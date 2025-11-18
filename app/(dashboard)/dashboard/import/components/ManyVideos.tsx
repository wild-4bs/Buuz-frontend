import { formatShortDateTime } from "@/lib/date";
import Image from "next/image";
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
import { Project, ProjectResponse, useUploadProject } from "@/services/vimeo";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetPortfoliosByFields } from "@/services/portfolios";
import { useGetServices } from "@/services/services";

export const ManyVideos = ({ videos, ...props }: { videos: any[] }) => {
  const [newProjects, setNewProjects] = useState([] as Project[]);
  const [type, setType] = useState("");
  const [client, setClient] = useState("");

  const dialogRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const setDialogRef =
    (projectId: string) => (el: HTMLButtonElement | null) => {
      if (el) {
        dialogRefs.current.set(projectId, el);
      } else {
        dialogRefs.current.delete(projectId);
      }
    };

  const success = (response: ProjectResponse) => {
    const dialogRef = dialogRefs.current.get(response.project.video_uri);
    const projects = [...newProjects];
    projects.push(response.project);
    setNewProjects(projects);
    if (dialogRef) {
      dialogRef.click();
    }
    toast.success(response.message);
  };

  const handleError = (errors: string[]) => {
    errors.forEach((error) => {
      toast.error(error);
    });
  };

  const { mutate, isPending, error } = useUploadProject(success, handleError);

  const create = (e: any, videoData: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const projectData = {
      client: client,
      description: form.get("description"),
      type: type,
      created_time: videoData.created_time,
      thumbnail: videoData.pictures.base_link,
      title: form.get("title"),
      video: videoData.link,
      video_uri: videoData.uri,
      project_id: videoData.uri.split("/")[2],
    };
    mutate(projectData);
  };

  const {
    data,
    isFetching,
    error: portfoliosError,
  } = useGetPortfoliosByFields();

  const {
    data: services,
    isFetching: isFetchingServices,
    error: servicesError,
  } = useGetServices();

  useEffect(() => {
    if (portfoliosError) toast.error(portfoliosError.message);
    if (error) toast.error(error.message);
  }, [portfoliosError, error]);
  return (
    <div {...props}>
      <ul className="flex flex-col gap-2">
        {videos?.map((project: any, i: number) => {
          return (
            <li
              className="project bg-white flex items-center justify-between pr-4 px-2 py-4"
              key={i}
            >
              <div className="thumbnail-content flex gap-2">
                <Image
                  src={project.pictures.base_link}
                  alt="thumbnail"
                  width={200}
                  height={100}
                  className="rounded-tr-4xl rounded-bl-4xl"
                />
                <div className="content flex flex-col justify-between pb-2">
                  <h1 className="font-bold">{project.name}</h1>
                  <p className="font-light">
                    {formatShortDateTime(project.created_time)}
                  </p>
                </div>
              </div>
              <div className="options">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="add-project flex items-center p-0 rounded-sm cursor-pointer hover:bg-primary justify-center bg-darkPrimary"
                      ref={setDialogRef(project.uri)}
                      disabled={
                        newProjects.filter((p) => p.video_uri == project.uri)
                          .length > 0
                      }
                    >
                      <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[767px] bg-white">
                    <form onSubmit={(e) => create(e, project)}>
                      <DialogHeader className="pb-6 !text-center">
                        <DialogTitle>Add to projects</DialogTitle>
                        <DialogDescription className="font-light">
                          Add this project to your projects list, the video, and
                          thumbnail will be automaticlly uploaded.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-5">
                        <div className="grid gap-2">
                          <Label className="text-right" htmlFor="title">
                            Title
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            className="text-sm font-light"
                            placeholder="Project title."
                            defaultValue={project.name}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Select onValueChange={setClient}>
                            <SelectTrigger
                              className="w-full"
                              disabled={
                                isFetching ||
                                (data && data?.payload?.length < 1)
                              }
                            >
                              <SelectValue placeholder="Project Client" />
                            </SelectTrigger>
                            <SelectContent>
                              {data?.payload?.map((port, i: number) => {
                                return (
                                  <SelectItem value={port._id} key={i}>
                                    {port.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <Select onValueChange={setType}>
                            <SelectTrigger
                              className="w-full"
                              disabled={
                                isFetchingServices ||
                                (services && services?.payload?.length < 1)
                              }
                            >
                              <SelectValue
                                placeholder={
                                  services && services?.payload?.length > 0
                                    ? "Project Type"
                                    : "No Services"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {services?.payload?.map((service, i: number) => {
                                return (
                                  <SelectItem
                                    value={service.name}
                                    key={i}
                                    className="capitalize"
                                  >
                                    {service.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter className="pt-4">
                        <Button
                          type="submit"
                          className="w-full cursor-pointer"
                          disabled={isPending || type == "" || client == ""}
                        >
                          {isPending ? "Adding..." : "Add"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
