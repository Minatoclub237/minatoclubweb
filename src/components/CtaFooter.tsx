import React, { useEffect, useRef, useState } from "react";
import type HlsType from "hls.js"; // type uniquement (effacé à la compilation, 0 Ko runtime)
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, X, MessageCircle, ShieldCheck, Clock, Award } from "lucide-react";
import { track } from "../lib/analytics";
import { CountryFlag } from "./CountryFlag";

interface CtaFooterProps {
  onViewPricingClick: () => void;
  onOpenLegal: (page: "mentions" | "privacy" | "cookies") => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export function CtaFooter({ onViewPricingClick, onOpenLegal, isModalOpen, setIsModalOpen }: CtaFooterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl =
    "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const countries = [
    { code: "+33", iso: "FR", name: "France" },
    { code: "+32", iso: "BE", name: "Belgique" },
    { code: "+41", iso: "CH", name: "Suisse" },
  ];
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: HlsType | null = null;
    let cancelled = false;

    // On ne charge la vidéo (et hls.js) que lorsque le footer approche du viewport.
    const setup = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari / iOS : lecture HLS native, pas besoin de hls.js
        video.src = videoUrl;
        video.play?.().catch(() => {});
        return;
      }
      // Import dynamique : hls.js (~150 Ko) sort du bundle initial
      const { default: Hls } = await import("hls.js");
      if (cancelled || !videoRef.current) return;
      if (Hls.isSupported()) {
        hls = new Hls({ maxMaxBufferLength: 10, enableWorker: true });
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        video.play?.().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          setup();
        }
      },
      { rootMargin: "300px" } // on précharge un peu avant l'arrivée à l'écran
    );
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (hls) hls.destroy();
    };
  }, [videoUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !consent) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("https://formsubmit.co/ajax/web-design-assistance@minatoclub.org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Nom complet": formData.name,
          "Téléphone": `${selectedCountry.code} ${formData.phone}`,
          "Email": formData.email,
          "Message": formData.message || "Aucun message de précisé",
          "_subject": `Nouveau contact de ${formData.name}`,
          "_replyto": formData.email,
          "_honey": "" // honeypot to prevent spam
        })
      });
      
      if (response.ok) {
        track("lead-form-submit", { country: selectedCountry.name });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
          setConsent(false);
        }, 4000);
      } else {
        setSubmitError("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Erreur de connexion. Veuillez vérifier votre réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden w-full flex flex-col justify-between pt-32 pb-12 bg-black min-h-[700px] text-white"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0" id="cta-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          id="cta-video"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Top Gradient Fade (200px) */}
        <div
          className="absolute top-0 left-0 right-0 h-[200px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #000000, transparent)",
          }}
        />

        {/* Bottom Gradient Fade (200px) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[200px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #000000, transparent)",
          }}
        />
      </div>

      {/* Content Container (z-30) */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8 my-auto">
        {/* Big display title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] max-w-3xl tracking-tight"
          id="cta-heading"
        >
          Votre prochain site commence ici.
        </motion.h2>

        {/* High readability subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-white/70 font-body font-light text-sm md:text-base max-w-xl leading-relaxed"
          id="cta-subtext"
        >
          Réservez un échange stratégique offert. Découvrez l'impact d'un site web d'exception conçu sur mesure pour propulser votre entreprise locale en France, Belgique et Suisse. Sans engagement, sans pression.
        </motion.p>

        {/* Interactive CTA buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
          id="cta-buttons-container"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            data-umami-event="cta-open-form"
            className="liquid-glass-strong rounded-full px-7 py-3.5 text-sm font-semibold text-white flex items-center gap-2 hover:bg-white/10 border border-white/25 hover:border-white/45 transition-all duration-300 cursor-pointer active:scale-95 shadow-lg"
          >
            <span>Réserver un appel</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <a
            href="https://wa.me/33644662163"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="whatsapp-cta"
            className="bg-[#25D366] text-black font-body font-semibold rounded-full px-7 py-3.5 text-sm hover:bg-[#20ba5a] active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.3)] cursor-pointer inline-flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4 fill-black" />
            <span>Discuter sur WhatsApp</span>
          </a>
        </motion.div>

        {/* Bande de garanties (renversement du risque) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 mt-2"
        >
          <span className="flex items-center gap-2 text-xs md:text-sm text-white/60 font-body font-light">
            <ShieldCheck className="h-4 w-4 text-emerald-400/80 shrink-0" />
            Maquette validée avant tout paiement
          </span>
          <span className="flex items-center gap-2 text-xs md:text-sm text-white/60 font-body font-light">
            <Clock className="h-4 w-4 text-emerald-400/80 shrink-0" />
            Site livré en 2 jours
          </span>
          <span className="flex items-center gap-2 text-xs md:text-sm text-white/60 font-body font-light">
            <Award className="h-4 w-4 text-emerald-400/80 shrink-0" />
            Site 100&nbsp;% votre propriété
          </span>
        </motion.div>

        {/* Urgence honnête (places réellement limitées) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-2 text-xs text-amber-300/80 font-body font-light"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Places limitées : nous accompagnons un nombre restreint de projets chaque mois pour garantir la qualité.
        </motion.p>
      </div>

      {/* Footer Bar (z-30) */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full mt-24">
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left copyright */}
          <div className="text-white/40 text-xs font-body font-light">
            &copy; 2026 Minato Club Web. Tous droits réservés. Conçu avec soin pour les TPE & PME.
          </div>
          {/* Right compliance links */}
          <div className="flex gap-6 text-white/40 text-xs font-body font-light">
            <button
              onClick={() => onOpenLegal("mentions")}
              className="hover:text-white/80 transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <button
              onClick={() => onOpenLegal("privacy")}
              className="hover:text-white/80 transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <a
              href="mailto:web-design-assistance@minatoclub.org"
              className="hover:text-white/80 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Pop-up Strategy Call Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-md p-8 rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-heading italic text-white">
                    Demande bien reçue !
                  </h3>
                  <p className="text-white/60 font-body font-light text-sm">
                    Merci. Notre équipe revient vers vous par e-mail sous 24&nbsp;h ouvrées pour convenir d'un échange. Pensez à vérifier vos courriers indésirables.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs uppercase font-body tracking-wider text-white/50">
                      Découverte
                    </span>
                    <h3 className="text-3xl font-heading italic text-white leading-tight">
                      Bâtissons quelque chose d'exceptionnel.
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-body text-white/60">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white/40 focus:outline-none text-white text-sm transition-colors font-body"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                      <label className="text-xs font-body text-white/60">
                        Téléphone portable
                      </label>
                      <div className="flex gap-2">
                        {/* Flag Selector Dropdown */}
                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="h-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 hover:bg-white/[0.06] hover:border-white/25 focus:outline-none text-white text-sm flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <CountryFlag iso={selectedCountry.iso} />
                            <span className="text-xs text-white/80 font-mono">{selectedCountry.code}</span>
                            <span className="text-[9px] text-white/40">▼</span>
                          </button>

                          {isDropdownOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsDropdownOpen(false)}
                              />
                              <div className="absolute top-full left-0 mt-1.5 w-44 rounded-xl bg-zinc-900 border border-white/15 shadow-2xl overflow-hidden z-50 flex flex-col backdrop-blur-md">
                                {countries.map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="px-3.5 py-2.5 hover:bg-white/10 text-left text-xs text-white flex items-center gap-2.5 transition-colors cursor-pointer w-full"
                                  >
                                    <CountryFlag iso={c.iso} />
                                    <span className="font-medium text-white/90">{c.name}</span>
                                    <span className="font-mono text-white/40 ml-auto">{c.code}</span>
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Phone Input */}
                        <input
                          type="tel"
                          required
                          placeholder="06 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white/40 focus:outline-none text-white text-sm transition-colors font-body"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-body text-white/60">
                        Adresse e-mail professionnelle
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jean@votreentreprise.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white/40 focus:outline-none text-white text-sm transition-colors font-body"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-body text-white/60">
                        Parlez-nous de votre marque (facultatif)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Décrivez brièvement votre vision pour votre site web..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white/40 focus:outline-none text-white text-sm transition-colors font-body resize-none"
                      />
                    </div>

                    {/* Consentement RGPD */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none mt-1">
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-400 cursor-pointer"
                      />
                      <span className="text-[11px] leading-relaxed text-white/50 font-body font-light">
                        J'accepte que mes données soient utilisées pour être recontacté(e) au sujet de ma demande,
                        conformément à la{" "}
                        <button
                          type="button"
                          onClick={() => onOpenLegal("privacy")}
                          className="text-white/80 underline underline-offset-2 hover:text-white cursor-pointer"
                        >
                          politique de confidentialité
                        </button>
                        .
                      </span>
                    </label>

                    {submitError && (
                      <p className="text-xs text-rose-400 font-body text-center bg-rose-500/10 border border-rose-500/20 rounded-xl py-2 px-3">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !consent}
                      className="mt-2 w-full py-3 rounded-full bg-white text-black font-body font-semibold hover:bg-white/90 active:scale-98 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin inline-block" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        "Confirmer ma session offerte"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
