// Génère des avatars "personnages" (DiceBear, libres de droits) en SVG statiques
// dans public/avatars/. Lancer une fois : `node scripts/gen-avatars.mjs`
// Les seeds correspondent, dans l'ordre, aux personas de src/components/Testimonials.tsx.
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { mkdirSync, writeFileSync } from "node:fs";

const seeds = [
  "Marc Vasseur", "Sophie Nguyen", "Karim Benali", "Élodie Rousseau",
  "Thomas Lefevre", "Camille Moreau", "Sandrine Laurent", "Julien Dubois",
  "Nadia El Amrani", "Pierre Vandenberghe", "Marie Lambert", "Jean-Pierre Dubois",
  "Laura Bianchi", "Marco Rossi", "Céline Favre", "Nicolas Meyer",
  "Aurélie Petit", "David Garcia",
];

const bg = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf", "e2f0cb"];

mkdirSync("public/avatars", { recursive: true });

seeds.forEach((seed, i) => {
  const svg = createAvatar(avataaars, {
    seed,
    radius: 50,
    backgroundType: ["solid"],
    backgroundColor: [bg[i % bg.length]],
  }).toString();
  const name = `t${String(i + 1).padStart(2, "0")}.svg`;
  writeFileSync(`public/avatars/${name}`, svg);
  console.log("écrit", name, `(${seed})`);
});
console.log(`\n${seeds.length} avatars générés dans public/avatars/`);
