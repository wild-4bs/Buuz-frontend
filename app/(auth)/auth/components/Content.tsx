"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLogin } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Content = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const success = () => {
    router.push("/dashboard");
    setIsPending(false);
  };

  const { mutate, error }: any = useLogin(success);

  const login = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    const form = new FormData(e.target);
    const userData = {
      email: form.get("email"),
      password: form.get("password"),
    };
    mutate(userData);
  };

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
    if (error && !error.fieldErrors) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      {" "}
      <div className="auth flex h-[100vh]">
        <div className="sideImage overflow-hidden flex-[0.5] h-full hidden md:inline-block">
          <Image
            src={"/auth/bg.jpg"}
            alt="background"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <form
          className="flex-[1] md:flex-[0.5] p-4 flex justify-center flex-col"
          onSubmit={login}
        >
          <div className="wrapper w-full max-w-[600px] m-auto">
            <h1 className="font-bold mb-4 text-3xl text-center">
              Login To <span className="text-darkPrimary">Malamih</span>{" "}
              Dashboard
            </h1>
            <div className="input flex flex-col gap-1 mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="border border-gray-300 p-2 font-light"
                placeholder="something@gmail.com"
                id="email"
                name="email"
              />
              {error?.fieldErrors?.email && (
                <span className="text-red-400 text-xs">
                  {error?.fieldErrors?.email}
                </span>
              )}
            </div>
            <div className="input flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper relative">
                <input
                  className="border w-full border-gray-300 p-2 font-light"
                  placeholder="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <div
                  className="icon w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer absolute top-2/4 right-[0rem] -translate-y-2/4 -translate-x-2/4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon /> : <EyeClosed />}
                </div>
              </div>
              {error?.fieldErrors?.password && (
                <span className="text-red-400 text-xs">
                  {error?.fieldErrors?.password}
                </span>
              )}
            </div>
            <Button
              disabled={isPending}
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full bg-black text-white mt-4 py-2 cursor-pointer"
            >
              {isPending ? "Please wait..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
