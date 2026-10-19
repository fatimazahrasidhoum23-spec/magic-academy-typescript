import { Wizard } from "../models/wizard";
import { isHouse } from "./is-house";

/**
 * Exercice 6 — Type guard strict pour un sorcier.
 * Vérifie chaque propriété, et que house est une vraie maison de Poudlard.
 */
export function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.year === "number" &&
    candidate.year >= 1 &&
    candidate.year <= 7 &&
    typeof candidate.wand === "string"
  );
}