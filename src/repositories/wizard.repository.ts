import { InMemoryRepository } from "./in-memory.repository";
import { Wizard, NewWizard } from "../models/wizard";

/** Repository spécialisé pour les sorciers de Poudlard. */
export class WizardRepository extends InMemoryRepository<Wizard> {
  /**
   * Exercice 1 — Enregistre un nouveau sorcier.
   * L'appelant donne un NewWizard (sans id), le repository attribue l'id.
   */
  register(newWizard: NewWizard): Wizard {
    return this.add(newWizard);
  }

  /**
   * Exercice 2 — Retourne tous les sorciers d'une maison.
   * Wizard["house"] est un type à accès indexé : il vaut House.
   */
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.items.filter((wizard) => wizard.house === house);
  }
}