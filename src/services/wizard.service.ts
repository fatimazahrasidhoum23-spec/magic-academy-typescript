import { IWizardRepository } from "../repositories/wizard.repository";
import { EventPublisher } from "./event-bus";
import { Wizard, NewWizard, WizardPreview } from "../models/wizard";
import { House } from "../models/house";

/**
 * Logique métier de l'Académie.
 * Les dépendances sont injectées par le constructeur (principe D de SOLID) :
 * le service ne connaît que des interfaces, jamais les classes concrètes.
 */
export class WizardService {
  constructor(
    private readonly wizards: IWizardRepository,
    private readonly events: EventPublisher
  ) {}

  /** Inscrit un sorcier, puis prévient tout le monde. */
  enroll(data: NewWizard): Wizard {
    const wizard = this.wizards.register(data);
    this.events.emit({ type: "wizard-enrolled", wizard });
    return wizard;
  }

  /** Liste courte (nom + maison) des membres d'une maison. */
  getHouseMembers(house: House): WizardPreview[] {
    return this.wizards.findByHouse(house).map(({ name, house }) => ({ name, house }));
  }

  /** Un sorcier lance un sort. Il doit être inscrit. */
  castSpell(wizardId: number, spell: string, power: number): void {
    const wizard = this.wizards.findById(wizardId);
    if (!wizard) {
      throw new Error(`Aucun sorcier inscrit avec l'id ${wizardId}.`);
    }
    this.events.emit({ type: "spell-cast", wizardId, spell, power });
  }

  /** Attribue (ou retire) des points à une maison. */
  awardPoints(house: House, points: number, reason: string): void {
    this.events.emit({ type: "points-awarded", house, points, reason });
  }
}