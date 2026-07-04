// Helper de tracking Umami (sans cookie, RGPD-friendly).
// Sans script chargé (ou ID placeholder), les appels sont silencieusement ignorés.

type UmamiTrack = (event: string, data?: Record<string, unknown>) => void;

export function track(event: string, data?: Record<string, unknown>): void {
  try {
    const umami = (window as unknown as { umami?: { track: UmamiTrack } }).umami;
    umami?.track(event, data);
  } catch {
    /* analytics ne doit jamais casser l'app */
  }
}
