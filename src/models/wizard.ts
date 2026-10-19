import { House } from "./house";

/** Un sorcier inscrit à l'Académie de Poudlard. */
export interface Wizard {
  readonly id: number;
  name: string;
  house: House;
  year: number;
  wand: string;
}

/** Exercice 1 — Omit : tout sauf "id". C'est le repository qui donnera l'id. */
export type NewWizard = Omit<Wizard, "id">;

/** Pick : on garde seulement le nom et la maison. */
export type WizardPreview = Pick<Wizard, "name" | "house">;

/** Partial : toutes les propriétés deviennent optionnelles. */
export type WizardUpdate = Partial<NewWizard>;