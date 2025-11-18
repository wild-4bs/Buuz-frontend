import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Project } from "./vimeo";

export const useGetPageContent = () => {
  const endpoint = new ApiClient<any, any>("/pages");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["pageContent"],
    retry: false,
  });
};

export const useUpdateHomePageProjects = (
  scss: (data: { message: string; updated_data: any }) => void
) => {
  const endpoint = new ApiClient<any, { message: string; updated_data: any }>(
    "/pages"
  );
  return useMutation({
    mutationFn: (data: {
      section: "aboutProjects" | "portfolioProjects";
      projects: Project[];
      pageContent: any;
    }) =>
      endpoint.put({
        home: {
          ...data.pageContent?.home,
          [data.section]: data.projects,
        },
      }),
    onSuccess: (data) => {
      scss(data);
    },
  });
};

export const useUpdateHomePageContent = (
  scss: (data: { message: string; updated_data: any }) => void
) => {
  const endpoint = new ApiClient<any, { message: string; updated_data: any }>(
    "/pages"
  );
  return useMutation({
    mutationFn: (data: { pageContent: any }) => {
      console.log(data?.pageContent);
      return endpoint.put({
        home: {
          ...data.pageContent?.home,
        },
      });
    },
    onSuccess: (data) => {
      scss(data);
    },
  });
};

export const useUpdateAboutPageContent = (
  scss: (data: { message: string; updated_data: any }) => void
) => {
  const endpoint = new ApiClient<any, { message: string; updated_data: any }>(
    "/pages"
  );
  return useMutation({
    mutationFn: (data: { pageContent: any }) =>
      endpoint.put({
        about: {
          ...data.pageContent?.about,
        },
      }),
    onSuccess: (data) => {
      scss(data);
    },
  });
};
