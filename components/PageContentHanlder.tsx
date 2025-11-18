"use client";

import { useGetPageContent } from "@/services/pages";
import { useMainStore } from "@/stores/main";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

export const PageContentHandler = () => {
  const { setPageContent } = useMainStore((state) => state);

  const { data, isPending, error } = useGetPageContent();
  useEffect(() => {
    if (data) {
      setPageContent(data);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    }
  }, [data]);
  return <></>;
};
