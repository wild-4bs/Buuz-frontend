import Logo from "@/assets/logo.svg";
import EmailIcon from "@/assets/icons/email.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import CursorIcon from "@/assets/icons/cursor.svg";
import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "./SocialLinks";

export const Footer = () => {
  return (
    <footer className="bg-primary text-onPrimary pt-14 pb-4 z-10 relative">
      <div className="container flex flex-col md:flex-row gap-6 justify-between">
        <div className="contactInfo">
          <div className="title">
            <h1 className="flex items-center font-bold mb-6 text-6xl gap-4">
              <span>Let’s</span> <Logo className="w-[160px]" />
            </h1>
            <p className="text-xl md:text-2xl font-extralight w-full md:w-[90%] italic">
              Ready to create the buzz your brand needs? Let's talk!
            </p>
          </div>
          <div className="content flex flex-col gap-6 mt-8">
            <div className="label-value flex items-center gap-4">
              <EmailIcon />
              <span>info@beez-production.com</span>
            </div>
            <div className="label-value flex items-center gap-4">
              <PhoneIcon />
              <span>+964 782 433 3323</span>
            </div>
            <div className="label-value flex items-center gap-4">
              <CursorIcon />
              <span>Baghdad, Al-Mansour</span>
            </div>
            <SocialLinks />
          </div>
        </div>
        <ul className="links flex-1 w-full min-w-fit">
          <h1 className="font-[900] mb-6 text-2xl">
            <Link href={"/"}>Home</Link>
          </h1>
          <div className="content flex flex-col gap-4">
            <li className="font-[500] text-2xl">
              <Link href={"/about"}>About us</Link>
            </li>
            <li className="font-[500] text-2xl">
              <Link href={"/services"}>Our services</Link>
            </li>
            <li className="font-[500] text-2xl">
              <Link href={"/portfolio"}>Portfolio</Link>
            </li>
            <li className="font-[500] text-2xl">
              <Link href={"/#our-clients"}>Our clients</Link>
            </li>
            <li className="font-[500] text-2xl">
              <Link href={"/contact-us"}>Contact us</Link>
            </li>
          </div>
        </ul>
        <div className="watermark w-[300px] -translate-y-12 hidden md:inline-block">
          <Image
            src={"/watermark.png"}
            width={1000}
            height={1000}
            alt="watermark"
          />
        </div>
      </div>
      <div className="copyright mt-16">
        <p className="font-light text-sm text-center">
          Copyright 2025.{" "}
          <b>
            <Link
              href={"https://www.instagram.com/malamihnet/"}
              target="_blank"
              className="hover:underline"
            >
              Malamih.net
            </Link>
          </b>{" "}
          All rights reserved
        </p>
      </div>
    </footer>
  );
};
