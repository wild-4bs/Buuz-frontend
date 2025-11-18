import ApiClient from "@/lib/apiClient";
import { ServicesResponse } from "@/types/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetServices = () => {
  const endpoint = new ApiClient<any, ServicesResponse>("/services");

  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["services"],
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateService = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, ServicesResponse>("/services");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: (response) => {
      scss(response.message);
    },
  });
};

export const useDeleteService = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, ServicesResponse>("/services");
  return useMutation({
    mutationFn: (data: { id: string }) => endpoint.delete(undefined, data.id),
    onSuccess: (response) => {
      scss(response.message);
    },
  });
};
