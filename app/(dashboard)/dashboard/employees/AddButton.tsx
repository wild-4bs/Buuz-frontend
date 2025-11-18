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
import { useCreateEmployee } from "@/services/employees";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const AddButton = () => {
  const [image, setImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      validateImageFile(file, (msg, src) => {
        toast.message(msg);
        setImage(src || "");
      });
    }
  };

  const {
    mutate: createEmployee,
    error,
    isPending: createEmployeePending,
  }: {
    mutate: (data: FormData) => void;
    error: any;
    isPending: boolean;
  } = useCreateEmployee((msg: string) => {
    toast.success(msg);
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  });

  useEffect(() => {
    if (!dialogOpen) {
      setImage("");
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
    createEmployee(form);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>Add New Employee</DialogTitle>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                placeholder="Employee name"
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
              <Label>Position</Label>
              <Input
                placeholder="Employee position"
                name="position"
                className={clsx({
                  "border-destructive": error?.fieldErrors?.position,
                })}
              />
            </div>
            {error?.fieldErrors?.position && (
              <span className="inline-block text-xs text-destructive">
                {error?.fieldErrors?.position}
              </span>
            )}
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label htmlFor="image-input">Image</Label>
              <Input
                placeholder="Employee image"
                id="image-input"
                type="file"
                onChange={handleSetImage}
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
                alt="employee image"
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
            <Button disabled={createEmployeePending} className="w-full">
              {createEmployeePending ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
