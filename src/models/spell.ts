/** Un sort enseigné à Poudlard. */
export interface Spell {
  readonly id: number;
  name: string;
  incantation: string;
  power: number;
}

/** Omit : un nouveau sort sans id. C'est le repository qui le donnera. */
export type NewSpell = Omit<Spell, "id">;