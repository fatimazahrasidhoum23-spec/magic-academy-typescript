import { House } from "./house";
import { Wizard } from "./wizard";

/**
 * Union discriminée : chaque événement a un "type" différent.
 * Le champ "type" permet à TypeScript de savoir de quel événement il s'agit.
 */
export type AcademyEvent =
  | { type: "wizard-enrolled"; wizard: Wizard }
  | { type: "spell-cast"; wizardId: number; spell: string; power: number }
  | { type: "points-awarded"; house: House; points: number; reason: string }
  | { type: "duel"; winnerId: number; loserId: number };

/** Tous les noms d'événements : "wizard-enrolled" | "spell-cast" | ... */
export type AcademyEventType = AcademyEvent["type"];

/** Exercice 3 — Extract : on garde SEULEMENT l'événement "spell-cast". */
export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;

/** Exclude : tous les événements SAUF "spell-cast". */
export type NonSpellEvent = Exclude<AcademyEvent, { type: "spell-cast" }>;

/** Version générique : l'événement qui correspond à un type donné. */
export type EventOf<K extends AcademyEventType> = Extract<AcademyEvent, { type: K }>;