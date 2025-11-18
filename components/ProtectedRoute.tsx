"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useCheckAuth } from "@/services/auth";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { mutate, error, isPending } = useCheckAuth((msg) => {});

  useEffect(() => {
    if (error) {
      Cookies.remove("token");
      router.push("/auth");
      toast.error(error.message);
    }
    return () => {};
  }, [error]);

  useEffect(() => {
    mutate({});
  }, []);

  useEffect(() => {
    if (isPending) return;
    const token = Cookies.get("token");
    if (!token && pathname.includes("/dashboard")) {
      Cookies.remove("token");
      router.push("/auth");
      setTimeout(() => {
        setMounted(true);
      }, 400);
    } else {
      setTimeout(() => {
        setMounted(true);
      }, 400);
    }
  }, [isPending]);

  if (!mounted || isPending) return <>Loading...</>;
  return <>{children}</>;
};
