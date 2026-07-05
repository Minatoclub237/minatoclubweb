import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { CountryFlag } from "./CountryFlag";

// ⚠️ Exemples ILLUSTRATIFS (personas fictifs) — pas de vrais clients, donc AUCUN balisage
// Review/AggregateRating dans le JSON-LD (les faux avis sont illégaux et pénalisés par Google).
// L'ordre correspond aux avatars public/avatars/t01.svg … t18.svg.
const REVIEWS = [
  { name: "Marc Vasseur", role: "Plomberie Vasseur", city: "Lyon", iso: "FR", rating: 5.0, quote: "Site vitrine livré en 2 jours, et dès la première semaine j'ai reçu des demandes d'intervention de clients de mon quartier. Simple et efficace." },
  { name: "Sophie Nguyen", role: "Atelier Fleuri", city: "Nantes", iso: "FR", rating: 4.9, quote: "Un site élégant qui reflète enfin mon travail. Mes clientes réservent leurs bouquets en ligne, je gagne un temps fou." },
  { name: "Karim Benali", role: "Benali Auto", city: "Marseille", iso: "FR", rating: 5.0, quote: "On me trouve maintenant sur Google quand on cherche un garage dans le coin. Le carnet de rendez-vous se remplit tout seul." },
  { name: "Élodie Rousseau", role: "Cabinet Rousseau Avocats", city: "Bordeaux", iso: "FR", rating: 4.8, quote: "Un site sobre et rassurant, à la hauteur de mon cabinet. Les prises de contact ont clairement augmenté." },
  { name: "Thomas Lefèvre", role: "Boulangerie du Cours", city: "Toulouse", iso: "FR", rating: 5.0, quote: "Rapide, beau, et parfait sur mobile. Mes clients consultent les horaires et les fournées du jour d'un coup d'œil." },
  { name: "Camille Moreau", role: "Studio Camille Photo", city: "Lille", iso: "FR", rating: 4.9, quote: "Mon portfolio est enfin à la hauteur de mes photos. J'ai décroché deux mariages dès la première semaine." },
  { name: "Sandrine Laurent", role: "Épicerie Fleur de Sel", city: "Bruxelles", iso: "BE", rating: 5.0, quote: "Les habitants du quartier me trouvent enfin sur Google. Le site est magnifique et incroyablement rapide." },
  { name: "Julien Dubois", role: "Menuiserie Dubois & Fils", city: "Liège", iso: "BE", rating: 4.9, quote: "Zéro jargon technique, tout géré de A à Z. Mes demandes de devis ont doublé en quelques semaines." },
  { name: "Nadia El Amrani", role: "Institut Belle Époque", city: "Anvers", iso: "BE", rating: 5.0, quote: "La prise de rendez-vous en ligne a changé ma vie. Fini le téléphone qui sonne sans arrêt pendant les soins." },
  { name: "Pierre Vandenberghe", role: "Cabinet Comptable PV", city: "Namur", iso: "BE", rating: 4.8, quote: "Un site professionnel qui inspire confiance dès le premier clic. Idéal pour rassurer mes futurs clients." },
  { name: "Marie Lambert", role: "Restaurant La Table de Marie", city: "Gand", iso: "BE", rating: 5.0, quote: "Réservations en hausse, menu toujours à jour, et un rendu digne d'une table étoilée. Un vrai plus." },
  { name: "Jean-Pierre Dubois", role: "Menuiserie du Léman", city: "Genève", iso: "CH", rating: 5.0, quote: "Site vitrine impeccable, livré en un temps record. Des demandes de devis de qualité dès le lancement." },
  { name: "Laura Bianchi", role: "Bianchi Architecture", city: "Lausanne", iso: "CH", rating: 4.9, quote: "Épuré et élégant, à l'image de mon travail. Mes clients haut de gamme adorent l'expérience." },
  { name: "Marco Rossi", role: "Rossi Électricité", city: "Lugano", iso: "CH", rating: 5.0, quote: "On me trouve enfin en ligne. Le téléphone sonne davantage, et pour de vrais projets locaux." },
  { name: "Céline Favre", role: "Cabinet Dentaire Favre", city: "Fribourg", iso: "CH", rating: 4.8, quote: "Un site rassurant et rapide. Mes nouveaux patients prennent rendez-vous directement en ligne." },
  { name: "Nicolas Meyer", role: "Cave Meyer Vins", city: "Sion", iso: "CH", rating: 5.0, quote: "Ma cave a enfin une vitrine à la hauteur de mes crus. Mes ventes locales ont nettement progressé." },
  { name: "Aurélie Petit", role: "Coiffure Aurélie", city: "Strasbourg", iso: "FR", rating: 5.0, quote: "Agenda en ligne et galerie de mes réalisations : mes clientes réservent même le dimanche soir." },
  { name: "David Garcia", role: "Garcia Rénovation", city: "Montpellier", iso: "FR", rating: 4.9, quote: "Des chantiers locaux qui arrivent régulièrement grâce au référencement. Investissement vite rentabilisé." },
];

