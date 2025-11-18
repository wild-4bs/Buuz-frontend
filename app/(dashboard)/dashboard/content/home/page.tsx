import { Content } from "./components/Content";
import { PortfolioProjects } from "./components/PortoflioProjects";
import { Services } from "./components/Services";
import { TextUpdaters } from "./components/TextUpdaters";

export default function page() {
  return (
    <>
      <div className="page p-4 bg-white m-2 shadow rounded-2xl">
        <Content />
        <PortfolioProjects />
        <TextUpdaters />
        <Services />
      </div>
    </>
  );
}
