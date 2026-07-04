import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface FeaturesChessProps {
  onLearnMoreClick: (feature: string) => void;
}

export function FeaturesChess({ onLearnMoreClick }: FeaturesChessProps) {
  return (
    <section id="services" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background ambient radial blur for luxury depth */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
            id="features-chess-badge"
          >
            Nos Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
            id="features-chess-heading"
          >
            Des solutions web complètes pour votre activité.
          </motion.h2>
        </div>

        {/* Alternate Rows Container */}
        <div className="flex flex-col gap-24 md:gap-36" id="features-chess-rows">
          {/* Row 1: Content Left, GIF Right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left"
              id="feature-chess-row1-content"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading italic leading-[1.0] text-white">
                Conçu pour attirer vos clients locaux.
              </h3>
              <p className="text-white/70 font-body font-light text-sm md:text-base leading-relaxed">
                Chaque élément de votre site vitrine est pensé pour inspirer confiance. Nous créons pour vous un design 3D cinématique unique et ultra-rapide qui convertit vos visiteurs en clients fidèles, parfaitement adapté aux attentes de vos clients en France, Belgique et Suisse.
              </p>
              <button
                onClick={() => onLearnMoreClick("performance")}
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-xs md:text-sm text-white font-semibold flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer active:scale-95 shadow"
              >
                <span>En savoir plus</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>

            {/* Visual/GIF block */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
              id="feature-chess-row1-visual"
            >
              <div className="liquid-glass rounded-2xl overflow-hidden p-2 bg-white/[0.02]">
                <div className="rounded-xl overflow-hidden relative group aspect-[16/10] bg-zinc-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-60 z-10 pointer-events-none" />
                  <img
                    src="https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif"
                    alt="Finlytic Interactive Analytics Preview"
                    className="w-full h-full object-cover relative z-0 transition-transform duration-700 group-hover:scale-102"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Content Right, GIF Left (Reverse Layout) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            {/* Content block */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left"
              id="feature-chess-row2-content"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading italic leading-[1.0] text-white">
                Zéro gestion technique. Clé en main.
              </h3>
              <p className="text-white/70 font-body font-light text-sm md:text-base leading-relaxed">
                Oubliez les tracas de maintenance, de mise à jour ou d'hébergement complexe. Notre équipe s'occupe de tout : de la conception sur mesure à la mise en ligne, avec un suivi de proximité personnalisé pour que vous puissiez vous concentrer à 100% sur votre métier.
              </p>
              <button
                onClick={() => onLearnMoreClick("smarter-optimization")}
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-xs md:text-sm text-white font-semibold flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer active:scale-95 shadow"
              >
                <span>Découvrir le fonctionnement</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>

            {/* Visual/GIF block */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
              id="feature-chess-row2-visual"
            >
              <div className="liquid-glass rounded-2xl overflow-hidden p-2 bg-white/[0.02]">
                <div className="rounded-xl overflow-hidden relative group aspect-[16/10] bg-zinc-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-60 z-10 pointer-events-none" />
                  <img
                    src="https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif"
                    alt="Wealth Interactive Performance Dashboard Preview"
                    className="w-full h-full object-cover relative z-0 transition-transform duration-700 group-hover:scale-102"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
