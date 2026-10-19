import { AcademyEvent, AcademyEventType, EventOf } from "../models/events";

/** Une fonction qui reçoit un événement d'un type précis. */
export type EventHandler<K extends AcademyEventType> = (event: EventOf<K>) => void;

/**
 * Le service a seulement besoin d'ENVOYER des événements.
 * On lui donne donc une petite interface avec juste emit() (principe I de SOLID).
 */
export interface EventPublisher {
  emit(event: AcademyEvent): void;
}

/** Bus d'événements typé de l'Académie. */
export class EventBus implements EventPublisher {
  private readonly handlers = new Map<AcademyEventType, Set<(event: AcademyEvent) => void>>();

  /**
   * S'abonner à un type d'événement.
   * Retourne une fonction qui permet de se désabonner.
   */
  on<K extends AcademyEventType>(type: K, handler: EventHandler<K>): () => void {
    const listeners = this.handlers.get(type) ?? new Set<(event: AcademyEvent) => void>();
    this.handlers.set(type, listeners);

    const listener = handler as (event: AcademyEvent) => void;
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  /** Envoyer un événement à tous les abonnés de son type. */
  emit(event: AcademyEvent): void {
    this.handlers.get(event.type)?.forEach((handler) => handler(event));
  }
}