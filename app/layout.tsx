import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { PageContentHandler } from "@/components/PageContentHanlder";
import MetaTags from "@/components/Metatags";

export const metadata: Metadata = {
  title: "BEEZ PRODUCTIONS | Broadcasting & Media Production Company",
  description:
    "BEEZ PRODUCTIONS is a professional broadcasting and media production company based in Baghdad, specializing in high-quality video and audio content.",
  keywords:
    "Beez Productions, Broadcasting Company, Media Production, Video Production, Audio Production, Film Production, Baghdad Media, Iraq Broadcasting",
  authors: [{ name: "Malamih - شركة ملامح" }],
  openGraph: {
    title: "BEEZ PRODUCTIONS | Broadcasting & Media Production Company",
    description:
      "Specialists in broadcasting and media production. Located in Baghdad, serving clients with professional audio and video content.",
    type: "website",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "BEEZ PRODUCTIONS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEEZ PRODUCTIONS",
    description: "Broadcasting & Media Production Company in Baghdad.",
    images: ["/OG.png"], // يجب تحديد الصورة الصحيحة
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <NextTopLoader color="#f3cf47" showSpinner={false} />
        <Toaster />
        <QueryProvider>
          <PageContentHandler />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
