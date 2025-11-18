import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Project } from "./vimeo";

export interface ProjectsResponse {
  message: string;
  payload: Project[];
}
export interface ProjectResponse {
  message: string;
  payload: Project;
}

interface DeleteResponse {
  message: string;
}

export interface UpdateResponse {
  message: string;
  result: Project;
}
export const useGetProjects = (params?: any) => {
  const endpont = new ApiClient<any, ProjectsResponse>(`/projects`);
  return useQuery({
    queryKey: ["projects", params],
    queryFn: endpont.get,
    meta: { params: { ...params } },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetProject = (params?: any) => {
  const endpont = new ApiClient<any, ProjectResponse>(
    `/projects/${params?.id}`
  );
  return useQuery({
    queryKey: ["projects"],
    queryFn: endpont.get,
    meta: { params: { ...params } },
    retry: false,
    refetchOnMount: false,
  });
};

export const useDeleteProject = (success: (message: string) => void) => {
  return useMutation({
    mutationFn: (id: string) =>
      new ApiClient<any, DeleteResponse>(`/projects/${id}`).delete(),
    mutationKey: ["projects"],
    onSuccess: (data) => {
      success(data.message);
    },
  });
};

export const useEditProject = (success: (data: UpdateResponse) => void) => {
  return useMutation({
    mutationFn: (data: any) =>
      new ApiClient<any, UpdateResponse>(`/projects/${data.id}`).put(data),
    onSuccess: (data) => {
      success(data);
    },
  });
};
