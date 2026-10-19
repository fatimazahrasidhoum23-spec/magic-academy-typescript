/** Toute donnée stockée doit avoir un identifiant. */
export interface Entity {
  readonly id: number;
}

/** Lecture seule : trouver des éléments. */
export interface Readable<T extends Entity> {
  findById(id: number): T | undefined;
  findAll(): T[];
}

/** Écriture : ajouter et supprimer des éléments. */
export interface Writable<T extends Entity> {
  add(data: Omit<T, "id">): T;
  remove(id: number): boolean;
}

/** Repository complet = lecture + écriture. */
export interface IRepository<T extends Entity> extends Readable<T>, Writable<T> {}