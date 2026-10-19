import { WizardRepository } from "./repositories/wizard.repository";

const wizards = new WizardRepository();

// ===== Exercice 1 : enregistrer des sorciers sans fournir d'id =====
console.log("=== Exercice 1 ===");

const harry = wizards.register({
  name: "Harry Potter",
  house: "Gryffindor",
  year: 1,
  wand: "Houx, plume de phénix",
});

const draco = wizards.register({
  name: "Draco Malfoy",
  house: "Slytherin",
  year: 1,
  wand: "Aubépine, crin de licorne",
});

const hermione = wizards.register({
  name: "Hermione Granger",
  house: "Gryffindor",
  year: 1,
  wand: "Vigne, ventricule de dragon",
});

console.log(`${harry.name} a reçu l'id ${harry.id}`);
console.log(`${draco.name} a reçu l'id ${draco.id}`);
console.log(`${hermione.name} a reçu l'id ${hermione.id}`);

// ===== Exercice 2 : filtrer par maison =====
console.log("\n=== Exercice 2 ===");

const gryffondors = wizards.findByHouse("Gryffindor");
console.log("Gryffindor :", gryffondors.map((w) => w.name));

const serpentards = wizards.findByHouse("Slytherin");
console.log("Slytherin :", serpentards.map((w) => w.name));

const serdaigles = wizards.findByHouse("Ravenclaw");
console.log("Ravenclaw :", serdaigles.map((w) => w.name));