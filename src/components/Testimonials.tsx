import React from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      quote:
        "Un site vitrine livré en quelques jours, pensé pour transformer les visiteurs en demandes de devis qualifiées auprès d'une clientèle locale.",
      name: "Artisanat & bâtiment",
      role: "Scénario type — Suisse",
    },
    {
      quote:
        "Un parcours client fluide et un référencement local soigné pour que les habitants de votre région vous trouvent enfin facilement sur Google.",
      name: "Commerce de proximité",
      role: "Scénario type — Belgique",
    },
    {
      quote:
        "Zéro jargon technique, tout géré de A à Z : de la conception à la mise en ligne, jusqu'à la génération de demandes d'intervention locales.",
      name: "Services & professions libérales",
      role: "Scénario type — France",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background soft glowing orb */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
            id="testimonials-badge"
          >
            Ce que nous visons pour vous
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
            id="testimonials-heading"
          >
            Les résultats que nous visons.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/45 font-body font-light text-xs max-w-md mt-1"
          >
            Exemples illustratifs par secteur — nos premiers témoignages clients vérifiés seront publiés ici prochainement.
          </motion.p>
        </div>

        {/* 3-column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          id="testimonials-grid"
        >
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="liquid-glass rounded-2xl p-8 md:p-10 flex flex-col justify-between items-start text-left border border-white/[0.04] relative group hover:bg-white/[0.02] transition-colors duration-300 shadow-xl"
            >
              {/* Subtle visual quote mark */}
              <div className="text-white/10 absolute top-6 right-8">
                <Quote className="h-10 w-10 rotate-180" />
              </div>

              {/* Quote text */}
              <div className="flex flex-col gap-6 relative z-10">
                <p className="text-white/85 font-body font-light text-sm md:text-base leading-relaxed italic pr-4">
                  "{item.quote}"
                </p>
              </div>

              {/* Author details */}
              <div className="mt-8 flex flex-col gap-1 relative z-10">
                <h4 className="text-white font-body font-medium text-sm">
                  {item.name}
                </h4>
                <p className="text-white/50 font-body font-light text-xs uppercase tracking-wider">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
