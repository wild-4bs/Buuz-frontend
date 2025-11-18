import ApiClient from "@/lib/apiClient";
import { CreateValueRes, DeleteValueRes, ValuesResponse } from "@/types/values";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getValues = (params: {}) => {
  const endpoint = new ApiClient<any, ValuesResponse>("/values");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["values", params],
    meta: { params: { ...params } },
    retry: 1,
  });
};

export const deleteValue = (scss: (msg: string) => void) => {
  return useMutation({
    mutationFn: (data: any) =>
      new ApiClient<any, DeleteValueRes>("/values").delete({}, data.id),
    mutationKey: ["values"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};

export const createValue = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, CreateValueRes>("/values");
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["values"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};

export const editValue = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, CreateValueRes>("/values");
  return useMutation({
    mutationFn: (data: any) => endpoint.put(data, data.id),
    mutationKey: ["values"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};
