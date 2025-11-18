import ApiClient from "@/lib/apiClient";
import { deleteClientRes, GetClientsRes } from "@/types/clients";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getClients = (params: {}) => {
  const endpoint = new ApiClient<any, GetClientsRes>("/clients");
  return useQuery({
    queryKey: ["clients", params],
    queryFn: endpoint.get,
    meta: { params: { ...params } },
    retry: false
  });
};

export const deleteClient = (scss: (msg: string) => void) => {
  return useMutation({
    mutationFn: (data: any) =>
      new ApiClient<any, deleteClientRes>(`/clients/${data.id}`).delete(),
    mutationKey: ["clients"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};

export const addClient = (scss: (msg: string) => void) => {
  return useMutation({
    mutationFn: new ApiClient<any, { message: string }>("/clients").post,
    mutationKey: ["clients"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};
