"use client";
import { useGetPortfolio } from "@/services/portfolios";
import { useParams } from "next/navigation";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";

export const Content = () => {
  const { id } = useParams();
  const stringId = Array.isArray(id) ? id[0] : id ?? "";
  const { data: portfolio, isFetching } = useGetPortfolio(stringId);
  return (
    <>
      <Hero image={portfolio?.payload?.image} name={portfolio?.payload?.name} />
      <About
        about={portfolio?.payload?.description}
        name={portfolio?.payload?.name}
      />
      <Projects projects={portfolio?.payload?.projects} />
    </>
  );
};
