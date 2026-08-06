import React from "react";
import Image from "next/image";

const frameworks = [
  { name: "React", src: "/logos/react.svg" },
  { name: "Vue", src: "/logos/vuejs.svg" },
  { name: "Tailwind", src: "/logos/tailwindcss.svg" },
  { name: "HTML", src: "/logos/html5.svg" },
  { name: "CSS", src: "/logos/css3.svg" },
  { name: "JavaScript", src: "/logos/javascript.svg" },
];

function TechLogo({ src, alt, name }) {
  return (
    <div className="group flex flex-row items-center justify-between gap-2.5 z-50">
      <div className="flex h-10 w-10 items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          className="h-8 w-8 object-contain
                     transition-all duration-300
                     group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
        />
      </div>
      <span className="text-medium font-medium text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
        {name}
      </span>
    </div>
  );
}

const SupportedTech = () => {
  return (
    <section className="relative border-y border-neutral-900 bg-neutral-950/20 py-10 z-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between">
          <p className="group text-medium text-neutral-400 flex flex-row items-center justify-between gap-2.5 z-50">
            Works with your stack
          </p>
          {frameworks.map((framework) => (
            <TechLogo
              key={framework.name}
              src={framework.src}
              alt={framework.name}
              name={framework.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedTech;
