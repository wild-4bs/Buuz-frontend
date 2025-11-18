import { Projects } from "./components/Projects";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-black text-white">
        {children}
        <Projects />
      </main>
    </>
  );
}
