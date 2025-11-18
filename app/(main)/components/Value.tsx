"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getValues } from "@/services/values";
import clsx from "clsx";
import { ScrollTrigger } from "gsap/all";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export const ValueEl = () => {
  const { data, isFetching, error } = getValues({});
  const [values, setValues] = useState([] as any);

  useEffect(() => {
    if (data?.payload) {
      const activeValues = data?.payload.map((e, i: number) =>
        i == 0 ? { ...e, active: true } : { ...e, active: false }
      );
      setValues(activeValues);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    }
  }, [data]);

  const setActiveValue = (i: number) => {
    if (!data?.payload) return;
    const cloneValues = [...values];
    cloneValues.forEach((value) => {
      value.active = false;
    });
    cloneValues[i].active = true;
    setValues(cloneValues);
  };

  const content = values.find((v: any) => v.active)?.description;
  return (
    <section className="value py-16 bg-gray-100">
      <div className="container">
        <ul className="values flex overflow-auto relative">
          {(isFetching || !data || error) && (
            <li className="border-b-4 relative select-none z-[1] border-transparent py-6 px-12 font-light cursor-pointer hover:bg-gray-200 transition-all duration-200 text-gray-500 text-xl capitalize">
              <Skeleton className="w-[100px] h-[50px] bg-gray-300" />
            </li>
          )}
          {!isFetching &&
            values?.map((value: any, i: number) => {
              return (
                <li
                  key={i}
                  onClick={() => setActiveValue(i)}
                  className={clsx(
                    "border-b-4 relative select-none z-[1] border-transparent py-6 px-12 font-light cursor-pointer hover:bg-gray-200 transition-all duration-200 text-gray-500 text-xl capitalize",
                    {
                      "border-b-darkPrimary": value.active,
                    }
                  )}
                >
                  <h2
                    className={clsx({
                      "font-bold text-black": value.active,
                    })}
                  >
                    {value.title}
                  </h2>
                </li>
              );
            })}
          <div className="line absolute bottom-0 z-[0] left-0 w-full h-[3px] bg-gray-300"></div>
        </ul>
        <div className="content py-8 font-bold text-xl">
          <p>{!isFetching && content}</p>
          {isFetching && <Skeleton className="w-[full] h-[30px] bg-gray-300" />}
        </div>
      </div>
    </section>
  );
};
