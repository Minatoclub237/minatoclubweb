// Détection d'un petit écran (mobile). Sûr côté SSR (renvoie false si window absent).
export function isMobileViewport(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}
