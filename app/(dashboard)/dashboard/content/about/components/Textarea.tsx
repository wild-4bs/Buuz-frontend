"use client";
import { useMainStore } from "@/stores/main";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export const Textarea = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [textValue, setTextValue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pageContent && textValue != null) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
        setPageContent({
          ...pageContent,
          about: { ...pageContent?.about, [title]: textValue },
        });
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [textValue]);
  return (
    <>
      <div className="text flex-[1] min-h-[200px] flex flex-col">
        <h1 className="capitalize text-sm flex items-center gap-2 h-[30px]">
          {title.replaceAll("_", " ")}{" "}
          {loading && <Loader className="animate-spin" width={18} />}
        </h1>
        <textarea
          className="h-full resize-y text-sm min-w-[500px] w-full mt-2  border border-gray-300 shadow rounded-sm p-2 max-h-[230px] min-h-[150px]"
          defaultValue={value as string}
          onInput={(e: any) => setTextValue(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};
