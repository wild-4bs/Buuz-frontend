"use client";
import { useGetEmployees } from "@/services/employees";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect } from "react";

export const Team = () => {
  const { data, isFetching } = useGetEmployees();

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    }
  }, [data]);

  // Sort employees by order
  const sortedEmployees = data?.payload
    ? [...data.payload].sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="team pb-[100px] bg-[#282828] text-white">
      <div className="container">
        <h1 className="text-3xl font-bold">The Team</h1>
        <div className="employees flex flex-wrap mt-12 gap-8">
          {sortedEmployees.map((employee, i: number) => (
            <div
              className="employee xl:w-[calc(33.33333333%-2rem)] w-full"
              key={i}
            >
              <div className="image">
                <Image
                  src={employee?.image}
                  width={300}
                  height={300}
                  alt={employee?.name}
                  className="w-full max-h-[500px] h-[500px] object-cover"
                />
              </div>
              <div className="content mt-4">
                <h1 className="font-bold text-2xl">{employee?.name}</h1>
                <h2>{employee?.position}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
