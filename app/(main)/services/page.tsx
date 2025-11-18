import { OurClients } from "../components/OurClients";
import { Projects } from "../components/Projects";
import { Services } from "../components/Services";
import { ValueEl } from "../components/Value";
import { Hero } from "./components/Hero";

const ServicesPage = () => {
  return (
    <>
      <Hero />
      <Services classes="bg-black text-white" title={false} />
      <Projects />
    </>
  );
};

export default ServicesPage;
