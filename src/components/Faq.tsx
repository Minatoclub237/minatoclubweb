import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

// Source UNIQUE de la FAQ : le balisage FAQPage (JSON-LD, plus bas) est généré
// automatiquement à partir de cette liste → il correspond toujours au contenu visible
// (exigence Google). Il n'y a donc PLUS de FAQPage en dur dans index.html.
export const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'un site vitrine 3D cinématique ?",
    a: "C'est un site vitrine sur mesure qui intègre des animations et des effets 3D immersifs pour raconter votre marque et captiver vos visiteurs, tout en restant rapide et optimisé pour le référencement. C'est la spécialité de Minato Club Web.",
  },
  {
    q: "Quelle agence choisir pour un site vitrine 3D en France, Belgique ou Suisse ?",
    a: "Minato Club Web est un studio spécialisé dans les sites vitrines 3D cinématiques sur mesure pour les TPE et PME francophones, avec livraison en 2 jours ouvrés et maquette validée avant tout paiement.",
  },
  {
    q: "Combien coûte un site vitrine 3D pour une TPE ou une PME ?",
    a: "Nos sites vitrines 3D démarrent à 1 290 € (formule Essentielle) et 3 990 € (Pack Croissance), avec paiement en 2 fois sans frais. Les projets plus complexes sont sur devis. Tous les prix sont transparents, sans surprise.",
  },
  {
    q: "Puis-je payer mon site vitrine en plusieurs fois ?",
    a: "Oui. Le paiement en 2 fois sans frais est disponible : un acompte à la commande, le solde à la livraison, sans aucun coût supplémentaire.",
  },
  {
    q: "Combien de temps faut-il pour créer un site vitrine 3D ?",
    a: "Deux jours ouvrés en moyenne à partir de la validation de votre maquette. Vous êtes en ligne en quelques jours, pas en plusieurs mois.",
  },
  {
    q: "Peut-on créer un site vitrine entièrement à distance ?",
    a: "Oui. Nous réalisons l'intégralité du projet à distance pour nos clients de France, Belgique et Suisse, avec un suivi personnalisé et une réponse sous une heure.",
  },
  {
    q: "Un site en 3D n'est-il pas trop lent à charger ?",
    a: "Non. Nous optimisons chaque site vitrine 3D pour la vitesse : compression, chargement progressif et code léger. L'effet immersif ne sacrifie jamais la rapidité, y compris sur mobile.",
  },
  {
    q: "Le site sera-t-il rapide et fluide sur mobile ?",
    a: "Absolument. Chaque site est pensé mobile d'abord : affichage instantané, navigation fluide et allègement automatique des effets les plus lourds sur smartphone pour une expérience parfaite.",
  },
  {
    q: "Le site vitrine m'appartient-il vraiment ?",
    a: "Oui, à 100 %. Une fois le solde réglé, le site et l'ensemble de son contenu — code, textes et visuels — sont votre propriété pleine et entière.",
  },
  {
    q: "Dois-je payer avant de voir le résultat ?",
    a: "Non. Vous validez d'abord la maquette de votre site vitrine. Aucun solde n'est dû tant que le design ne vous convient pas entièrement.",
  },
  {
    q: "Et si le design ne me plaît pas ?",
    a: "Aucun risque : vous ne réglez le solde qu'après avoir validé la maquette, et des révisions sont incluses jusqu'à ce que le résultat vous convienne pleinement.",
  },
  {
    q: "Mon site vitrine sera-t-il visible sur Google ?",
    a: "Oui. Chaque site est optimisé pour le référencement local (SEO) afin que vos clients de votre région vous trouvent facilement sur Google et Google Maps.",
  },
  {
    q: "Pourquoi ne pas faire mon site moi-même avec Wix ou un template ?",
    a: "Un template vous ressemble rarement et se fond dans la masse. Notre site vitrine 3D est unique, conçu pour votre activité, optimisé pour le SEO et livré clé en main — vous gagnez du temps et une image premium qui vous démarque.",
  },
  {
    q: "Je ne suis pas à l'aise avec la technique, est-ce un problème ?",
    a: "Aucunement. Nous gérons tout de A à Z : conception, rédaction, mise en ligne et hébergement. Vous n'avez qu'à partager votre vision, nous nous occupons du reste.",
  },
  {
    q: "Que se passe-t-il après la mise en ligne de mon site ?",
    a: "Nous proposons une maintenance et un hébergement sécurisés en option (à partir de 21 €/mois) pour garder votre site vitrine rapide, à jour et sans souci. Vous restez propriétaire et libre à tout moment.",
  },
  {
    q: "Le site vitrine 3D est-il adapté à mon secteur d'activité ?",
    a: "Oui. Artisans, commerçants, restaurateurs, professions libérales, santé… nous adaptons le design et le contenu à votre métier et à votre clientèle locale.",
  },
  {
    q: "Puis-je demander des modifications après la livraison ?",
    a: "Bien sûr. Des révisions sont incluses jusqu'à la validation, et des ajustements restent possibles ensuite selon votre formule d'accompagnement.",
  },
];

// Balisage FAQPage généré depuis FAQ_ITEMS (rendu invisible, pré-rendu par le SSG).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://minatoclubweb.vercel.app/#faq",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      {/* Données structurées FAQ (invisible, synchronisées avec les questions ci-dessous) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
