import { PortfolioProjects } from "@/app/(main)/components/PortfolioProjects";
import { Content } from "./components/Content";

export default function addProject() {
  const page = "home";
  return (
    <div className="page p-4 bg-white m-2 shadow rounded-2xl">
      <Content page={page != "home" && page != "about" ? "home" : page} />
    </div>
  );
}
