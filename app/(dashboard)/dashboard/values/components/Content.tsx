"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { createValue, deleteValue, getValues } from "@/services/values";
import clsx from "clsx";
import { MoreVertical, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit } from "./Edit";

export const Content = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInputValue]);

  const { data, isFetching, error, refetch } = getValues({ title: search });
  const {
    mutate,
    isPending,
    error: delete_error,
  } = deleteValue((msg: string) => {
    refetch();
    toast.success(msg);
  });
  const {
    mutate: create,
    isPending: creating,
    error: creating_error,
  }: any = createValue((msg: string) => {
    setIsOpen(false);
    toast.success(msg);
    refetch();
  });
  useEffect(() => {
    if (error || delete_error) {
      toast.error(error?.message || delete_error?.message);
    }
  }, [error, delete_error]);

  const handleCreate = (e: any) => {
    const form = new FormData(e.target);
    e.preventDefault();
    const data = {
      title: form.get("title"),
      description: form.get("description"),
    };
    create(data);
  };
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-xl">Total Values: {data?.payload?.length || 0}</h1>
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild>
            <Button className="h-[30px] cursor-pointer">
              <PlusIcon /> New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">New Value</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="grid gap-4">
              <div className="input">
                <Label htmlFor="title" className="mb-2">
                  Title
                </Label>
                <Input
                  placeholder="Quality, Creativity..."
                  name="title"
                  id="title"
                  className={clsx(" placeholder:font-light", {
                    "border-red-300 border placeholder:text-red-500":
                      creating_error?.fieldErrors?.title,
                  })}
                />
                {creating_error?.fieldErrors?.title && (
                  <span className="text-red-400 text-sm ml-1">
                    {creating_error?.fieldErrors?.title}
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
                  className={clsx(
                    "border border-gray-200 w-full p-2 rounded-sm shadow-xs h-[100px] max-h-[200px] min-h-[50px] placeholder:font-light",
                    {
                      "border-red-300 border placeholder:text-red-500":
                        creating_error?.fieldErrors?.description,
                    }
                  )}
                />
                {creating_error?.fieldErrors?.description && (
                  <span className="text-red-400 text-sm ml-1">
                    {creating_error?.fieldErrors?.description}
                  </span>
                )}
              </div>
              <Button disabled={creating}>
                {creating ? "Adding..." : "Add"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>
      <div className="values-table mt-4">
        <header>
          <Input
            className="w-full max-w-[400px] h-[30px]"
            placeholder="Search..."
            value={searchInputValue}
            onInput={(e: any) => setSearchInputValue(e.target.value)}
          />
        </header>
        <div className="values mt-4 flex flex-col gap-2">
          {isFetching &&
            Array.from({ length: 10 }).map((_, i: number) => (
              <div
                className="value flex justify-between px-4 py-2 border border-gray-200 rounded-lg  hover:bg-gray-50 duration-100 transition"
                key={i}
              >
                <div className="content w-full">
                  <h1 className="font-bold text-lg mb-2">
                    <Skeleton className="w-[100px] h-[30px]" />
                  </h1>
                  <Skeleton className="w-[90%] h-[20px]" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="icon min-w-[30px] self-center min-h-[30px] w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-200 transition duration-100 cursor-pointer">
                      <MoreVertical width={19} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[130px] p-2 flex flex-col gap-1 mr-8">
                    <Button
                      variant={"outline"}
                      className="w-full border-gray-300 text-xs h-[30px] cursor-pointer"
                    >
                      Edit
                    </Button>
                    <Button
                      variant={"outline"}
                      className="w-full border-gray-300 text-xs h-[30px] cursor-pointer"
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          {!isFetching && data?.payload?.length == 0 && (
            <h2 className="text-center text-gray-400 my-4 text-lg">
              No Valuse
            </h2>
          )}
          {!isFetching &&
            data?.payload
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((value, i: number) => {
                return (
                  <div
                    className="value flex justify-between px-4 py-2 border border-gray-200 rounded-lg  hover:bg-gray-50 duration-100 transition"
                    key={i}
                  >
                    <div className="content w-full">
                      <h1 className="font-bold text-lg mb-2">{value.title}</h1>
                      <p className="text-sm text-gray-500 w-[90%]">
                        {value.description}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="icon min-w-[30px] self-center min-h-[30px] w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-200 transition duration-100 cursor-pointer">
                          <MoreVertical width={19} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[130px] p-2 flex flex-col gap-1 mr-8">
                        <Edit value={value} />
                        <Button
                          variant={"outline"}
                          className="w-full border-gray-300 text-xs h-[30px] cursor-pointer"
                          onClick={() => mutate({ id: value._id })}
                          disabled={isPending}
                        >
                          {isPending ? "Deleting..." : "Delete"}
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};
