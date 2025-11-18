"use client";
import { Input } from "@/components/ui/input";
import { AddButton } from "./AddButton";
import { useEffect, useState } from "react";
import { Portfolio } from "./Portfolio";
import { useGetPortfolios } from "@/services/portfolios";

export const Content = () => {
  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(nameInput);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [nameInput]);

  const { data: portfoliosData, isFetching } = useGetPortfolios({ name });
  return (
    <>
      <div className="clients bg-white p-4 m-2 rounded-xl">
        <div className="header flex gap-2 justify-between">
          <Input
            placeholder="Search by name.."
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <div className="options">
            <AddButton />
          </div>
        </div>
        {portfoliosData?.payload && portfoliosData?.payload?.length < 1 && (
          <h1 className="text-center py-4 text-2xl text-gray-500">
            No Clients
          </h1>
        )}
        <div className="portfolios mt-4 flex flex-wrap gap-2">
          {portfoliosData?.payload?.map((portfolio, i: number) => {
            return <Portfolio portfolioData={portfolio} key={i} />;
          })}
        </div>
      </div>
    </>
  );
};
