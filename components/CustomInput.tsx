"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

type props = {
  type: string;
  placeholder: string;
  label: string;
  id: string;
  name?: string;
  error?: boolean;
};

export const CustomInput = ({
  type,
  placeholder,
  label,
  id,
  name,
  error,
}: props) => {
  const [value, setValue] = useState("");

  const clearPhoneNumber = (input: any) => {
    let onlyNumbers = input.replace(/\D/g, "");

    if (onlyNumbers.startsWith("0")) {
      onlyNumbers = onlyNumbers.substring(1);
    }

    return onlyNumbers;
  };

  useEffect(() => {
    if (value == "") return;
    if (type == "phoneNumber") {
      setValue((prev) => clearPhoneNumber(prev));
    }
  }, [value]);
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
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onInput={(e: any) => setValue(e.target.value)}
        name={name}
        className={clsx(
          "py-2 font-light bg-none border-0 border-b-2 border-b-[#D0D0D0]",
          {
            "border-b-red-400 placeholder:text-red-500": error,
          }
        )}
      />
    </div>
  );
};
