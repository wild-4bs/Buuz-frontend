"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/providers/QueryProvider";
import { editValue } from "@/services/values";
import { Value } from "@/types/values";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";

export const Edit = ({ value }: { value: Value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, error, isPending }: any = editValue((msg: string) => {
    setIsOpen(false);
    toast.success(msg);
    queryClient.invalidateQueries({ queryKey: ["values"] });
  });

  const handleEdit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get("title");
    const description = form.get("description");
    const data = {
      ...(title && { title }),
      ...(description && { description }),
      id: value._id,
    };
    mutate(data);
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full border-gray-300 text-xs h-[30px] cursor-pointer"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit Value</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEdit} className="grid gap-4">
          <div className="input">
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input
              placeholder="Quality, Creativity..."
              name="title"
              id="title"
              defaultValue={value.title}
              className={clsx(" placeholder:font-light", {
                "border-red-300 border placeholder:text-red-500":
                  error?.fieldErrors?.title,
              })}
            />
            {error?.fieldErrors?.title && (
              <span className="text-red-400 text-sm ml-1">
                {error?.fieldErrors?.title}
              </span>
            )}
          </div>
          <div className="input">
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <textarea
              placeholder="Quality, Creativity..."
              name="description"
              id="description"
              defaultValue={value.description}
              className={clsx(
                "border border-gray-200 w-full p-2 rounded-sm shadow-xs h-[100px] max-h-[200px] min-h-[50px] placeholder:font-light",
                {
                  "border-red-300 border placeholder:text-red-500":
                    error?.fieldErrors?.description,
                }
              )}
            />
            {error?.fieldErrors?.description && (
              <span className="text-red-400 text-sm ml-1">
                {error?.fieldErrors?.description}
              </span>
            )}
          </div>
          <Button disabled={isPending}>
            {isPending ? "Editing..." : "Edit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
