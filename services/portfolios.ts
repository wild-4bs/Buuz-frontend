import ApiClient from "@/lib/apiClient";
import {
  CreatePortfolio,
  DeletePortfolio,
  GetPortfolio,
  GetPortfolios,
  PortfoliosGetByFieldsResponse,
  UpdatePortfolio,
} from "@/types/portfolios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPortfoliosByFields = () => {
  const endpoint = new ApiClient<any, PortfoliosGetByFieldsResponse>(
    "/portfolios/fields?fields=[name]"
  );
  return useQuery({
    queryKey: ["portfolios", "fields"],
    queryFn: endpoint.get,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetPortfolios = (params?: {}) => {
  const endpoint = new ApiClient<any, GetPortfolios>("/portfolios");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["portfolios", params],
    meta: { params },
    retry: 1,
  });
};

export const useGetPortfolio = (id: string) => {
  const endpoint = new ApiClient<any, GetPortfolio>(`/portfolios/${id}`);
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["portfolio", id],
  });
};

export const useCreatePortfolio = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, CreatePortfolio>("/portfolios");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: (res) => {
      scss(res.message);
    },
  });
};

export const useDeletePortfolio = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, DeletePortfolio>("/portfolios");
  return useMutation({
    mutationFn: (data: { id: string }) => endpoint.delete({}, data.id),
    onSuccess: (res) => {
      scss(res.message);
    },
  });
};

export const useUpdatePortfolio = (
  scss: (data: UpdatePortfolio) => void,
  id: string
) => {
  const endpoint = new ApiClient<any, UpdatePortfolio>("/portfolios");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
    onSuccess: (res) => {
      scss(res);
    },
  });
};
