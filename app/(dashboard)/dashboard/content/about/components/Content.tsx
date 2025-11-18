"use client";
import { useUpdateAboutPageContent } from "@/services/pages";
import { useMainStore } from "@/stores/main";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "./Textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image, PlusIcon, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Images } from "./Images";

interface Value {
  title: string;
  description: string;
}

export const Content = () => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [texts, setTexts] = useState({});
  const [values, setValues] = useState<Value[]>([]);
  const [initText, setInitText] = useState<any>(null);
  const [valuesOpen, setValuesOpen] = useState(false);

  useEffect(() => {
    if (pageContent && pageContent?.about) {
      setValues(pageContent?.about?.our_values as Value[]);
      const newTexts = Object.fromEntries(
        Object.entries(pageContent?.about).filter(
          ([_, value]) => typeof value === "string"
        )
      );
      setTexts(newTexts);
      if (!initText) {
        setInitText(newTexts);
      }
    }
  }, [pageContent]);

  const { mutate, isPending, error } = useUpdateAboutPageContent((data) => {
    setPageContent(data.updated_data);
    setValuesOpen(false);
    toast.success(data.message);
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const newValues = [...values];
    const data = {
      title: (form.get("title") || "") as string,
      description: (form.get("description") || "") as string,
    };
    newValues.push(data);
    const newPageContent = {
      ...pageContent,
      about: {
        ...pageContent?.about,
        our_values: newValues,
      },
    };
    mutate({ pageContent: newPageContent });
  };
  const hanldeDelete = (i: number) => {
    const newValues = [...values];
    newValues.splice(i, 1);
    const newPageContent = {
      ...pageContent,
      about: { ...pageContent?.about, our_values: newValues },
    };
    mutate({ pageContent: newPageContent });
  };
  return (
    <>
      <div className="header flex items-center justify-between">
        <h1 className="text-xl font-bold">About page content</h1>
      </div>
      <div className="textUpdaters mt-12">
        <div className="header flex items-center justify-between mb-4">
          <h1 className="font-bold">Page Text Content</h1>
          <Button
            disabled={initText == texts || isPending}
            className="cursor-pointer select-none"
            onClick={() => mutate({ pageContent })}
          >
            Save
          </Button>
        </div>
        <div className="texts flex gap-4 flex-wrap">
          {Object.entries(texts).map(([key, value], i: number) => {
            return (
              !key.includes("office_image") && (
                <Textarea title={key} value={value as string} key={i} />
              )
            );
          })}
          <Images />
          <div className="services mt-8 p-4 min-w-[600px] flex-[1] rounded-sm border border-gray-300">
            <div className="header mb-6 flex w-full justify-between">
              <div className="title">
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  Our Values
                </h1>
                <p className="text-gray-600 text-sm">
                  This have to be a list for the last card because it includes
                  title and description.
                </p>
              </div>
              <div className="options">
                <Dialog open={valuesOpen} onOpenChange={setValuesOpen}>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer">
                      New <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add A New Value</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => handleSubmit(e)}
                      className="mt-4 grid gap-4"
                    >
                      <div className="input grid gap-2">
                        <Label htmlFor="service-title">Title</Label>
                        <Input
                          placeholder="Value Title"
                          id="service-title"
                          name="title"
                        />
                      </div>
                      <div className="input grid gap-2">
                        <Label htmlFor="value-desc">Description</Label>
                        <textarea
                          name="description"
                          id="value-descirption"
                          className="w-full border shadow rounded-sm p-2 placeholder:text-sm min-h-[100px] max-h-[200px] resize-y"
                          placeholder="Value Description"
                        ></textarea>
                      </div>
                      <Button className="bg-darkPrimary" disabled={isPending}>
                        {isPending ? "Creating..." : "Create"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="services grid gap-2">
              {pageContent?.about?.our_values.map((value: Value, i: number) => {
                return (
                  <div
                    className="service flex gap-2 items-center justify-between p-2 border border-gray-300 rounded-sm"
                    key={i}
                  >
                    <div className="details flex items-center gap-2">
                      <div className="content">
                        <h1 className="font-bold">{value.title}</h1>
                        <p className="font-light">{value.description}</p>
                      </div>
                    </div>
                    <div className="options">
                      <Button
                        variant={"ghost"}
                        className="icon w-[40px] h-[40px] rounded-full border-transparent border flex items-center justify-center hover:border-gray-200 cursor-pointer duration-75"
                        onClick={() => hanldeDelete(i)}
                        disabled={isPending}
                      >
                        <Trash width={19} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
