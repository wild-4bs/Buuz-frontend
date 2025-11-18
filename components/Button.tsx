import ButtonArrow from "@/assets/icons/button-arrow.svg";
import { twMerge } from "tailwind-merge";

export const Button = ({
  classes,
  iconClasses,
  content,
}: {
  classes?: string;
  content: string;
  iconClasses?: string;
}) => {
  return (
    <button
      className={twMerge(
        "py-1 cursor-pointer pl-4 self-end pr-1 border-2 font-light rounded-full flex items-center gap-4 hover:[&_div]:px-4 hover:[&_div]:bg-darkPrimary hover:[&_div]:opacity-100",
        classes
      )}
    >
      <span>{content}</span>
      <div
        className={twMerge(
          "icon py-3 px-6 rounded-full transition-all duration-200 opacity-70",
          iconClasses
        )}
      >
        <ButtonArrow className="scale-125" />
      </div>
    </button>
  );
};
