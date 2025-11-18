import ApiClient from "@/lib/apiClient";
import {
  CreateEmployeeResponse,
  GetEmployeesResponse,
} from "@/types/employees";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetEmployees = (params?: {}) => {
  const endpoint = new ApiClient<any, GetEmployeesResponse>("/employees");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["employees", params],
    meta: { params },
    retry: false,
  });
};

export const useCreateEmployee = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, CreateEmployeeResponse>("/employees");
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: (res) => {
      scss(res.message);
    },
  });
};

export const useDeleteEmployee = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, CreateEmployeeResponse>("/employees");
  return useMutation({
    mutationFn: (data: { id: string }) => endpoint.delete({}, data.id),
    onSuccess: (res) => {
      scss(res.message);
    },
  });
};

export const useUpdateEmployee = (scss: (msg: string) => void, id: string) => {
  const endpoint = new ApiClient<any, CreateEmployeeResponse>("/employees");
  return useMutation({
    mutationFn: (data: FormData) => endpoint.put(data, id),
    onSuccess: (res) => {
      scss(res.message);
    },
  });
};

export const useUpdateEmployeesOrder = (onSuccess: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>(
    "/employees/reorder"
  );

  return useMutation({
    mutationFn: (data: { employees: { id: string; order: number }[] }) =>
      endpoint.put(data),
    onSuccess: (res) => {
      onSuccess(res.message);
    },
  });
};
