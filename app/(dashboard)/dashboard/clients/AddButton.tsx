"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateImageFile } from "@/helpers/image";
import { queryClient } from "@/providers/QueryProvider";
import { useCreatePortfolio } from "@/services/portfolios";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const AddButton = () => {
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSetImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunc: (val: string) => void
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      validateImageFile(file, (msg, src) => {
        toast.message(msg);
        setFunc(src || "");
      });
    }
  };

  const {
    mutate: createPortfolio,
    error,
    isPending: creatingPortfolio,
  }: {
    mutate: (data: FormData) => void;
    error: any;
    isPending: boolean;
  } = useCreatePortfolio((msg: string) => {
    toast.success(msg);
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["portfolios"] });
  });

  useEffect(() => {
    if (!dialogOpen) {
      setImage("");
      setLogo("");
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (error && !error?.fieldErrors) {
      toast.error(error?.message);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    createPortfolio(form);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>Add New Client</DialogTitle>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                placeholder="Client name"
                name="name"
                className={clsx({
                  "border-destructive": error?.fieldErrors?.name,
                })}
              />
            </div>
            {error?.fieldErrors?.name && (
              <span className="inline-block text-xs text-destructive">
                {error?.fieldErrors?.name}
              </span>
            )}
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label>Caption</Label>
              <textarea
                name="description"
                className={clsx(
                  "border border-gray-200 text-sm placeholder:text-sm px-3 py-2 shadow-sm rounded-md resize-y min-h-[60px] max-h-[100px]",
                  {
                    "!border-destructive": error?.fieldErrors?.description,
                  }
                )}
                placeholder="Client caption"
              ></textarea>
              {error?.fieldErrors?.description && (
                <span className="inline-block text-xs text-destructive">
                  {error?.fieldErrors?.description[0]}
                </span>
              )}
            </div>
            {error?.fieldErrors?.description && (
              <span className="inline-block text-xs text-destructive">
                {error?.fieldErrors?.description}
              </span>
            )}
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label htmlFor="logo-input">Logo</Label>
              <Input
                placeholder="Client image"
                id="logo-input"
                type="file"
                onChange={(e) => handleSetImage(e, setLogo)}
                name="logo"
                className={clsx("cursor-pointer", {
                  "border-destructive": error?.fieldErrors?.logo,
                })}
              />
            </div>
            {logo && (
              <Image
                src={logo}
                width={300}
                height={300}
                alt="Client logo"
                className={clsx(
                  "w-full border border-transparent mt-2 object-cover rounded-lg max-h-[300px]",
                  {
                    "border-destructive": error?.fieldErrors?.logo,
                  }
                )}
              />
            )}
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label htmlFor="image-input">Image</Label>
              <Input
                placeholder="Portfolio image"
                id="image-input"
                type="file"
                onChange={(e) => handleSetImage(e, setImage)}
                name="image"
                className={clsx("cursor-pointer", {
                  "border-destructive": error?.fieldErrors?.image,
                })}
              />
            </div>
            {image && (
              <Image
                src={image}
                width={300}
                height={300}
                alt="portfolio image"
                className={clsx(
                  "w-full border border-transparent h-[300px] mt-2 object-cover rounded-lg max-h-[300px]",
                  {
                    "border-destructive": error?.fieldErrors?.image,
                  }
                )}
              />
            )}
          </div>
          <div className="submit">
            <Button disabled={creatingPortfolio} className="w-full">
              {creatingPortfolio ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
