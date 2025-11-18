"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { deleteClient, getClients } from "@/services/clients";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatShortDateTime } from "@/lib/date";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useCreateService,
  useDeleteService,
  useGetServices,
} from "@/services/services";
import { queryClient } from "@/providers/QueryProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CommandList } from "cmdk";
import { cn } from "@/lib/utils";

export const Content = () => {
  const [email, setEmail] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [serviceValue, setService] = useState("all");
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const router = useRouter();

  const HandleAuthErorr = () => {
    Cookies.remove("token");
    router.push("/auth");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmail(emailInputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [emailInputValue]);

  const { data, isFetching, error, refetch } = getClients({
    email,
    ...(serviceValue == "all" ? "" : { services: serviceValue }),
  });

  const scss = (msg: string) => {
    toast.success(msg);
    refetch();
  };
  const { mutate, error: delete_error, isPending }: any = deleteClient(scss);
  useEffect(() => {
    if (delete_error || error) {
      if (delete_error.statusCode == 401) {
        HandleAuthErorr();
      }
      toast.error(delete_error?.message || error?.message);
    }
  }, [delete_error, error]);

  const {
    mutate: createService,
    isPending: isServicePending,
    error: serviceError,
  }: any = useCreateService((msg) => {
    toast.success(msg);
    setServiceDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["services"] });
  });

  useEffect(() => {
    if (serviceError) {
      toast.error(serviceError.message);
    }
  }, [serviceError]);

  const handleCreateService = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = { name: form.get("name") };
    createService(data);
  };

  const {
    data: services,
    isFetching: isFetchingServices,
    error: servicesError,
  } = useGetServices();

  const {
    mutate: deleteService,
    isPending: isServiceDeletePending,
    error: serviceDeleteError,
  } = useDeleteService((msg) => {
    toast.success(msg);
    setServiceDialogOpen(false);
    setService("");
    queryClient.invalidateQueries({ queryKey: ["services"] });
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <Input
          placeholder="Search by email..."
          className="w-full max-w-[500px]"
          value={emailInputValue}
          onInput={(e: any) => setEmailInputValue(e.target.value)}
        />
        <div className="options flex items-center gap-2">
          <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon /> New Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateService}>
                <div className="input">
                  <Label className="mb-2">Name</Label>
                  <Input
                    placeholder="Service name"
                    name="name"
                    className={clsx({
                      "border-destructive": serviceError?.fieldsError?.name,
                    })}
                  />
                </div>
                <Button className="w-full mt-4" disabled={isServicePending}>
                  Add
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={
                  isFetchingServices ||
                  (services && services?.payload?.length < 1)
                }
                variant="outline"
                role="combobox"
                aria-expanded={servicesOpen}
                className="w-[200px] justify-between"
              >
                {services?.payload?.find(
                  (service) => service.name === serviceValue
                )?.name
                  ? serviceValue
                  : "Select Type..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] px-3 py-2">
              <Command>
                <CommandInput placeholder="Search Types..." />
                <CommandList className="mt-2">
                  <CommandEmpty>No types found</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      className="capitalize cursor-pointer"
                      key={"all"}
                      value={"all"}
                      onSelect={(currentValue) => {
                        setService(
                          currentValue === serviceValue ? "" : currentValue
                        );
                        setServiceDialogOpen(false);
                      }}
                    >
                      <div className="content flex-[1] flex gap-2">
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            serviceValue == "all" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        All
                      </div>
                    </CommandItem>
                    {services?.payload?.map((service, i: number) => {
                      return (
                        <CommandItem
                          className="capitalize"
                          key={service.name}
                          value={service.name}
                          onSelect={(currentValue) => {
                            setService(
                              currentValue === serviceValue ? "" : currentValue
                            );
                            setServiceDialogOpen(false);
                          }}
                        >
                          <div className="content flex-[1] flex gap-2">
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                serviceValue == service?.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {service.name}
                          </div>
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            className="w-6 h-6"
                            onClick={() => deleteService({ id: service._id })}
                          >
                            <TrashIcon />
                          </Button>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      {data?.payload?.length == 0 && (
        <span className="text-center text-xl text-gray-400 w-full inline-block py-8">
          No Messages
        </span>
      )}
      <div className="clients mt-4 flex flex-wrap gap-4">
        {data?.payload?.map((client, i: number) => {
          return (
            <div
              className="client w-full flex flex-col md:w-[calc(50%-1rem)] px-4 py-2 rounded-lg border border-gray-300"
              key={i}
            >
              <header className="mb-4 flex justify-between gap-6">
                <div className="title w-full">
                  <h1 className="text-lg font-medium leading-5 flex items-center justify-between w-full gap-2">
                    {client.name}
                    <span className="text-s mt-2 text-gray-600 font-light">
                      {client.phone_number}
                    </span>
                  </h1>
                  <p className="text-sm font-light">
                    {client.email} |{" "}
                    {formatShortDateTime(
                      new Date(client.createdAt).toISOString()
                    )}
                  </p>
                </div>
                <Button
                  className="w-[30px] h-[30px] cursor-pointer"
                  variant={"outline"}
                  disabled={isPending}
                  onClick={() => mutate({ id: client._id })}
                  aria-disabled={isServiceDeletePending}
                >
                  <Trash2Icon />
                </Button>
              </header>
              <div className="message-services flex flex-col flex-[1]">
                <p className="flex-[1] text-sm">{client.message}</p>
                <ul className="services mt-4 flex flex-wrap gap-4">
                  {client?.services?.map((service, i: number) => {
                    return (
                      <li
                        className="text-xs flex items-center gap-1 w-[calc(50%-1rem)]"
                        key={i}
                      >
                        <div
                          className={clsx(
                            "ball w-[10px] h-[10px] border rounded-full"
                          )}
                          style={{
                            borderColor:
                              services?.payload.find(
                                (s) => s.name === service
                              ) && "gray-50",
                          }}
                        ></div>
                        <span
                          className={clsx(
                            "capitalize py-1 px-3 rounded-full border"
                          )}
                          style={{}}
                        >
                          {service}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
