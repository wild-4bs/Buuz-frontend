"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateImageFile } from "@/helpers/image";
import {
  useDeleteFromCloudinarys,
  useUploadToCloudinary,
} from "@/services/cloudinary";
import { useUpdateAboutPageContent } from "@/services/pages";
import { useMainStore } from "@/stores/main";
import { Image as ImageIcon, SaveIcon } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Images = () => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [image2, setImage2] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image2PublicId, setImage2PublicId] = useState("");

  const [image1, setImage1] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image1PublicId, setImage1PublicId] = useState("");

  const handleSetImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunc: (val: string) => void
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      validateImageFile(file, (msg, src) => {
        setFunc(src || "");
      });
    }
  };

  const {
    mutate: updateAboutPageContent,
    isPending,
    error,
  } = useUpdateAboutPageContent((data) => {
    setPageContent(data.updated_data);
    toast.success(data.message);
  });

  useEffect(() => {
    if (pageContent?.about) {
      setImage1Url(pageContent?.about?.office_image_1);
      setImage1PublicId(pageContent?.about?.office_image_1_public_id);
      setImage2Url(pageContent?.about?.office_image_1);
      setImage2PublicId(pageContent?.about?.office_image_1_public_id);
    }
  }, [pageContent]);

  const image1Input = useRef<HTMLInputElement>(null);
  const image2Input = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending: uploadingImage } = useUploadToCloudinary(
    (res) => {
      toast.success("Image saved successfully.");
    }
  );
  const { mutate: deleteImage, isPending: isDeletingImage } =
    useDeleteFromCloudinarys((res) => {
      toast.success("Image saved successfully.");
    });

  const saveImage2 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const office_image_2_public_id =
      pageContent?.about?.office_image_2_public_id;
    if (
      office_image_2_public_id &&
      office_image_2_public_id != image2PublicId
    ) {
      deleteImage(pageContent?.about?.office_image_2_public_id);
    }

    const formData = new FormData(e.target as HTMLFormElement);
    mutateAsync(formData).then((res) => {
      setImage2Url(res.secure_url);
      setImage2PublicId(res.public_id);
      setImage2("");
      const newPageContent = {
        ...pageContent,
        about: {
          ...pageContent?.about,
          office_image_2: res.secure_url,
          office_image_2_public_id: res.public_id,
        },
      };
      updateAboutPageContent({ pageContent: newPageContent });
    });
  };

  const saveImage1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const office_image_1_public_id =
      pageContent?.about?.office_image_1_public_id;
    if (
      office_image_1_public_id &&
      office_image_1_public_id != image1PublicId
    ) {
      deleteImage(pageContent?.about?.office_image_1_public_id);
    }
    const formData = new FormData(e.target as HTMLFormElement);
    mutateAsync(formData).then((res) => {
      setImage1Url(res.secure_url);
      setImage1PublicId(res.public_id);
      setImage1("");
      const newPageContent = {
        ...pageContent,
        about: {
          ...pageContent?.about,
          office_image_1: res.secure_url,
          office_image_1_public_id: res.public_id,
        },
      };
      updateAboutPageContent({ pageContent: newPageContent });
    });
  };
  return (
    <div className="images w-full">
      <h1 className="mb-1">Our Dubai Office Images</h1>
      <div className="images flex gap-4">
        <div className="image w-full md:w-[calc(50%-1rem)] relative flex items-center justify-center min-w-xl h-[400px] border-2 border-dotted">
          <form onSubmit={saveImage1}>
            <Input
              type="file"
              ref={image1Input}
              className="hidden"
              name="image"
              onChange={(e) => handleSetImage(e, setImage1)}
            />
            {(image1 || pageContent?.about?.office_image_1) && (
              <Image
                src={image1 || pageContent?.about?.office_image_1}
                fill
                alt="image"
                className="object-cover z-0"
              />
            )}
            {image1 ? (
              <Button
                className="z-10 relative"
                type="submit"
                disabled={isPending || uploadingImage}
              >
                <SaveIcon />{" "}
                {isPending || uploadingImage ? "Saving..." : "Save"}
              </Button>
            ) : (
              <Button
                variant={"outline"}
                onClick={() => image1Input?.current?.click()}
                className="z-10 relative"
                type="button"
              >
                <ImageIcon /> Click to upload
              </Button>
            )}
          </form>
        </div>
        <div className="image w-full md:w-[calc(50%-1rem)] relative flex items-center justify-center min-w-xl h-[400px] border-2 border-dotted">
          <form onSubmit={saveImage2}>
            <Input
              type="file"
              ref={image2Input}
              className="hidden"
              name="image"
              onChange={(e) => handleSetImage(e, setImage2)}
            />
            {(image2 || pageContent?.about?.office_image_2) && (
              <Image
                src={image2 || pageContent?.about?.office_image_2}
                fill
                alt="image"
                className="object-cover z-0"
              />
            )}
            {image2 ? (
              <Button
                className="z-10 relative"
                type="submit"
                disabled={isPending || uploadingImage}
              >
                <SaveIcon />{" "}
                {isPending || uploadingImage ? "Saving..." : "Save"}
              </Button>
            ) : (
              <Button
                variant={"outline"}
                onClick={() => image2Input?.current?.click()}
                className="z-10 relative"
                type="button"
              >
                <ImageIcon /> Click to upload
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
