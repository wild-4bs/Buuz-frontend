"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

type props = {
  placeholder: string;
  label: string;
  id: string;
  error: boolean;
  name: string;
};

export const CustomTextarea = ({
  placeholder,
  label,
  id,
  name,
  error,
}: props) => {
  return (
    <div className="input w-full flex flex-col">
      <label
        htmlFor={id}
        className={clsx("text-xl mb-1 capitalize", {
          // "text-red-400": error,
        })}
      >
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className={clsx(
          "py-2 min-h-[100px] max-h-[300px] resize-y font-light bg-none border-0 border-b-2 border-b-[#D0D0D0]",
          {
            "border-b-red-400 placeholder:text-red-400": error,
          }
        )}
        name={name}
      />
    </div>
  );
};
