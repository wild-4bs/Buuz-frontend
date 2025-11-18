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
import { useDeleteEmployee, useUpdateEmployee } from "@/services/employees";
import { Employee as EmployeeType } from "@/types/employees";
import clsx from "clsx";
import { Pencil, TrashIcon, GripVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Employee = ({ employee }: { employee: EmployeeType }) => {
  const [image, setImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // DND setup
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: employee._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const { mutate: deleteEmployee, isPending: deleting } = useDeleteEmployee(
    (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  );

  const {
    mutate: updateEmployee,
    isPending: updating,
    error: updateError,
  } = useUpdateEmployee((msg) => {
    toast.success(msg);
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }, employee?._id) as {
    mutate: (data: FormData) => void;
    isPending: boolean;
    error: any;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    updateEmployee(formData);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="employee flex-[1] max-w-[270px] min-w-[270px] w-[270px] border overflow-hidden border-gray-100 shadow-sm rounded-sm relative"
    >
      <div className="options flex gap-2 absolute top-2 right-2">
        {/* Drag handle */}
        <Button
          variant="outline"
          size="sm"
          className="w-[30px] h-[30px] cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </Button>

        <Button
          variant={"outline"}
          size={"sm"}
          className="w-[30px] h-[30px] hover:bg-red-400 hover:border-destructive hover:text-white"
          disabled={deleting}
          onClick={() => deleteEmployee({ id: employee._id })}
        >
          <TrashIcon />
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className="w-[30px] h-[30px] hover:bg-primary/90 hover:border-primary hover:text-white"
            >
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Update Employee</DialogTitle>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="input">
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="Employee name"
                    name="name"
                    className={clsx({
                      "border-destructive": updateError?.fieldsError?.name,
                    })}
                    defaultValue={employee?.name}
                  />
                </div>
                {updateError?.fieldsError?.name && (
                  <span className="inline-block text-xs text-destructive">
                    {updateError?.fieldsError?.name}
                  </span>
                )}
              </div>
              {/* Position */}
              <div className="input">
                <div className="flex flex-col gap-2">
                  <Label>Position</Label>
                  <Input
                    placeholder="Employee position"
                    name="position"
                    className={clsx({
                      "border-destructive": updateError?.fieldsError?.position,
                    })}
                    defaultValue={employee?.position}
                  />
                </div>
                {updateError?.fieldsError?.position && (
                  <span className="inline-block text-xs text-destructive">
                    {updateError?.fieldsError?.position}
                  </span>
                )}
              </div>
              {/* Image */}
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
                      "border-destructive": updateError?.fieldsError?.image,
                    })}
                  />
                </div>
                {(image || employee?.image) && (
                  <Image
                    src={image || employee?.image}
                    width={300}
                    height={300}
                    alt="employee image"
                    className={clsx(
                      "w-full border border-transparent h-[300px] mt-2 object-cover rounded-lg max-h-[300px]",
                      {
                        "border-destructive": updateError?.fieldsError?.image,
                      }
                    )}
                  />
                )}
              </div>
              <div className="submit">
                <Button disabled={updating} className="w-full">
                  {updating ? "Editing..." : "Edit"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="image">
        <img
          src={employee?.image}
          className="w-full object-cover h-[300px]"
          alt="Employee image"
        />
      </div>
      <div className="name-position px-3 py-2">
        <h1 className="font-bold text-xl">{employee?.name}</h1>
        <p className="font-medium text-sm text-gray-800">
          {employee?.position}
        </p>
      </div>
    </div>
  );
};
