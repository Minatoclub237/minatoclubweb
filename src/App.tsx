/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Play, Volume2, VolumeX, Sparkles, AlertCircle } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StartSection } from "./components/StartSection";
import { FeaturesChess } from "./components/FeaturesChess";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import { CtaFooter } from "./components/CtaFooter";
import { Portfolio } from "./components/Portfolio";
import { PricingSection } from "./components/PricingSection";
import { Faq } from "./components/Faq";
import { LegalModal, LegalPage } from "./components/LegalModal";
import { CookieBanner } from "./components/CookieBanner";
import { StickyCta } from "./components/StickyCta";

export default function App() {
  const [activeModal, setActiveModal] = useState<"film" | "pricing" | "capability" | null>(null);
  const [capabilityTopic, setCapabilityTopic] = useState<string>("");
  const [isFilmMuted, setIsFilmMuted] = useState(true);
  const [legalPage, setLegalPage] = useState<LegalPage | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigate = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLearnMore = (topic: string) => {
    setCapabilityTopic(topic);
    setActiveModal("capability");
  };

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
    <div className="bg-black text-white relative min-h-screen selection:bg-white selection:text-black" id="app-root">
      {/* Glowing Floating Ambient Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-screen pointer-events-none overflow-hidden z-10">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-[450px] h-[450px] bg-white/[0.015] rounded-full blur-3xl" />
      </div>

      {/* Structured Content Block */}
      <div className="relative z-20">
        <Navbar onNavigate={handleNavigate} />
        
        <Hero 
          onCtaClick={() => handleNavigate("cta")} 
          onWatchFilmClick={() => setActiveModal("film")} 
        />
        
        <FeaturesChess onLearnMoreClick={handleLearnMore} />
        
        <Portfolio />
        
        <FeaturesGrid />
        
        <StartSection onCtaClick={() => handleNavigate("cta")} />
        
        <Stats />
        
        <PricingSection onCtaClick={() => handleNavigate("cta")} />
        
        <Testimonials />

        <Faq />

        <CtaFooter
          onViewPricingClick={() => handleNavigate("pricing")}
          onOpenLegal={setLegalPage}
          isModalOpen={isLeadFormOpen}
          setIsModalOpen={setIsLeadFormOpen}
        />
      </div>

      {/* ANIME INTERACTIVE MODALS */}
      <AnimatePresence>
        {/* 1. Watch the Film Modal */}
        {activeModal === "film" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden aspect-video shadow-2xl z-10 flex flex-col justify-between"
              id="film-modal"
            >
              {/* Top Bar inside Video Modal */}
              <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-center pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-body font-light uppercase tracking-widest text-white/70">
                    Minato Club Web &bull; Présentation Officielle
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFilmMuted(!isFilmMuted)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    {isFilmMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Video Player in Modal */}
              <video
                autoPlay
                loop
                muted={isFilmMuted}
                playsInline
                className="w-full h-full object-cover relative z-0"
                id="film-modal-video"
              >
                <source 
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" 
                  type="video/mp4" 
                />
              </video>
            </motion.div>
          </div>
        )}

        {/* 2. Premium Pricing Modal */}
        {activeModal === "pricing" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              className="relative w-full max-w-6xl my-8 rounded-3xl bg-zinc-950 border border-white/10 p-8 md:p-12 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              id="pricing-modal"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="text-center flex flex-col items-center gap-3 mb-12">
                <span className="liquid-glass rounded-full px-3.5 py-1 text-[11px] uppercase tracking-widest text-white/50 font-body flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-white/80" /> Structure de l'investissement
                </span>
                <h3 className="text-4xl md:text-5xl font-heading italic text-white">
                  Abonnements transparents, axés sur la valeur.
                </h3>
                <p className="text-white/60 font-body font-light text-sm max-w-lg mt-1">
                  Création de logiciels sur mesure et livraison ultra-rapide. Choisissez le rythme de développement qui s'aligne sur les ambitions de votre marque.
                </p>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 items-stretch" id="pricing-tiers-grid">
                {pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
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
                      onClick={() => {
                        setActiveModal(null);
                        handleNavigate("cta");
                      }}
                      className={`mt-10 w-full py-3 rounded-full text-xs font-semibold font-body transition-all active:scale-98 cursor-pointer ${
                        tier.popular
                          ? "bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] border border-emerald-300/20"
                          : "liquid-glass-strong text-white border border-white/20 hover:border-white/40 hover:bg-white/5"
                      }`}
                    >
                      Lancer le projet
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* 3. Capabilities Learn More Detail Drawer */}
        {activeModal === "capability" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-white/15 p-8 shadow-2xl z-10 text-left"
              id="capability-modal"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-xs uppercase font-body tracking-wider text-white/50">
                    Analyse approfondie
                  </span>
                </div>

                {capabilityTopic === "performance" ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-heading italic text-white">
                      Conçu pour convertir. Pensé pour la performance.
                    </h3>
                    <p className="text-white/70 font-body font-light text-sm leading-relaxed">
                      Chaque site vitrine que nous concevons intègre les meilleures techniques de chargement rapide, d'ergonomie et de fluidité. Plus un site est rapide, plus vos clients de votre région (France, Belgique, Suisse) restent et vous contactent.
                    </p>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start mt-2">
                      <AlertCircle className="h-5 w-5 text-white/50 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-white">Rapidité optimale garantie</span>
                        <p className="text-xs text-white/50">Un site vitrine instantané sur mobile et ordinateur pour offrir une expérience irréprochable et rassurer vos visiteurs.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-heading italic text-white">
                      Une visibilité locale accrue.
                    </h3>
                    <p className="text-white/70 font-body font-light text-sm leading-relaxed">
                      Nous optimisons la structure de votre site vitrine pour les moteurs de recherche (SEO). Que vos clients soient en France, en Belgique ou en Suisse, ils vous trouveront plus facilement pour vos services et vos produits.
                    </p>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start mt-2">
                      <AlertCircle className="h-5 w-5 text-white/50 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-white">Référencement local (SEO)</span>
                        <p className="text-xs text-white/50">Configuration optimale pour ressortir dans les recherches locales sur Google et Google Maps dans votre ville.</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setActiveModal(null);
                    handleNavigate("cta");
                  }}
                  className="mt-4 w-full py-3 rounded-full bg-white text-black font-body font-semibold text-xs hover:bg-white/90 active:scale-98 transition-all cursor-pointer"
                >
                  Configurer mon projet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Informations légales (mentions, confidentialité, cookies) */}
      <LegalModal
        page={legalPage}
        onClose={() => setLegalPage(null)}
        onNavigate={setLegalPage}
      />

      {/* Bandeau cookies RGPD */}
      <CookieBanner onOpenCookies={() => setLegalPage("cookies")} />

      {/* CTA mobile collant + WhatsApp flottant */}
      <StickyCta onOpenForm={() => setIsLeadFormOpen(true)} />
    </div>
  );
}
