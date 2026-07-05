import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin, ExternalLink } from "lucide-react";

export function Portfolio() {
  const projects = [
    {
      title: "Le Fournil Doré",
      location: "Lyon, France",
      category: "Boulangerie & Restauration",
      description: "Site vitrine gourmand : fournées du jour, horaires et click & collect pour une boulangerie-pâtisserie artisanale française.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      link: "https://wa.me/33644662163",
    },
    {
      title: "Maison Royauté",
      location: "Genève, Suisse",
      category: "Joaillerie & Horlogerie",
      description: "Écrin numérique immersif présentant des créations de haute joaillerie suisse, avec mise en scène 3D des pièces d'exception.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      link: "https://royaute-swiss.vercel.app/",
    },
    {
      title: "Baldwin & Berges",
      location: "Bruxelles, Belgique",
      category: "Immobilier de prestige",
      description: "Vitrine immobilière élégante : biens de prestige, visites immersives et prise de contact fluide pour une agence belge haut de gamme.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      link: "https://immobilier-3-xc.vercel.app/",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.015] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body"
            id="portfolio-badge"
          >
            Nos Réalisations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.95]"
            id="portfolio-heading"
          >
            Des univers 3D immersifs conçus pour chaque secteur
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/72 font-body font-light text-sm md:text-base max-w-xl mt-2"
          >
            Découvrez des exemples concrets de sites vitrines créés pour des commerces de proximité et des professionnels locaux.
          </motion.p>
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          id="portfolio-grid"
        >
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="portfolio-demo"
              data-umami-event-projet={project.location}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="liquid-glass rounded-3xl overflow-hidden border border-white/[0.05] group hover:bg-white/[0.02] transition-colors duration-500 flex flex-col justify-between shadow-2xl h-full cursor-pointer block"
            >
              {/* Image & Category Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                
                {/* Location Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 liquid-glass-strong rounded-full px-3 py-1 border border-white/10 text-[11px] font-body font-light text-white">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{project.location}</span>
                </div>

                <img
                  src={project.image}
                  alt={project.category}
                  className="w-full h-full object-cover relative z-0 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-body uppercase tracking-wider text-white/66">
                    {project.category}
                  </span>
                  <p className="text-white/72 font-body font-light text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* View Project Action */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center group-hover:border-white/10 transition-colors">
                  <span className="text-xs font-body font-medium text-white/56 group-hover:text-white/80 transition-colors">
                    Voir la démo
                  </span>
                  <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/72 group-hover:text-black group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
