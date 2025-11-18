"use client";
import { Button } from "@/components/Button";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const title = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const button = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!title.current || !desc.current || !button.current) return;
    const tl = gsap.timeline();
    const spans = title.current.querySelectorAll("span");
    if (spans) {
      tl.to(spans, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      });
      tl.to(title.current, {
        y: 0,
      });
      tl.to(
        desc.current,
        {
          y: 0,
          opacity: 1,
        },
        "<"
      );
      tl.to(button.current, {
        y: 0,
        x: 0,
        opacity: 1,
      });
    }
  }, []);
  return (
    <section className="hero h-[calc(100vh-100px)] bg-black text-white">
      <div className="bg absolute top-0 left-0 w-full md:w-[55%] bg-[#2b2b2b] h-full z-0 rounded-br-[200px]"></div>
      <div className="container gap-10 h-full flex items-center relative z-[1] text-onBackground">
        <div className="content w-full md:w-[50%] relative z-[1] text-center sm:text-left">
          <h1
            className="text-5xl mb-6 [&_span]:inline-block [&_span]:translate-y-[50px] [&_span]:opacity-0 translate-y-[50px]"
            ref={title}
          >
            <span>Our</span> <span>Services</span>
          </h1>
          <p
            className="mb-8 w-full md:w-[600px] text-2xl font-light translate-y-[100px] opacity-0"
            ref={desc}
          >
            At Beez Production, we offer a full range of services designed to
            amplify your brand’s presences
          </p>
          <div className="button -translate-x-[100px] opacity-0" ref={button}>
            <Link href={"/services"}>
              <Button
                content="Contact us"
                classes="border-[#69696970] min-h-[55px] border-1 pl-6 rounded-xl"
                iconClasses="bg-[#2b2b2b] h-full rounded-lg"
              />
            </Link>
          </div>
        </div>
        <div className="image hidden md:inline-block relative z-0 flex-1">
          <div className="image rounded-br-[75px] rounded-tl-[75px] overflow-hidden relative">
            <div className="layer absolute top-0 left-0 w-full h-full bg-black opacity-60 lg:hidden"></div>
            <Image
              src={"/services/heroImage.png"}
              width={1000}
              height={1000}
              alt="heroImage"
              className="w-[410px] h-[600px] rounded-br-[75px] rounded-tl-[75px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
