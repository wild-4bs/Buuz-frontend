import clsx from "clsx";
import Image from "next/image";

export const Hero = ({ image, name }: { image?: string; name?: string }) => {
  return (
    <>
      <div className="hero py-12 text-center capitalize font-bold text-5xl relative h-96 flex items-center justify-center">
        {image && (
          <>
            <Image
              src={image}
              fill
              alt="background"
              className="object-cover z-0"
            />
            <div
              className="layer w-full h-full absolute top-0 left-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #000000d6 100%)",
              }}
            ></div>
          </>
        )}
        <div className="container">
          <h1
            className={clsx("z-[1] text-black relative", {
              "text-white": image,
            })}
          >
            {name}
          </h1>
        </div>
      </div>
    </>
  );
};
