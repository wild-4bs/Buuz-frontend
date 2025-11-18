import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/providers/LenisProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LenisProvider>
        <Header />
        {children}
        <Footer />
      </LenisProvider>
    </>
  );
}
