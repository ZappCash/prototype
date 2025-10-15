"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/assets");
    }, 600);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(180deg, #0D2818 0%, #0a0a0a 100%)' }}
    >
      {/* Orbs decorativos */}
      <div className="orb-green top-[-200px] left-[-200px]" />
      <div className="orb-dark-green bottom-[-200px] right-[-200px]" />

      {/* Patrón de fondo */}
      <div className="absolute inset-0 dot-pattern opacity-10" />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-6">
        {/* Logo */}
        <div className="animate-fade-in">
          <Image
            src="/White-Logo.svg"
            alt="ZappCash Logo"
            width={280}
            height={280}
            priority
            className="drop-shadow-2xl"
          />
        </div>

        {/* Botón de ingreso */}
        <button
          onClick={handleEnter}
          className="bg-white text-black px-12 py-4 rounded-full font-semibold text-lg
                   hover:scale-105 hover:shadow-2xl hover:shadow-white/50
                   active:scale-95 transition-all duration-300 ease-out cursor-pointer"
        >
          Ingresar →
        </button>

        {/* Texto decorativo opcional */}
        <p className="text-white/80 text-sm font-medium">
          Prototype v1.0
        </p>
      </div>
    </div>
  );
}
