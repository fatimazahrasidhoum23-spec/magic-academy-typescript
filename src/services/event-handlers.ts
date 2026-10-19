import { SpellCastEvent, EventOf } from "../models/events";

/**
 * Exercice 3 — Gestionnaire qui n'accepte QUE les événements de lancement de sort.
 * Grâce à Extract, on ne peut pas lui passer un autre type d'événement.
 */
export function handleSpellCast(event: SpellCastEvent): void {
  const niveau = event.power >= 50 ? "puissant 💥" : "léger ✨";
  console.log(
    `🪄 Le sorcier n°${event.wizardId} lance « ${event.spell} » (puissance ${event.power}, sort ${niveau})`
  );
}

/** Gestionnaire des points attribués aux maisons. */
export function handlePointsAwarded(event: EventOf<"points-awarded">): void {
  const signe = event.points >= 0 ? "+" : "";
  console.log(`🏆 ${event.house} ${signe}${event.points} points : ${event.reason}`);
}

/** Gestionnaire des nouvelles inscriptions. */
export function handleWizardEnrolled(event: EventOf<"wizard-enrolled">): void {
  console.log(`🎓 Bienvenue à ${event.wizard.name}, envoyé(e) à ${event.wizard.house} !`);
}