"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackdrop({ children }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#09090b]">
        {/* Base radial vignette */}

        <div className="absolute inset-0 backdrop-base" />

        {/* Hero spotlight */}

        <div
          className="absolute w-[1100px] h-[1100px] rounded-full hero-spotlight"
          style={{
            left: "50%",
            top: "-30%",
            transform: `translate(-50%,0) translate(${mouse.x}px,${mouse.y}px)`,
          }}
        />

        {/* Left atmosphere */}

        <div
          className="absolute left-[-350px] top-[20%] w-[900px] h-[900px] rounded-full aurora-left"
          style={{
            transform: `translate(${mouse.x * 0.3}px,${mouse.y * 0.3}px)`,
          }}
        />

        {/* Right atmosphere */}

        <div
          className="absolute right-[-350px] top-[10%] w-[850px] h-[850px] rounded-full aurora-right"
          style={{
            transform: `translate(${-mouse.x * 0.25}px,${-mouse.y * 0.25}px)`,
          }}
        />

        {/* Center Glow */}

        <div className="absolute inset-0 center-glow" />

        {/* Grid */}

        <div className="absolute inset-0 perspective-grid" />

        {/* Noise */}

        <div className="absolute inset-0 noise" />
      </div>

      {children}
    </>
  );
}
