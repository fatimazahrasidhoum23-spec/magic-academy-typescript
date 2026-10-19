import { isHouse } from "./guards/is-house";
import { isWizard } from "./guards/is-wizard";

console.log("=== Exercice 6 : isHouse ===");
console.log('"Gryffindor" :', isHouse("Gryffindor"));  // true
console.log('"Hufflepuff" :', isHouse("Hufflepuff"));  // true
console.log('"Durmstrang" :', isHouse("Durmstrang"));  // false
console.log('"gryffindor" :', isHouse("gryffindor"));  // false (minuscule)
console.log("42 :", isHouse(42));                       // false

console.log("\n=== Exercice 6 : isWizard ===");

// Données "venues de l'extérieur" : TypeScript ne connaît pas leur type
const donnees: unknown[] = [
  { id: 1, name: "Luna Lovegood", house: "Ravenclaw", year: 4, wand: "Peut-être sorbier" },
  { id: 2, name: "Viktor Krum", house: "Durmstrang", year: 7, wand: "Charme, ventricule de dragon" },
  { id: 3, name: "Neville Londubat", house: "Gryffindor", wand: "Cerisier" },
  { id: 4, name: "Cedric Diggory", house: "Hufflepuff", year: 9, wand: "Frêne" },
  null,
  "Je suis un sorcier, promis",
];

for (const donnee of donnees) {
  if (isWizard(donnee)) {
    // Ici, TypeScript SAIT que donnee est un Wizard : l'autocomplétion marche
    console.log(`✅ ${donnee.name} (${donnee.house}, année ${donnee.year})`);
  } else {
    console.log("❌ Refusé :", JSON.stringify(donnee));
  }
}