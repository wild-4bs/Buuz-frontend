"use client";
import { usePathname } from "next/navigation";
import ProfileIcon from "@/assets/icons/profile-icon.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoutIcon from "@/assets/icons/logout.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const pageName = pathname.split("/").pop();
  const logout = () => {
    Cookies.remove("token");
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
    }
  };
  return (
    <header
      style={{ gridArea: "header" }}
      className="h-full flex items-center justify-between px-4 pr-10 sticky top-0 left-0 bg-white border-b border-b-gray-300 z-10"
    >
      <h1>Buuz Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="profile">
          <Popover>
            <PopoverTrigger>
              <div className="profile w-[40px] h-[40px] rounded-full flex items-center justify-center border border-gray-400 hover:border-black cursor-pointer">
                <ProfileIcon />
              </div>
            </PopoverTrigger>
            <PopoverContent className="min-w-[100px] max-w-[200px] m-2 p-0 right-0 left-[unset]">
              <h1 className="px-4 text-sm py-2 border-b border-b-gray-300 text-gray-600 font-normal">
                User options
              </h1>
              <div
                className="logout flex items-center gap-1 text-sm py-2 px-3 hover:bg-gray-100 cursor-pointer select-none"
                onClick={logout}
              >
                <LogoutIcon />
                <span>Logout</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
