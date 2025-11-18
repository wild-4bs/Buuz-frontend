"use client";
import ImportIcon from "@/assets/icons/import.svg";
import { formatShortDateTime } from "@/lib/date";
import { useDeleteProject, useGetProjects } from "@/services/projects";
import Image from "next/image";
import Link from "next/link";
import ClientIcon from "@/assets/icons/client-icon.svg";
import TypeIcon from "@/assets/icons/type-icon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OptionsIcon from "@/assets/icons/options.svg";
import { toast } from "sonner";
import { Project } from "@/services/vimeo";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetServices } from "@/services/services";
import { Button } from "@/components/ui/button";
import { Edit } from "./Edit";
import { TrashIcon } from "lucide-react";
import { useGetPortfoliosByFields } from "@/services/portfolios";
import clsx from "clsx";

export const Content = () => {
  const [type, setType] = useState("");
  const [client, setClient] = useState("");

  const { data, isFetching, error, refetch }: any = useGetProjects({
    ...(type == "all" ? {} : { type }),
    ...(client == "all" ? {} : { client }),
  });

  const success = (message: string) => {
    toast.success(message);
    refetch();
  };
  const { mutate, isPending, error: deleteError } = useDeleteProject(success);

  const deleteProject = (id: string) => {
    mutate(id);
  };
  useEffect(() => {
    if (error || deleteError) {
      toast.error(error?.message || deleteError?.message);
    }
  }, [error, deleteError]);

  const {
    data: services,
    isFetching: isFetchingServices,
    error: servicesError,
  } = useGetServices();

  const { data: portfolios, isFetching: isFetchingPortfolios } =
    useGetPortfoliosByFields();
  return (
    <div className="content" style={{ gridArea: "content" }}>
      <div className="header flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Total Projects: {data?.payload?.length}
        </h1>
        <div className="options flex items-center gap-4">
          <Select
            onValueChange={setClient}
            disabled={
              (portfolios && portfolios?.payload?.length < 1) ||
              isFetchingPortfolios
            }
          >
            <SelectTrigger className="rounded-sm" defaultValue={"all"}>
              <SelectValue placeholder="Filter By Project Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {portfolios?.payload?.map((portfolio, i: number) => {
                return (
                  <SelectItem value={portfolio._id} key={i}>
                    {portfolio.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            onValueChange={setType}
            disabled={
              (services && services?.payload?.length < 1) || isFetchingServices
            }
          >
            <SelectTrigger className="rounded-sm" defaultValue={"all"}>
              <SelectValue placeholder="Filter By Project Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {services?.payload?.map((service, i: number) => {
                return (
                  <SelectItem value={service.name} key={i}>
                    {service.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Link href={"/dashboard/import"}>
            <div className="importProjects py-[.4rem] px-3 rounded-sm cursor-pointer hover:bg-primary transition duration-200 bg-darkPrimary">
              <ImportIcon />
            </div>
          </Link>
        </div>
      </div>
      <div className="projects mt-4 grid gap-2">
        {data?.payload && data.payload.length < 1 && (
          <h1 className="text-center text-xl text-gray-400">No Projects</h1>
        )}
        {data?.payload.map((project: Project, i: number) => {
          return (
            <div
              className="project flex justify-between bg-white py-2 px-4 rounded-lg border border-gray-200"
              key={i}
            >
              <div className="thumb-content flex gap-4">
                <div className="thumbnail flex items-center">
                  <Image
                    src={project.thumbnail}
                    alt="thumbnail"
                    width={250}
                    height={150}
                    onError={(err) => console.log(err)}
                    className="min-w-[250px] rounded-tr-4xl rounded-bl-4xl"
                  />
                </div>
                <div className="content flex flex-col gap-2">
                  <div className="title flex items-center gap-1">
                    <h1 className="font-bold">{project.title}</h1>
                    <span>|</span>
                    <span className="font-light text-sm">
                      {formatShortDateTime(project.created_time)}
                    </span>
                  </div>
                  <div className="desc-items flex-col flex gap-2 flex-1">
                    <p className="font-light text-sm leading-tight w-full max-w-[800px] flex-1">
                      {project.description}
                    </p>
                    <div className="client-type flex items-center gap-4 mt-4">
                      <div className="label-value flex items-center gap-2 text-sm">
                        <ClientIcon />
                        <span
                          className={clsx({
                            "text-gray-400": !project?.client,
                          })}
                        >
                          {project?.client
                            ? project?.client?.name
                            : "No client"}
                        </span>
                      </div>{" "}
                      <div className="label-value flex items-center gap-2 text-sm">
                        <TypeIcon />
                        <span>{project.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="options flex flex-col gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => deleteProject(project._id)}
                  disabled={isPending}
                >
                  <TrashIcon />
                </Button>
                <Edit project={project} refetch={refetch} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
