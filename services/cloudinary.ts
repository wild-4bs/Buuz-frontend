import ApiClient from "@/lib/apiClient";
import {
  CloudinaryImageDeleteResponse,
  CloudinaryImageUploadResponse,
} from "@/types/cloudinary";
import { useMutation } from "@tanstack/react-query";

export const useUploadToCloudinary = (
  scss: (res: CloudinaryImageUploadResponse) => void
) => {
  const endpoint = new ApiClient<any, CloudinaryImageUploadResponse>(
    "/cloudinary/upload"
  );
  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: (res) => {
      scss(res);
    },
  });
};

export const useDeleteFromCloudinarys = (
  scss: (res: CloudinaryImageDeleteResponse) => void
) => {
  return useMutation({
    mutationFn: (data: { public_id: string }) =>
      new ApiClient<any, CloudinaryImageDeleteResponse>(
        `/cloudinary?id=${data?.public_id}`
      ).delete(),
    onSuccess: (res) => {
      scss(res);
    },
  });
};
