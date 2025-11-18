import { ArrowUpRight, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MagneticButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Magnetic effect configuration
  const strength = 20; // Magnetic strength
  const magneticArea = 25; // Reduced field area

  useEffect(() => {
    const btn = buttonRef.current;
    let animationFrameId = null as any;
    let targetPosition = { x: 0, y: 0 };
    let currentPosition = { x: 0, y: 0 };

    const animate = () => {
      currentPosition.x += (targetPosition.x - currentPosition.x) * 0.2;
      currentPosition.y += (targetPosition.y - currentPosition.y) * 0.2;

      setPosition({
        x: currentPosition.x,
        y: currentPosition.y,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    function handleMagneticEffect(e: any) {
      if (!btn) return;

      const boundingRect = btn.getBoundingClientRect();
      const btnCenterX = boundingRect.left + boundingRect.width / 2;
      const btnCenterY = boundingRect.top + boundingRect.height / 2;

      const distanceX = e.clientX - btnCenterX;
      const distanceY = e.clientY - btnCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < magneticArea) {
        const pullFactor = 1 - Math.min(distance / magneticArea, 1);
        const moveX = (distanceX * pullFactor * strength) / 10;
        const moveY = (distanceY * pullFactor * strength) / 10;

        targetPosition = { x: moveX, y: moveY };
      } else {
        targetPosition = { x: 0, y: 0 };
      }
    }

    function resetButtonPosition() {
      targetPosition = { x: 0, y: 0 };
    }
    document.addEventListener("mousemove", handleMagneticEffect);
    document.addEventListener("mouseleave", resetButtonPosition);
    return () => {
      document.removeEventListener("mousemove", handleMagneticEffect);
      document.removeEventListener("mouseleave", resetButtonPosition);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const buttonStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };

  return (
    <div
      ref={buttonRef}
      style={buttonStyle}
      className="flex items-center justify-center w-[50px] h-[50px]  rounded-full bg-white text-black font-bold text-lg cursor-pointer no-underline shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <PlayIcon />
    </div>
  );
}
