import InstagramIcon from "@/assets/icons/instagram.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import VimeoIcon from "@/assets/icons/vimeo.svg";
import Link from "next/link";

export const SocialLinks = () => {
  const links = [
    {
      name: "vimeo",
      link: "https://vimeo.com/user230152930",
      icon: <VimeoIcon />,
    },
    {
      name: "facebook",
      link: "https://m.facebook.com/profile.php?id=61563601364048&mibextid=wwXIfr",
      icon: <FacebookIcon />,
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/company/beez-iq/",
      icon: <LinkedinIcon />,
    },
    {
      name: "instagram",
      link: "http://instagram.com/beeeez__/?hl=en",
      icon: <InstagramIcon />,
    },
  ];
  return (
    <div className="socialLinks flex items-center gap-2 flex-wrap">
      {links?.map((link, i: number) => {
        return (
          <Link href={link.link} target="_blank" key={i}>
            <div
              className="link w-[45px] h-[45px] flex items-center justify-center rounded-full  bg-white border border-gray-200 hover:bg-gray-200"
              key={i}
            >
              {link.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
