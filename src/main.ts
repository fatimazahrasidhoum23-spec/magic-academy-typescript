import { SpellRepository } from "./repositories/spell.repository";

const spells = new SpellRepository();

console.log("=== Exercice 4 ===");

// ✅ Sort valide
const expelliarmus = spells.add({
  name: "Expelliarmus",
  incantation: "Expelliarmus !",
  power: 50,
});
console.log("✅ Sort ajouté :", expelliarmus);

// ✅ Puissance 0 : accepté (seul "inférieur à zéro" est refusé)
const lumos = spells.add({ name: "Lumos", incantation: "Lumos !", power: 0 });
console.log("✅ Sort ajouté :", lumos);

// ❌ Sort invalide : puissance négative
try {
  spells.add({ name: "Sortilège raté", incantation: "Oups !", power: -20 });
  console.log("Ce message ne doit jamais s'afficher");
} catch (error) {
  console.log("❌", (error as Error).message);
}

console.log("Sorts enregistrés :", spells.findAll().map((s) => s.name));
