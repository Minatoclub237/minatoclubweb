import React from "react";
import { motion } from "motion/react";
import { Zap, Palette, BarChart3, Shield } from "lucide-react";

export function FeaturesGrid() {
  const cards = [
    {
      icon: Zap,
      title: "Des jours, pas des mois",
      description:
        "Du concept à la mise en ligne à une vitesse inédite pour que vous ne perdiez aucune opportunité locale.",
    },
    {
      icon: Palette,
      title: "Création sur mesure",
      description:
        "Un design unique et soigné qui reflète parfaitement le professionnalisme et l'identité de votre entreprise.",
    },
    {
      icon: BarChart3,
      title: "Pensé pour vos clients",
      description:
        "Une structure fluide optimisée pour inciter aux appels, aux e-mails et aux demandes de devis de vos prospects.",
    },
    {
      icon: Shield,
      title: "Sécurisé & RGPD",
      description:
        "Hébergement ultra-rapide, certificat SSL et conformité totale aux normes européennes de protection des données.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="why-us" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Light decorative ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-indigo-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
            id="features-grid-badge"
          >
            Pourquoi nous
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
            id="features-grid-heading"
          >
            La différence fait tout.
          </motion.h2>
        </div>

        {/* 4-column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          id="why-us-grid"
        >
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="liquid-glass rounded-2xl p-8 flex flex-col items-start text-left gap-6 border border-white/[0.05] relative group hover:bg-white/[0.02] transition-colors duration-300 shadow-xl"
              >
                {/* Glowing hover accent background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Icon Wrapper */}
                <div className="liquid-glass-strong rounded-full h-11 w-11 flex items-center justify-center border border-white/20 shrink-0 shadow-sm relative z-10">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-3 relative z-10">
                  <h3 className="text-xl font-heading italic text-white font-medium">
                    {card.title}
                  </h3>
                  <p className="text-white/72 font-body font-light text-sm md:text-xs leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
