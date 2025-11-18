"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  useGetPortfolios,
  useGetPortfoliosByFields,
} from "@/services/portfolios";
import clsx from "clsx";
import { ScrollTrigger } from "gsap/all";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface ClientData {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

// Sample client data - replace with your actual data
const clientsData: ClientData[] = [
  { id: 1, name: "Company A", logo: "/logo.svg", alt: "Company A Logo" },
  { id: 2, name: "Company B", logo: "/logo.svg", alt: "Company B Logo" },
  { id: 3, name: "Company C", logo: "/logo.svg", alt: "Company C Logo" },
  { id: 4, name: "Company D", logo: "/logo.svg", alt: "Company D Logo" },
  { id: 5, name: "Company E", logo: "/logo.svg", alt: "Company E Logo" },
  { id: 6, name: "Company F", logo: "/logo.svg", alt: "Company F Logo" },
  { id: 7, name: "Company G", logo: "/logo.svg", alt: "Company G Logo" },
  { id: 8, name: "Company H", logo: "/logo.svg", alt: "Company H Logo" },
  { id: 9, name: "Company I", logo: "/logo.svg", alt: "Company I Logo" },
  { id: 10, name: "Company J", logo: "/logo.svg", alt: "Company J Logo" },
];

export const OurClients = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update carousel state
  const updateCarouselState = useCallback(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    updateCarouselState();

    api.on("select", updateCarouselState);

    return () => {
      api.off("select", updateCarouselState);
    };
  }, [api, updateCarouselState]);

  const handlePrevious = useCallback(() => {
    if (api && canScrollPrev) {
      api.scrollPrev();
    }
  }, [api, canScrollPrev]);

  const handleNext = useCallback(() => {
    if (api && canScrollNext) {
      api.scrollNext();
    }
  }, [api, canScrollNext]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const { data: clients, isPending } = useGetPortfolios();

  useEffect(() => {
    if (clients?.payload) {
      setCount(clients?.payload?.length);
      if (clients) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 400);
      }
    }
  }, [clients]);
  return (
    <section
      className="our-clients w-full bg-black text-white py-16"
      aria-label="Our Clients"
      id="our-clients"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-100">Our Clients</h2>
        </div>
        <div className="relative grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {!isPending &&
            clients?.payload?.map((client) => (
              <div
                className="flex items-center justify-center"
                key={client._id}
              >
                <Link href={`/clients/${client?._id}`}>
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={130}
                    height={100}
                    className="h-auto"
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
