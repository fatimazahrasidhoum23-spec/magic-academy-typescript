/**
 * Exercice 4 — Décorateur de méthode qui refuse un sort
 * dont la puissance est négative.
 */
export function ValidateSpellPower(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  // 1. On garde la méthode d'origine de côté
  const originalMethod = descriptor.value;

  // 2. On la remplace par une nouvelle version qui vérifie d'abord
  descriptor.value = function (this: unknown, ...args: unknown[]) {
    const spell = args[0] as { name: string; power: number };

    if (spell.power < 0) {
      throw new Error(
        `[${propertyKey}] Sort "${spell.name}" refusé : puissance négative (${spell.power}).`
      );
    }

    // 3. Si tout va bien, on appelle la méthode d'origine
    return originalMethod.apply(this, args);
  };

  return descriptor;
}