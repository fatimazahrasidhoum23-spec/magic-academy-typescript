import { InMemoryRepository } from "./in-memory.repository";
import { Spell, NewSpell } from "../models/spell";
import { ValidateSpellPower } from "../decorators/validate-spell-power";

/** Repository des sorts de Poudlard. */
export class SpellRepository extends InMemoryRepository<Spell> {
  /**
   * Exercice 4 — add() est protégée par le décorateur :
   * un sort de puissance négative est refusé.
   */
  @ValidateSpellPower
  override add(spell: NewSpell): Spell {
    return super.add(spell);
  }
}