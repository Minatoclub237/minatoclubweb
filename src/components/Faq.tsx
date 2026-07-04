import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

// ⚠️ Ces questions/réponses sont dupliquées dans le JSON-LD FAQPage de index.html.
// Toute modification ici doit être répercutée là-bas (et inversement) pour rester conforme Google.
export const FAQ_ITEMS = [
  {
    q: "Le site vitrine m'appartient-il vraiment ?",
    a: "Oui, à 100 %. Une fois le solde réglé, le site et l'ensemble de son contenu sont votre propriété pleine et entière — code, textes et visuels compris.",
  },
  {
    q: "Combien de temps faut-il pour livrer mon site vitrine ?",
    a: "Deux jours ouvrés en moyenne à partir de la validation de votre maquette. Vous êtes en ligne en quelques jours, pas en plusieurs mois.",
  },
  {
    q: "Dois-je payer avant de voir le résultat ?",
    a: "Non. Vous validez d'abord la maquette de votre site. Aucun solde n'est dû tant que le design ne vous convient pas entièrement.",
  },
  {
    q: "Je n'y connais rien en technique, est-ce un problème ?",
    a: "Aucunement. Nous gérons tout de A à Z : conception, rédaction, mise en ligne et hébergement. Vous n'avez qu'à partager votre vision, nous nous occupons du reste.",
  },
  {
    q: "Mon site vitrine sera-t-il visible sur Google ?",
    a: "Oui. Chaque site est optimisé pour le référencement local (SEO) afin que vos clients de votre région vous trouvent facilement sur Google et Google Maps.",
  },
  {
    q: "Puis-je demander des modifications ?",
    a: "Bien sûr. Des révisions sont incluses jusqu'à la validation de votre maquette, et des ajustements restent possibles ensuite selon votre formule d'accompagnement.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
          >
            Questions fréquentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
          >
            Tout ce que vous voulez savoir.
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="liquid-glass rounded-2xl border border-white/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-body font-medium text-sm md:text-base text-white/90">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-white/60"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 pt-0 text-sm text-white/60 font-body font-light leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
