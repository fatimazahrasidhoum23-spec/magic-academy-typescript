import { Entity, IRepository } from "./repository.interface";

/**
 * Repository générique qui stocke les données dans un tableau en mémoire.
 * Fonctionne pour n'importe quel type T qui possède un id.
 */
export class InMemoryRepository<T extends Entity> implements IRepository<T> {
  protected items: T[] = [];
  private nextId = 1;

  /** Ajoute un élément et lui attribue automatiquement un id. */
  add(data: Omit<T, "id">): T {
    const item = { ...data, id: this.nextId++ } as T;
    this.items.push(item);
    return item;
  }

  /** Cherche un élément par son id. */
  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  /** Retourne une copie de tous les éléments. */
  findAll(): T[] {
    return [...this.items];
  }

  /** Cherche tous les éléments dont une propriété a une valeur donnée. */
  findBy<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.items.filter((item) => item[key] === value);
  }

  /** Supprime un élément. Retourne true s'il a été trouvé et supprimé. */
  remove(id: number): boolean {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < before;
  }
}