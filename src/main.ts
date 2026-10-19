/**
 * Point d'entrée de l'Académie de Poudlard.
 * Ce fichier crée les objets, les relie entre eux (injection de dépendance)
 * puis lance une démonstration par exercice.
 */
import { WizardRepository } from "./repositories/wizard.repository";
import { SpellRepository } from "./repositories/spell.repository";
import { EventBus } from "./services/event-bus";
import { WizardService } from "./services/wizard.service";
import { SpellCalculatorService, DamageArgs, DamageResult } from "./services/spell-calculator.service";
import { handleSpellCast, handlePointsAwarded, handleWizardEnrolled } from "./services/event-handlers";
import { isHouse } from "./guards/is-house";
import { isWizard } from "./guards/is-wizard";
import { HousePoints } from "./models/house";
import { WizardUpdate } from "./models/wizard";
import { SpellCastEvent, NonSpellEvent } from "./models/events";

// =====================================================
//  Composition : on crée et on relie les objets ici
// =====================================================
const wizardRepository = new WizardRepository();
const spellRepository = new SpellRepository();
const eventBus = new EventBus();
const academy = new WizardService(wizardRepository, eventBus);
const calculator = new SpellCalculatorService();

eventBus.on("wizard-enrolled", handleWizardEnrolled);
eventBus.on("spell-cast", handleSpellCast);
eventBus.on("points-awarded", handlePointsAwarded);

/** Affiche un titre de section. */
function title(text: string): void {
  console.log(`\n========== ${text} ==========`);
}

// =====================================================
//  Démonstrations
// =====================================================

function exercise1(): void {
  title("Exercice 1 — Ajouter un sorcier (Omit)");
  const harry = academy.enroll({ name: "Harry Potter", house: "Gryffindor", year: 1, wand: "Houx, plume de phénix" });
  const hermione = academy.enroll({ name: "Hermione Granger", house: "Gryffindor", year: 1, wand: "Vigne" });
  academy.enroll({ name: "Draco Malfoy", house: "Slytherin", year: 1, wand: "Aubépine" });
  academy.enroll({ name: "Luna Lovegood", house: "Ravenclaw", year: 4, wand: "Sorbier" });
  console.log(`Ids attribués automatiquement : ${harry.name} → ${harry.id}, ${hermione.name} → ${hermione.id}`);
}

function exercise2(): void {
  title("Exercice 2 — Filtrer par maison");
  console.log("Gryffindor :", academy.getHouseMembers("Gryffindor"));
  console.log("Slytherin  :", academy.getHouseMembers("Slytherin"));
  console.log("Hufflepuff :", academy.getHouseMembers("Hufflepuff"));
}

function exercise3(): void {
  title("Exercice 3 — Événements de sort (Extract)");
  const event: SpellCastEvent = { type: "spell-cast", wizardId: 1, spell: "Expelliarmus", power: 50 };
  handleSpellCast(event);
  academy.castSpell(2, "Wingardium Leviosa", 15);
  academy.awardPoints("Gryffindor", 20, "Plume parfaitement lévitée");
}

function exercise4(): void {
  title("Exercice 4 — Valider la puissance (décorateur)");
  const lumos = spellRepository.add({ name: "Lumos", incantation: "Lumos !", power: 10 });
  console.log("✅ Sort accepté :", lumos);
  try {
    spellRepository.add({ name: "Sortilège raté", incantation: "Oups !", power: -20 });
  } catch (error) {
    console.log("❌", (error as Error).message);
  }
  console.log("Sorts enregistrés :", spellRepository.findAll().map((spell) => spell.name));
}

function exercise5(): void {
  title("Exercice 5 — Cache avec Map (décorateur)");
  const args: DamageArgs = [50, 3];
  const first: DamageResult = calculator.calculateDamage(...args);
  const second: DamageResult = calculator.calculateDamage(...args);
  console.log(`Résultats : ${first} et ${second}`);
  console.log("Calculs réels effectués :", calculator.getComputationCount());
}

function exercise6(): void {
  title("Exercice 6 — Type guards stricts");
  console.log('isHouse("Ravenclaw")  :', isHouse("Ravenclaw"));
  console.log('isHouse("Durmstrang") :', isHouse("Durmstrang"));

  const externalData: unknown[] = [
    { id: 10, name: "Cedric Diggory", house: "Hufflepuff", year: 6, wand: "Frêne" },
    { id: 11, name: "Viktor Krum", house: "Durmstrang", year: 7, wand: "Charme" },
  ];
  for (const data of externalData) {
    console.log(isWizard(data) ? `✅ ${data.name} est un sorcier valide` : `❌ Refusé : ${JSON.stringify(data)}`);
  }
}

function utilityTypes(): void {
  title("Utility Types — Partial, Record, Exclude");
  const update: WizardUpdate = { year: 2 };
  console.log("Partial (seulement les champs à changer) :", update);

  const houseCup: HousePoints = { Gryffindor: 482, Slytherin: 472, Ravenclaw: 426, Hufflepuff: 352 };
  const winner = (Object.keys(houseCup) as (keyof HousePoints)[]).reduce((a, b) => (houseCup[a] >= houseCup[b] ? a : b));
  console.log("Record (Coupe des Quatre Maisons) :", houseCup, "→ gagnant :", winner);

  const duel: NonSpellEvent = { type: "duel", winnerId: 1, loserId: 3 };
  console.log("Exclude (événement qui n'est pas un sort) :", duel);
}

function main(): void {
  console.log("🏰 Bienvenue à l'Académie de Poudlard !");
  exercise1();
  exercise2();
  exercise3();
  exercise4();
  exercise5();
  exercise6();
  utilityTypes();
  console.log("\n✨ Toutes les démonstrations sont terminées.");
}

main();