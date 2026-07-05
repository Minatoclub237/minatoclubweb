import React from "react";
import { ArrowUpRight, Play, Check } from "lucide-react";
import { motion } from "motion/react";
import { BlurText } from "./BlurText";

interface HeroProps {
  onCtaClick: () => void;
  onWatchFilmClick: () => void;
}

export function Hero({ onCtaClick, onWatchFilmClick }: HeroProps) {
  const trustPoints = [
    "Livraison en 2 jours",
    "Hébergement & SSL inclus",
    "SEO local optimisé",
    "Conforme RGPD",
    "Paiement 2× sans frais",
  ];

  return (
    <section
      id="home"
      className="relative overflow-visible flex flex-col items-center justify-between text-center bg-black"
      style={{ height: "1000px" }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0" id="hero-bg-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          className="absolute left-0 w-full h-auto object-cover opacity-80 z-0"
          style={{ top: "20%", minHeight: "60%" }}
          id="hero-video-bg"
        >
          {/* Vidéo locale compressée (616 Ko au lieu de 11 Mo) : ouverture rapide, sans dépendance externe */}
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for high luxury contrast */}
        <div className="absolute inset-0 bg-black/15 z-0" />
        {/* Bottom smooth gradient fade to solid black */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[300px] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #000000)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 flex flex-col items-center h-full pt-[170px] justify-between">
        {/* Top Badging & Main Typography Group */}
        <div className="flex flex-col items-center gap-6 md:gap-8 max-w-3xl">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass rounded-full p-1 flex items-center gap-2.5 pr-4 text-xs font-medium text-white/90 font-body"
            id="hero-badge"
          >
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              TPE & PME
            </span>
            <span>Sites vitrines 3D cinématiques pour les entreprises de France, Belgique et Suisse.</span>
          </motion.div>

          {/* Heading using BlurText */}
          <div className="mt-2" id="hero-heading-container">
            <BlurText
              as="h1"
              text="Sites vitrines 3D cinématiques qui transforment vos visiteurs en clients"
              delay={150}
              stagger={100}
              splitBy="words"
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] tracking-[-3px] justify-center"
            />
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="text-sm md:text-base lg:text-lg text-white/80 font-body font-light max-w-xl leading-relaxed"
            id="hero-subtext"
          >
            Des sites vitrines 3D cinématiques sur mesure pour votre entreprise locale. Une expérience immersive qui capte l'attention, inspire confiance et transforme vos visiteurs en clients.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 mt-2"
            id="hero-ctas"
          >
            <button
              onClick={onCtaClick}
              data-umami-event="cta-hero-devis"
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-white/10 text-white transition-all duration-300 border border-white/25 hover:border-white/40 cursor-pointer active:scale-95 shadow-md"
            >
              <span>Obtenir mon devis gratuit</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              onClick={onWatchFilmClick}
              data-umami-event="watch-film"
              className="text-white text-sm font-semibold font-body flex items-center gap-2 px-5 py-3 hover:text-white/80 active:scale-95 transition-all cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black shadow-md hover:scale-105 transition-transform duration-200">
                <Play className="h-3.5 w-3.5 fill-black ml-0.5" />
              </div>
              <span>Voir le Film</span>
            </button>
          </motion.div>

          {/* Micro-réassurance sous les CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
            className="liquid-glass rounded-full px-4 py-2 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-xs md:text-sm text-white/85 font-body"
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Réponse sous 1&nbsp;h
            </span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Paiement 2× sans frais
            </span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Maquette avant paiement
            </span>
          </motion.div>
        </div>

        {/* Trust / guarantees bar at the bottom */}
        <div className="w-full mt-auto pb-10 pt-10 flex flex-col items-center gap-6 z-20">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-[11px] uppercase tracking-widest text-white/50 font-body">
            Ce qui est toujours inclus
          </div>
          <div
            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 md:gap-x-10 max-w-4xl"
            id="hero-trust"
          >
            {trustPoints.map((point) => (
              <span
                key={point}
                className="flex items-center gap-2 text-sm md:text-base font-body font-light text-white/50 hover:text-white/90 transition-colors duration-300 select-none"
              >
                <Check className="h-4 w-4 text-white/60 shrink-0" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
