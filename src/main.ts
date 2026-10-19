import { EventBus } from "./services/event-bus";
import {
  handleSpellCast,
  handlePointsAwarded,
  handleWizardEnrolled,
} from "./services/event-handlers";

console.log("=== Exercice 3 + Événements ===\n");

const bus = new EventBus();

// Abonnements
bus.on("wizard-enrolled", handleWizardEnrolled);
const stopEcouteSorts = bus.on("spell-cast", handleSpellCast);
bus.on("points-awarded", handlePointsAwarded);

// Envoi d'événements
bus.emit({
  type: "wizard-enrolled",
  wizard: { id: 1, name: "Harry Potter", house: "Gryffindor", year: 1, wand: "Houx" },
});
bus.emit({ type: "spell-cast", wizardId: 1, spell: "Expelliarmus", power: 50 });
bus.emit({ type: "spell-cast", wizardId: 1, spell: "Lumos", power: 10 });
bus.emit({ type: "points-awarded", house: "Gryffindor", points: 50, reason: "Courage exceptionnel" });
bus.emit({ type: "points-awarded", house: "Slytherin", points: -10, reason: "Insolence" });

// Personne n'écoute les duels : rien ne s'affiche, et pas d'erreur
bus.emit({ type: "duel", winnerId: 1, loserId: 2 });

// Désabonnement
console.log("\n-- Désabonnement des sorts --");
stopEcouteSorts();
bus.emit({ type: "spell-cast", wizardId: 2, spell: "Avada Kedavra", power: 999 });
console.log("(aucun sort affiché : on n'écoute plus)");