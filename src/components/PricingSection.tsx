import React from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onCtaClick: () => void;
}

export function PricingSection({ onCtaClick }: PricingSectionProps) {
  const pricingTiers = [
    {
      title: "Édition Essentielle",
      price: "1 290 €",
      period: "par projet",
      monthlyPriceValue: "21 €",
      monthlyPrice: "+ 21 € / mois (maintenance & hébergement)",
      tagline: "La solution parfaite pour les TPE & PME souhaitant une présence locale remarquable et professionnelle.",
      features: [
        "Design d'interface entièrement sur mesure en 2 jours ouvrés",
        "Rédaction optimisée pour votre activité locale",
        "Adaptabilité mobile (Responsive) & Accessibilité optimale",
        "Hébergement ultra-rapide sécurisé avec SSL inclus",
        "Optimisation pour le référencement local Google (SEO)",
      ],
      popular: false,
    },
    {
      title: "Pack Croissance",
      price: "3 990 €",
      period: "par projet",
      monthlyPriceValue: "57 €",
      monthlyPrice: "+ 57 € / mois (maintenance & hébergement)",
      tagline: "Pour les PME en pleine expansion ayant besoin de fonctionnalités plus avancées et d'une visibilité accrue.",
      features: [
        "Tout le contenu de la Formule Essentielle",
        "Intégration d'un module de prise de rendez-vous ou formulaire avancé",
        "Optimisation approfondie pour les moteurs de recherche (SEO régional)",
        "Rapports mensuels de performance et de fréquentation",
        "Support prioritaire et modifications gratuites pendant 3 mois",
      ],
      popular: true,
    },
    {
      title: "Solutions Sur Mesure",
      price: "Sur devis",
      period: "selon besoins",
      monthlyPriceValue: "",
      monthlyPrice: "Abonnements d'entretien disponibles",
      tagline: "Pour les entreprises exigeant un développement de pointe et une intégration complète de leurs outils métiers.",
      features: [
        "Boutique e-commerce ou portail client haut de gamme",
        "Intégrations d'outils métiers (CRM, ERP, systèmes de paiement)",
        "Design exclusif sans aucune limite créative",
        "Maintenance technique complète et évolutions régulières",
        "Accompagnement stratégique dédié de proximité",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.015] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-[11px] uppercase tracking-widest text-white/50 font-body flex items-center gap-1.5"
            id="pricing-section-badge"
          >
            <Sparkles className="h-3.5 w-3.5 text-white/80" /> Nos Tarifs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
            id="pricing-section-heading"
          >
            Des offres claires et sans surprise.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 font-body font-light text-sm md:text-base max-w-xl mt-2"
          >
            Choisissez la formule qui correspond au stade de développement de votre entreprise. Tous nos prix sont transparents.
          </motion.p>

          {/* Ancrage de valeur : repère de marché honnête */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="liquid-glass rounded-2xl px-5 py-3 text-xs md:text-sm text-white/70 font-body font-light mt-5 max-w-xl leading-relaxed"
          >
            Une agence facture en moyenne{" "}
            <span className="text-white/90 font-medium">4 000 à 8 000 €</span> pour un site vitrine sur mesure.
            Voici notre approche, sans compromis sur la qualité.
          </motion.p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 items-stretch" id="pricing-section-tiers-grid">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{ overflow: "visible" }}
              className={`liquid-glass rounded-3xl p-8 flex flex-col justify-between border relative transition-all duration-300 !overflow-visible ${
                tier.popular 
                  ? "border-emerald-500/40 bg-zinc-950/80 shadow-[0_0_60px_rgba(16,185,129,0.15)] lg:scale-[1.05]" 
                  : "border-white/5 bg-white/[0.005]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-[10px] font-body font-bold uppercase tracking-widest rounded-full px-5 py-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-emerald-300/40 z-30 flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="h-3 w-3 text-black animate-pulse fill-black" /> Le plus demandé
                </span>
              )}

              <div className="flex flex-col gap-6">
                {/* Tier Name & Price */}
                <div className="flex flex-col gap-2 text-left">
                  <h4 className="text-xl font-heading italic text-white/90">
                    {tier.title}
                  </h4>
                  <div className="flex flex-col gap-1.5 mt-1">
                    {tier.period === "par projet" && (
                      <span className="text-[11px] text-white/40 font-body uppercase tracking-wider">
                        À partir de
                      </span>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl md:text-5xl font-heading italic text-white font-semibold">
                        {tier.price}
                      </span>
                      <span className="text-xs text-white/50 font-body font-light">
                        {tier.period}
                      </span>
                    </div>
                    {tier.monthlyPriceValue ? (
                      <div className="flex items-baseline gap-1 text-emerald-400 font-medium">
                        <span className="text-2xl md:text-3xl font-heading italic font-semibold">
                          + {tier.monthlyPriceValue}
                        </span>
                        <span className="text-xs text-emerald-400/80 font-body font-light">
                          / mois <span className="text-[10px] text-white/40">(maintenance & hébergement)</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1 text-emerald-400 font-medium py-1">
                        <span className="text-xs text-emerald-400/80 font-body font-light">
                          {tier.monthlyPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-white/60 font-body font-light mt-3 leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-white/10 w-full" />

                {/* Features List */}
                <ul className="flex flex-col gap-3.5 text-left">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-white/80 font-body font-light">
                      <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA select */}
              <button
                onClick={onCtaClick}
                data-umami-event="pricing-select"
                data-umami-event-tier={tier.title}
                className={`mt-10 w-full py-3 rounded-full text-xs font-semibold font-body transition-all active:scale-98 cursor-pointer ${
                  tier.popular
                    ? "bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] border border-emerald-300/20"
                    : "liquid-glass-strong text-white border border-white/20 hover:border-white/40 hover:bg-white/5"
                }`}
              >
                Lancer le projet
              </button>
            </motion.div>
          ))}
        </div>

        {/* Réassurance sous la grille */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 mt-14"
        >
          {[
            "Sans engagement",
            "Acompte à la commande, solde après validation",
            "Maquette validée avant paiement",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-2 text-xs md:text-sm text-white/60 font-body font-light"
            >
              <Check className="h-4 w-4 text-emerald-400/80 shrink-0" /> {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
