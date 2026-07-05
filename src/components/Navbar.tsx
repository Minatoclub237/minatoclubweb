import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", id: "home" },
    { name: "Réalisations", id: "work" },
    { name: "Services", id: "services" },
    { name: "Processus", id: "process" },
    { name: "Tarifs", id: "pricing" },
    { name: "FAQ", id: "faq" },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-6 md:px-8 lg:px-16"
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "home")}
          className="flex items-center gap-2.5 group"
          id="logo-link"
        >
          <div className="relative h-11 w-11 rounded-full flex items-center justify-center overflow-hidden liquid-glass-strong border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/40 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            {/* Monogramme MCW (plus d'image externe cassée) */}
            <span className="font-heading italic text-sm tracking-tight text-white select-none relative z-10">MCW</span>
          </div>
          {/* Texte de marque masqué sur très petits écrans pour laisser la place au menu */}
          <span className="hidden sm:inline font-heading italic text-xl tracking-wide text-white group-hover:opacity-80 transition-opacity">
            MINATO CLUB WEB
          </span>
        </a>

        {/* Center Navigation Pill (Desktop only) */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-2 py-1 gap-1" id="nav-pill">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="px-4 py-2 text-sm font-medium text-foreground/80 font-body hover:text-white transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
        </div>

        {/* Right Side: CTA + Burger (mobile) */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => handleLinkClick(e, "cta")}
            data-umami-event="cta-nav-devis"
            className="bg-white text-black font-body font-semibold rounded-full px-4.5 py-2 text-xs md:text-sm flex items-center gap-1.5 hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
            id="nav-get-started-btn"
          >
            <span>Devis gratuit</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>

          {/* Bouton menu (mobile uniquement) */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            className="md:hidden h-10 w-10 rounded-full liquid-glass-strong border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform cursor-pointer shrink-0"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl border border-white/15 bg-zinc-950/95 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="px-5 py-3.5 rounded-2xl text-white/90 font-body font-medium text-base hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
