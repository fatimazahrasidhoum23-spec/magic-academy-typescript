/**
 * Liste des quatre maisons officielles de Poudlard.
 * `as const` rend le tableau en lecture seule et garde les valeurs exactes.
 */
export const HOUSES = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] as const;

/**
 * Type House déduit automatiquement du tableau HOUSES.
 * Résultat : "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff"
 */
export type House = (typeof HOUSES)[number];



/** Record : un nombre de points pour chacune des 4 maisons. */
export type HousePoints = Record<House, number>;