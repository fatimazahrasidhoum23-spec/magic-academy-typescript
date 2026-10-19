import { InMemoryRepository } from "./in-memory.repository";
import { IRepository } from "./repository.interface";
import { Wizard, NewWizard } from "../models/wizard";

/** Contrat d'un repository de sorciers (le service dépendra de ceci). */
export interface IWizardRepository extends IRepository<Wizard> {
  register(newWizard: NewWizard): Wizard;
  findByHouse(house: Wizard["house"]): Wizard[];
}

/** Repository spécialisé pour les sorciers de Poudlard. */
export class WizardRepository extends InMemoryRepository<Wizard> implements IWizardRepository {
  /** Exercice 1 — Enregistre un sorcier : l'appelant ne fournit pas l'id. */
  register(newWizard: NewWizard): Wizard {
    return this.add(newWizard);
  }

  /** Exercice 2 — Wizard["house"] est un type à accès indexé (= House). */
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.items.filter((wizard) => wizard.house === house);
  }
}