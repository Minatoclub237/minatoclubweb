import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "mcw-cookie-consent";

interface CookieBannerProps {
  onOpenCookies: () => void;
}

export function CookieBanner({ onOpenCookies }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Affiché uniquement si l'utilisateur n'a pas encore validé.
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* stockage indisponible — on masque quand même le bandeau */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[55]"
          role="region"
          aria-label="Information sur les cookies"
        >
          <div className="liquid-glass-strong rounded-2xl border border-white/15 p-5 shadow-2xl bg-zinc-950/80">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                <Cookie className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs text-white/70 font-body font-light leading-relaxed">
                  Ce site n'utilise <strong className="text-white/90">aucun cookie de traçage ni de publicité</strong>,
                  uniquement un stockage strictement nécessaire à son fonctionnement.{" "}
                  <button
                    onClick={onOpenCookies}
                    className="text-white underline underline-offset-2 hover:text-white/80 cursor-pointer"
                  >
                    En savoir plus
                  </button>
                </p>
                <button
                  onClick={accept}
                  className="self-start bg-white text-black font-body font-semibold rounded-full px-5 py-2 text-xs hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
                >
                  J'ai compris
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
