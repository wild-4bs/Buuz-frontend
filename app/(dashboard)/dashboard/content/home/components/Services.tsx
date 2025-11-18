"use client";

import { useEffect, useState } from "react";
import { EnhancedIconSelector } from "./IconSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash } from "lucide-react";
import * as icons from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMainStore } from "@/stores/main";
import { useUpdateHomePageContent } from "@/services/pages";
import { toast } from "sonner";

interface Service {
  title: string;
  description: string;
  icon: string;
}
interface Feature {
  title: string;
  description: string;
}

export const Services = () => {
  const [icon, setIcon] = useState<string | null>(null);
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [services, setServices] = useState<Service[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  useEffect(() => {
    if (pageContent && pageContent.home) {
      setServices(pageContent.home.services);
      setFeatures(pageContent?.home?.features);
    }
  }, [pageContent]);

  const { mutate, isPending } = useUpdateHomePageContent((data) => {
    setPageContent(data.updated_data);
    setServicesOpen(false);
    setFeaturesOpen(false);
    setIcon("");
    toast.success(data.message);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = {
      title: (form.get("title") || "") as string,
      description: (form.get("description") || "") as string,
      icon: icon || ("" as string),
    };
    const newServices = [...services];
    newServices.push(data);
    const newPageContent = {
      ...pageContent,
      home: {
        ...pageContent?.home,
        services: newServices,
      },
    };
    mutate({ pageContent: newPageContent });
  };

  const handleFeaturesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = {
      title: (form.get("title") || "") as string,
      description: (form.get("description") || "") as string,
    };
    const newFeatures = [...features];
    newFeatures.push(data);
    const newPageContent = {
      ...pageContent,
      home: {
        ...pageContent?.home,
        features: newFeatures,
      },
    };
    mutate({ pageContent: newPageContent });
  };

  const hanldeDelete = (i: number) => {
    const newServices = [...services];
    newServices.splice(i, 1);
    const newPageContent = {
      ...pageContent,
      home: { ...pageContent?.home, services: newServices },
    };
    mutate({ pageContent: newPageContent });
  };
  const hanldeDeleteFeature = (i: number) => {
    const newFeatures = [...features];
    newFeatures.splice(i, 1);
    const newPageContent = {
      ...pageContent,
      home: { ...pageContent?.home, features: newFeatures },
    };
    mutate({ pageContent: newPageContent });
  };

  return (
    <div className="listers mt-8 flex flex-wrap justify-between gap-8">
      <div className="services w-[50%] min-w-[600px] flex-[1] p-4 rounded-sm border border-gray-300">
        <div className="header mb-6 flex w-full justify-between">
          <div className="title">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Services</h1>
            <p className="text-gray-600 text-sm">
              This will also be visible in the "Our Services" page.
            </p>
          </div>
          <div className="options">
            <Dialog open={servicesOpen} onOpenChange={setServicesOpen}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer">
                  New <PlusIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add A New Service</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="mt-4 grid gap-4"
                >
                  <div className="input grid gap-2">
                    <Label htmlFor="service-title">Title</Label>
                    <Input
                      placeholder="Service Title"
                      id="service-title"
                      name="title"
                    />
                  </div>
                  <div className="input grid gap-2">
                    <Label htmlFor="service-desc">Description</Label>
                    <textarea
                      name="description"
                      id="desc"
                      className="w-full border shadow rounded-sm p-2 placeholder:text-sm min-h-[100px] max-h-[200px] resize-y"
                      placeholder="Service Description"
                    ></textarea>
                  </div>
                  <EnhancedIconSelector
                    value={icon as string}
                    onChange={setIcon}
                    placeholder="Pick an icon"
                    showClearButton
                  />
                  <Button
                    className="bg-darkPrimary"
                    disabled={isPending || !icon}
                  >
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="services grid gap-2">
          {pageContent?.home?.services.map((service: Service, i: number) => {
            return (
              <div
                className="service flex gap-2 items-center justify-between p-2 border border-gray-300 rounded-sm"
                key={i}
              >
                <div className="details flex items-center gap-3">
                  <div className="icon min-w-[50px] min-h-[50px] rounded-full flex items-center justify-center bg-gray-100 border border-gray-200">
                    {(() => {
                      const Icon: any =
                        icons[service.icon as keyof typeof icons];
                      return Icon ? <Icon size={24} /> : null;
                    })()}
                  </div>
                  <div className="content">
                    <h1 className="font-bold">{service.title}</h1>
                    <p className="font-light">{service.description}</p>
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
      <div className="services w-[50%] min-w-[600px] flex-[1] p-4 rounded-sm border border-gray-300">
        <div className="header mb-6 flex w-full justify-between">
          <div className="title">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Features</h1>
            <p className="text-gray-600 text-sm">
              This will also be visible in the "About us" page.
            </p>
          </div>
          <div className="options">
            <Dialog open={featuresOpen} onOpenChange={setFeaturesOpen}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer">
                  New <PlusIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add A New Feature</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => handleFeaturesSubmit(e)}
                  className="mt-4 grid gap-4"
                >
                  <div className="input grid gap-2">
                    <Label htmlFor="feature-title">Title</Label>
                    <Input
                      placeholder="Feature Title"
                      id="feature-title"
                      name="title"
                    />
                  </div>
                  <div className="input grid gap-2">
                    <Label htmlFor="feature-desc">Description</Label>
                    <textarea
                      name="description"
                      id="feature-desc"
                      className="w-full border shadow rounded-sm p-2 placeholder:text-sm min-h-[100px] max-h-[200px] resize-y"
                      placeholder="Feature Description"
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
        <div className="features grid gap-2">
          {pageContent?.home?.features.map((feature: Feature, i: number) => {
            return (
              <div
                className="service flex gap-2 items-center justify-between p-2 border border-gray-300 rounded-sm"
                key={i}
              >
                <div className="details flex items-center gap-">
                  <div className="content">
                    <h1 className="font-bold">{feature.title}</h1>
                    <p className="font-light">{feature.description}</p>
                  </div>
                </div>
                <div className="options">
                  <Button
                    variant={"ghost"}
                    className="icon w-[40px] h-[40px] rounded-full border-transparent border flex items-center justify-center hover:border-gray-200 cursor-pointer duration-75"
                    onClick={() => hanldeDeleteFeature(i)}
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
  );
};
