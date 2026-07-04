import React, { useEffect, useRef } from "react";
import type HlsType from "hls.js"; // type uniquement (0 Ko runtime)
import { motion } from "motion/react";
import { isMobileViewport } from "../lib/device";

export function Stats() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl =
    "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Pas de vidéo de fond sur mobile (fluidité).
    if (isMobileViewport()) return;

    let hls: HlsType | null = null;
    let cancelled = false;

    // Vidéo (et hls.js) chargées seulement à l'approche du viewport.
    const setup = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
        video.play?.().catch(() => {});
        return;
      }
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
      { rootMargin: "300px" }
    );
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (hls) hls.destroy();
    };
  }, [videoUrl]);

  const stats = [
    { value: "200+", label: "Sites vitrines livrés" },
    { value: "98%", label: "Satisfaction client" },
    { value: "3.2x", label: "Plus de conversions" },
    { value: "2 jours", label: "Livraison moyenne" },
  ];

  return (
    <section className="relative overflow-hidden w-full flex items-center justify-center py-24 md:py-32 bg-black min-h-[500px]">
      {/* Background Video (HLS stream desaturated) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0" id="stats-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ filter: "saturate(0)" }}
          id="stats-video"
        />
        {/* Dark film grain style overlay */}
        <div className="absolute inset-0 bg-black/45 z-10" />

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

      {/* Floating Glass Stats Board Container */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="liquid-glass rounded-3xl p-10 md:p-16 border border-white/[0.08] bg-white/[0.01] backdrop-blur-md shadow-2xl relative"
          id="stats-card"
        >
          {/* Subtle inside glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-white/[0.03] pointer-events-none rounded-3xl" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center relative z-10" id="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Value animation */}
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-none tracking-tight"
                >
                  {stat.value}
                </motion.span>
                {/* Label */}
                <span className="text-white/60 font-body font-light text-sm tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
