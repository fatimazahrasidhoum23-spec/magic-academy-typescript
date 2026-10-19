import { WizardRepository } from "./repositories/wizard.repository";
import { EventBus, EventPublisher } from "./services/event-bus";
import { WizardService } from "./services/wizard.service";
import { handleSpellCast, handlePointsAwarded, handleWizardEnrolled } from "./services/event-handlers";
import { AcademyEvent } from "./models/events";

console.log("=== WizardService avec injection de dépendance ===\n");

// 1. On fabrique les outils ICI, dans main.ts
const bus = new EventBus();
bus.on("wizard-enrolled", handleWizardEnrolled);
bus.on("spell-cast", handleSpellCast);
bus.on("points-awarded", handlePointsAwarded);

// 2. On les INJECTE dans le service
const academy = new WizardService(new WizardRepository(), bus);

// 3. On utilise le service
const harry = academy.enroll({ name: "Harry Potter", house: "Gryffindor", year: 1, wand: "Houx" });
academy.enroll({ name: "Ron Weasley", house: "Gryffindor", year: 1, wand: "Saule" });
academy.enroll({ name: "Cho Chang", house: "Ravenclaw", year: 2, wand: "Inconnue" });

academy.castSpell(harry.id, "Expecto Patronum", 80);
academy.awardPoints("Gryffindor", 30, "Patronus réussi");

console.log("\nMembres de Gryffindor :", academy.getHouseMembers("Gryffindor"));

try {
  academy.castSpell(99, "Accio", 20);
} catch (error) {
  console.log("❌", (error as Error).message);
}

// 4. La preuve du principe D : on remplace l'EventBus par un autre objet
console.log("\n=== Même service, autre implémentation injectée ===");

class JournalDesEvenements implements EventPublisher {
  readonly journal: AcademyEvent[] = [];
  emit(event: AcademyEvent): void {
    this.journal.push(event);
  }
}

const journal = new JournalDesEvenements();
const academyTest = new WizardService(new WizardRepository(), journal);

academyTest.enroll({ name: "Luna Lovegood", house: "Ravenclaw", year: 4, wand: "Sorbier" });
academyTest.awardPoints("Ravenclaw", 10, "Réponse brillante");

console.log("Événements enregistrés dans le journal :", journal.journal.map((e) => e.type));