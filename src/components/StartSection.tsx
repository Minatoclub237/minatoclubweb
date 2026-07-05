import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { isMobileViewport } from "../lib/device";

interface StartSectionProps {
  onCtaClick: () => void;
}

export function StartSection({ onCtaClick }: StartSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = "/bg-process.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Pas de vidéo de fond sur mobile (fluidité).
    if (isMobileViewport()) return;

    // Vidéo locale chargée seulement à l'approche du viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          video.src = videoUrl;
          video.play?.().catch(() => {});
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, [videoUrl]);

  return (
    <section
      id="process"
      className="relative overflow-hidden w-full flex items-center justify-center py-24 md:py-32 bg-black min-h-[550px]"
    >
      {/* Background video (locale) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0" id="start-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
          id="start-video"
        />
        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Top Gradient Fade (200px, black to transparent) */}
        <div
          className="absolute top-0 left-0 right-0 h-[200px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #000000, transparent)",
          }}
        />

        {/* Bottom Gradient Fade (200px, transparent to black) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[200px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #000000, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6 md:gap-8">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
          id="start-badge"
        >
          Comment ça marche
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.95] text-white max-w-2xl"
          id="start-heading"
        >
          Vous en rêvez. Nous le créons.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/70 font-body font-light text-sm md:text-base max-w-xl leading-relaxed"
          id="start-subtext"
        >
          Partagez votre vision. Notre technologie intelligente s'occupe du reste : maquettes, design 3D cinématique, développement et déploiement. Le tout en seulement 2 jours pour booster la visibilité locale de votre entreprise en France, Belgique et Suisse.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          id="start-cta-container"
        >
          <button
            onClick={onCtaClick}
            className="liquid-glass-strong rounded-full px-7 py-3.5 text-sm font-semibold text-white flex items-center gap-2 hover:bg-white/10 border border-white/25 hover:border-white/45 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <span>Commencer</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
