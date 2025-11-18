"use client";
import { CustomInput } from "@/components/CustomInput";
import { CustomTextarea } from "@/components/CustomTextarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CheckedIcon from "@/assets/icons/checked.svg";
import clsx from "clsx";
import { toast } from "sonner";
import { addClient } from "@/services/clients";
import DotLoader from "./Loader";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGetServices } from "@/services/services";
import { Button } from "@/components/ui/button";
import { ScrollTrigger } from "gsap/all";

interface Service {
  name: string;
  active: boolean;
}

export const ContactForm = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!title.current || !desc.current) return;
    const tl = gsap.timeline();
    tl.to(desc.current, {
      y: 0,
      x: 0,
      opacity: 1,
    });
    tl.to(title.current, {
      y: 0,
      opacity: 1,
      x: 0,
      delay: 0.5,
    });
  }, []);
  const [servicesCheckBoxes, setServicesCheckBoxes] = useState<Service[]>([]);

  const { data, isFetching } = useGetServices();

  useEffect(() => {
    if (data?.payload) {
      const servicesWithActive = data?.payload?.map((service) => {
        const newService = { name: service.name, active: false };
        return newService;
      });
      setServicesCheckBoxes(servicesWithActive);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    }
  }, [data]);

  const setActive = (value: string) => {
    const services = [...servicesCheckBoxes];
    const index = services.findIndex((service) => service.name == value);
    services[index].active = !services[index].active;
    setServicesCheckBoxes(services);
  };
  const router = useRouter();

  const scss = (msg: string) => {
    toast.success("Thanks for submiting.");
    router.push("/");
  };

  const { mutate, isPending, error }: any = addClient(scss);
  const createClient = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const services = [] as string[];
    servicesCheckBoxes.forEach((s) => {
      s.active && services.push(s.name);
    });
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      phone_number: form.get("phone_number"),
      message: form.get("message"),
      services: services,
    };
    mutate(data);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return (
    <section className="contactForm relative w-full text-onBackground bg-[#262626] lg:bg-black">
      <div className="logo z-0 absolute bottom-[-40px] left-0 w-[330px]">
        <Image src={"/darkLogo.svg"} alt="logo" width={330} height={400} />
      </div>
      <div className="container relative flex gap-4 flex-col lg:flex-row p-0">
        <div className="title lg:w-full md:min-w-[400px] p-2 pt-[100px] z-[1] relative">
          <h1
            className="font-bold mb-4 text-4xl md:text-6xl italic -translate-x-[100px] opacity-0"
            ref={title}
          >
            Let's talk!
          </h1>
          <p
            className="font-light w-full max-w-[500px] text-2xl md:text-5xl italic -translate-x-[100px] opacity-0"
            ref={desc}
          >
            Ready to create the <b>buzz</b> your brand needs?
          </p>
        </div>
        <form
          className="flex m-auto z-10 flex-col gap-4 py-12 px-4 w-full bg- p-4 text-white bg-black"
          onSubmit={createClient}
        >
          <h1 className="text-center text-4xl mb-12">Contact us</h1>
          <CustomInput
            label="Name"
            placeholder="Your Name"
            id="name"
            type="text"
            error={error?.fieldErrors?.name}
            name="name"
          />
          <CustomInput
            label="Email"
            placeholder="Your Email"
            id="email"
            type="email"
            error={error?.fieldErrors?.email}
            name="email"
          />
          <CustomInput
            label="Mobile number"
            placeholder="+964 0000000000"
            id="phone_number"
            type="phoneNumber"
            error={error?.fieldErrors?.phone_number}
            name="phone_number"
          />
          <CustomTextarea
            id="message"
            label="How can we help?"
            placeholder="Your Message..."
            error={error?.fieldErrors?.message}
            name="message"
          />
          <div className="services">
            <h1 className="text-2xl font-bold mb-6">Services</h1>
            <div className="checkBoxes flex flex-wrap gap-4">
              {servicesCheckBoxes.map((service, i: number) => {
                return (
                  <div
                    className="service cursor-pointer text-lg w-full md:w-[calc(50%-32px)] text-[#848484] font-light flex items-center gap-2"
                    key={i}
                  >
                    <label
                      htmlFor={service.name}
                      className={clsx(
                        "input relative min-w-[20px] min-h-[20px] border border-[#848484]",
                        {
                          "border-red-400": error?.fieldErrors?.services,
                        }
                      )}
                    >
                      <div
                        className={clsx(
                          "active opacity-0 absolute flex top-0  items-center justify-center left-0 w-full h-full bg-black cursor-pointer",
                          {
                            "opacity-100": service.active,
                          }
                        )}
                      >
                        <CheckedIcon className="scale-70 fill-white" />
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        onInput={() => setActive(service.name)}
                        name={service.name}
                        value={service.name}
                        id={service.name}
                      />
                    </label>
                    <label
                      htmlFor={service.name}
                      className={clsx("cursor-pointer capitalize select-none", {
                        // "text-red-400": error?.fieldErrors,
                      })}
                    >
                      {service.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            disabled={isPending}
            className="text-3xl py-4 px-4 h-[70px] hover:bg-[#262626d6] bg-[#262626] mt-4 cursor-pointer text-white rounded-xl"
          >
            {isPending ? <DotLoader /> : "Get Started"}
          </Button>
        </form>
      </div>
    </section>
  );
};
