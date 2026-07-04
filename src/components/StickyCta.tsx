import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/33644662163";

interface StickyCtaProps {
  onOpenForm: () => void;
}

export function StickyCta({ onOpenForm }: StickyCtaProps) {
  // On n'affiche la barre qu'une fois le hero passé, pour ne pas gêner l'entrée.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barre d'action collante — mobile uniquement */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black via-black/95 to-transparent"
          >
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenForm}
                data-umami-event="cta-sticky-devis"
                className="flex-1 bg-white text-black font-body font-semibold rounded-full px-5 py-3.5 text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
              >
                <span>Devis gratuit</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discuter sur WhatsApp"
                data-umami-event="whatsapp-sticky"
                className="shrink-0 bg-[#25D366] text-black rounded-full h-[50px] w-[50px] flex items-center justify-center active:scale-95 transition-transform shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
              >
                <MessageCircle className="h-5 w-5 fill-black" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp flottant — desktop uniquement (bas gauche, pour ne pas gêner le bandeau cookies) */}
      <AnimatePresence>
        {visible && (
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discuter sur WhatsApp"
            data-umami-event="whatsapp-float"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            className="hidden md:flex fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-black items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)]"
          >
            <MessageCircle className="h-6 w-6 fill-black" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
