"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Portfolio = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/portfolio/first");
  }, []);
  return null;
};
export default Portfolio;
