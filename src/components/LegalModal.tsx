import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, ScrollText, Cookie } from "lucide-react";

export type LegalPage = "mentions" | "privacy" | "cookies";

interface LegalModalProps {
  page: LegalPage | null;
  onClose: () => void;
  onNavigate: (page: LegalPage) => void;
}

const CONTACT_EMAIL = "web-design-assistance@minatoclub.org";
const LAST_UPDATE = "4 juillet 2026";

const tabs: { id: LegalPage; label: string; icon: React.ReactNode }[] = [
  { id: "mentions", label: "Mentions légales", icon: <ScrollText className="h-3.5 w-3.5" /> },
  { id: "privacy", label: "Confidentialité", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
  { id: "cookies", label: "Cookies", icon: <Cookie className="h-3.5 w-3.5" /> },
];

export function LegalModal({ page, onClose, onNavigate }: LegalModalProps) {
  // Fermeture au clavier (accessibilité)
  useEffect(() => {
    if (!page) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, onClose]);

  return (
    <AnimatePresence>
      {page && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Informations légales"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl z-10 flex flex-col overflow-hidden"
          >
            {/* Header + onglets */}
            <div className="shrink-0 p-6 pb-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-body tracking-widest text-white/40">
                  Informations légales
                </span>
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex gap-1.5 flex-wrap">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onNavigate(t.id)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-body transition-colors cursor-pointer ${
                      page === t.id
                        ? "bg-white text-black font-semibold"
                        : "text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu défilant */}
            <div className="overflow-y-auto px-6 py-6 mt-2 text-left">
              {page === "mentions" && <MentionsContent />}
              {page === "privacy" && <PrivacyContent />}
              {page === "cookies" && <CookiesContent />}
              <p className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/30 font-body">
                Dernière mise à jour : {LAST_UPDATE}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Blocs de contenu ---------- */

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-heading italic text-white mb-4">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-body font-semibold text-white mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-white/70 font-body font-light leading-relaxed mb-2">{children}</p>;
}
function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-2 hover:text-white/80">
      {CONTACT_EMAIL}
    </a>
  );
}

function MentionsContent() {
  return (
    <div>
      <Title>Mentions légales</Title>

      <H3>Éditeur du site</H3>
      <P>
        Le présent site est édité par <strong className="text-white/90">Minato Club Web</strong> (nom commercial),
        studio de création de sites vitrines à destination des TPE et PME de France, Belgique et Suisse.
      </P>
      <P>Contact : <Mail />.</P>
      <P>Directeur de la publication : Minato Club Web.</P>

      <H3>Hébergement</H3>
      <P>
        Le site est hébergé par <strong className="text-white/90">Vercel Inc.</strong>, 340 S Lemon Ave #4133,
        Walnut, CA 91789, États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2 hover:text-white/80">vercel.com</a>.
        {" "}<span className="text-white/40">(À adapter si le site est hébergé ailleurs.)</span>
      </P>

      <H3>Propriété intellectuelle</H3>
      <P>
        L'ensemble des contenus de ce site (textes, visuels, éléments graphiques, code, marque « Minato Club Web »)
        est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou exploitation,
        totale ou partielle, sans autorisation écrite préalable, est interdite.
      </P>

      <H3>Responsabilité</H3>
      <P>
        Minato Club Web s'efforce d'assurer l'exactitude des informations diffusées sur ce site, sans pouvoir en
        garantir l'exhaustivité. Les prix et prestations indiqués sont donnés à titre indicatif et peuvent évoluer ;
        seul le devis signé fait foi.
      </P>

      <H3>Données personnelles</H3>
      <P>
        Le traitement de vos données est décrit dans notre politique de confidentialité (onglet « Confidentialité »).
        Pour toute question, écrivez à <Mail />.
      </P>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div>
      <Title>Politique de confidentialité</Title>
      <P>
        Minato Club Web accorde une grande importance à la protection de vos données personnelles, conformément au
        Règlement Général sur la Protection des Données (RGPD — UE 2016/679).
      </P>

      <H3>Responsable du traitement</H3>
      <P>Minato Club Web — contact : <Mail />.</P>

      <H3>Données collectées</H3>
      <P>
        Via notre formulaire de contact, nous collectons uniquement : votre nom, votre adresse e-mail, votre numéro
        de téléphone et, le cas échéant, le message que vous nous adressez. Aucune donnée n'est collectée à votre insu.
      </P>

      <H3>Finalité et base légale</H3>
      <P>
        Ces données servent exclusivement à répondre à votre demande de contact ou de devis et à assurer le suivi de
        notre échange. La base légale du traitement est votre <strong className="text-white/90">consentement</strong>{" "}
        (art. 6.1.a du RGPD), recueilli lors de l'envoi du formulaire.
      </P>

      <H3>Destinataires et sous-traitants</H3>
      <P>
        Vos données sont destinées à la seule équipe de Minato Club Web. L'acheminement des messages du formulaire est
        assuré par le service technique <strong className="text-white/90">FormSubmit</strong> (formsubmit.co), agissant
        comme sous-traitant. Vos données ne sont jamais vendues ni cédées à des tiers à des fins commerciales.
      </P>

      <H3>Durée de conservation</H3>
      <P>
        Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées au
        maximum <strong className="text-white/90">3 ans</strong> à compter de notre dernier contact, avant suppression.
      </P>

      <H3>Vos droits</H3>
      <P>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité
        de vos données. Pour les exercer, écrivez à <Mail />. Vous pouvez également introduire une réclamation auprès de
        la CNIL (france : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2 hover:text-white/80">cnil.fr</a>),
        de l'APD en Belgique, ou du PFPDT en Suisse.
      </P>
    </div>
  );
}

function CookiesContent() {
  return (
    <div>
      <Title>Gestion des cookies</Title>
      <P>
        Nous avons fait le choix de la sobriété : ce site{" "}
        <strong className="text-white/90">n'utilise aucun cookie de publicité, de traçage ou de profilage</strong>,
        et aucun outil d'analyse d'audience tiers (type Google Analytics) n'est chargé sans votre accord.
      </P>

      <H3>Cookies strictement nécessaires</H3>
      <P>
        Seul un stockage local technique est utilisé pour mémoriser que vous avez pris connaissance de ce bandeau, afin
        de ne pas le réafficher à chaque visite. Il ne contient aucune donnée personnelle et n'est pas partagé.
      </P>

      <H3>Contenus vidéo tiers</H3>
      <P>
        Certaines vidéos d'illustration sont diffusées via des services d'hébergement vidéo tiers, qui peuvent déposer
        des cookies techniques nécessaires à la lecture. Vous pouvez les bloquer via les réglages de votre navigateur.
      </P>

      <H3>Vos réglages</H3>
      <P>
        Vous pouvez à tout moment supprimer les données stockées par ce site depuis les paramètres de votre navigateur.
        Pour toute question : <Mail />.
      </P>
    </div>
  );
}
