"use client";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { Button } from "./Button";

export const Header = () => {
  return (
    <>
      <header className="bg-black h-[90px] flex items-center z-[100] sticky top-0 left-0">
        <div className="container px-0 flex items-center justify-between gap-2 py-0 h-full">
          <Sidebar />
          <div className="logo flex-1 w-full flex items-center justify-center">
            <Link href={"/"} className="">
              <Logo
                height="34px"
                className="ml-[-37px] [&_*]:transition [&_*]:duration-150 *:fill-white hover:*:fill-darkPrimary hover:*:stroke-darkPrimary w-[150px]"
              />
            </Link>
          </div>
          <div className="cta-button w-[200px] hidden md:inline-block">
            <Link href={"/contact-us"}>
              <Button
                content="Let's talk"
                classes="border-[#69696970] bg-[#2b2b2b] text-white min-h-[55px] border-1 pl-6 rounded-xl"
                iconClasses="bg-[#69696970] h-full rounded-lg"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