function usePerPage() {
  // 1 carte sur mobile, 2 sur tablette, 3 sur desktop. Défaut 3 (cohérent SSG).
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerPage(w < 768 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return perPage;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Note ${rating.toFixed(1)} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < full ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
          />
        ))}
      </div>
      <span className="text-xs font-body font-medium text-amber-300/90">
        {rating.toFixed(1).replace(".", ",")}
      </span>
    </div>
  );
}

export function Testimonials() {
  const perPage = usePerPage();
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(REVIEWS.length / perPage);

  // Si le nombre de cartes par page change (resize), on borne la page courante.
  useEffect(() => {
    setPage((p) => Math.min(p, Math.ceil(REVIEWS.length / perPage) - 1));
  }, [perPage]);

  const start = page * perPage;
  const visible = REVIEWS.slice(start, start + perPage);

  const go = (dir: number) => setPage((p) => Math.max(0, Math.min(totalPages - 1, p + dir)));

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
          >
            Témoignages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
          >
            Ils nous font confiance.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 font-body font-light text-xs max-w-md"
          >
            Artisans, commerçants et professionnels — France · Belgique · Suisse.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {visible.map((item) => {
                const globalIdx = REVIEWS.indexOf(item);
                const avatar = `/avatars/t${String(globalIdx + 1).padStart(2, "0")}.svg`;
                return (
                  <div
                    key={item.name}
                    className="liquid-glass rounded-2xl p-7 md:p-8 flex flex-col justify-between text-left border border-white/[0.05] relative shadow-xl"
                  >
                    <div className="text-white/[0.06] absolute top-6 right-7">
                      <Quote className="h-9 w-9 rotate-180" />
                    </div>
                    <span className="absolute bottom-6 right-7 text-[9px] uppercase tracking-widest text-white/20 font-body select-none pointer-events-none">
                      Scénario
                    </span>

                    <div className="flex flex-col gap-4 relative z-10">
                      <Stars rating={item.rating} />
                      <p className="text-white/85 font-body font-light text-sm md:text-[15px] leading-relaxed italic pr-2">
                        “{item.quote}”
                      </p>
                    </div>

                    {/* Author */}
                    <div className="mt-7 flex items-center gap-3 relative z-10">
                      <img
                        src={avatar}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        className="h-11 w-11 rounded-full ring-1 ring-white/15 bg-white/5 shrink-0"
                      />
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <h4 className="text-white font-body font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-white/66 font-body font-light text-xs truncate">{item.role}</p>
                        <span className="flex items-center gap-1.5 text-white/56 text-[11px] font-body mt-0.5">
                          <CountryFlag iso={item.iso} className="!w-[15px] !h-[11px]" />
                          {item.city}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={() => go(-1)}
            disabled={page === 0}
            aria-label="Précédent"
            className="h-11 w-11 rounded-full liquid-glass-strong border border-white/15 flex items-center justify-center text-white transition-all hover:border-white/35 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === page ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            disabled={page === totalPages - 1}
            aria-label="Suivant"
            className="h-11 w-11 rounded-full liquid-glass-strong border border-white/15 flex items-center justify-center text-white transition-all hover:border-white/35 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
