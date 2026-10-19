import { HOUSES, House } from "../models/house";

/**
 * Exercice 6 — Type guard : vérifie que la valeur est une des 4 maisons.
 * "value is House" est un prédicat de type : si la fonction renvoie true,
 * TypeScript considère ensuite que value est une House.
 */
export function isHouse(value: unknown): value is House {
  return typeof value === "string" && (HOUSES as readonly string[]).includes(value);
}