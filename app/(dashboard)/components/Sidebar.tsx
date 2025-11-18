"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/sidebar.module.scss";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardEdit,
  File,
  MessageCircle,
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const mainLinksGroup = [
    {
      name: "Projects",
      path: "/dashboard/",
      icon: <ClipboardEdit width={18} />,
    },
    // {
    //   name: "Values",
    //   path: "/dashboard/values/",
    //   icon: <BadgeCheck width={18} />,
    // },
    {
      name: "Messages",
      path: "/dashboard/messages/",
      icon: <MessageCircle width={18} />,
    },
    {
      name: "Employees",
      path: "/dashboard/employees/",
      icon: <Briefcase width={18} />,
    },
    {
      name: "Clients",
      path: "/dashboard/clients/",
      icon: <Building2 width={18} />,
    },
  ];
  const pagesLinks = [
    {
      name: "Home",
      path: "/dashboard/content/home/",
      icon: <File width={18} />,
    },
    {
      name: "About",
      path: "/dashboard/content/about/",
      icon: <File width={18} />,
    },
  ];
  return (
    <aside
      className={twMerge(
        "w-full h-[100vh] bg-white sticky left-0 top-0 border-r border-r-gray-300",
        styles.sidebar
      )}
      style={{ gridArea: "sidebar" }}
    >
      <div className="logo w-full h-[60px] border-b border-b-gray-300 flex items-center px-2">
        <Image alt="logo" src={"/dashboard/logo.png"} width={120} height={50} />
      </div>
      <ul className="groupLinks mt-4">
        <div className="mainLinks">
          <span className="px-4 py-2 inline-block font-light text-sm text-gray-900">
            Main
          </span>
          {mainLinksGroup.map((link, i: number) => {
            return (
              <li key={i} className="w-full pl-4 mb-2">
                <Link
                  href={link.path}
                  className={clsx(
                    "flex items-center gap-2 w-[90%] text-sm rounded-sm p-2",
                    styles.link,
                    {
                      [styles.active]: pathname == link.path,
                    }
                  )}
                >
                  <div className="icon">{link.icon}</div>
                  <div className="value">{link.name}</div>
                </Link>
              </li>
            );
          })}
        </div>
        <span className="px-4 py-2 inline-block font-light text-sm text-gray-900">
          Pages
        </span>
        {pagesLinks.map((link, i: number) => {
          return (
            <li key={i} className="w-full pl-8 mb-2">
              <Link
                href={link.path}
                className={clsx(
                  "flex items-center gap-2 w-[90%] rounded-sm p-2 text-sm",
                  styles.link,
                  {
                    [styles.active]: pathname == link.path,
                  }
                )}
              >
                <div className="icon">{link.icon}</div>
                <div className="value">{link.name}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
