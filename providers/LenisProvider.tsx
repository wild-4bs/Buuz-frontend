import ReactLenis from "lenis/react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        autoResize: true
      }} // أضف هذه الخاصية
    >
      {children}
    </ReactLenis>
  );
};
