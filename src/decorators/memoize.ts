/**
 * Exercice 5 — Décorateur de méthode qui met en cache les résultats.
 * Le cache est séparé pour chaque instance d'objet.
 * À utiliser uniquement sur des méthodes synchrones.
 */
export function Memoize(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  // Un cache (Map) par instance : WeakMap<instance, Map<clé, résultat>>
  const cachesParInstance = new WeakMap<object, Map<string, unknown>>();

  descriptor.value = function (this: object, ...args: unknown[]) {
    // 1. Récupérer (ou créer) le cache de CETTE instance
    let cache = cachesParInstance.get(this);
    if (!cache) {
      cache = new Map<string, unknown>();
      cachesParInstance.set(this, cache);
    }

    // 2. Transformer les arguments en clé texte : [50, 3] → "[50,3]"
    const key = JSON.stringify(args);

    // 3. Déjà calculé ? On renvoie le résultat mémorisé
    if (cache.has(key)) {
      console.log(`  ⚡ Cache utilisé pour ${propertyKey}${key}`);
      return cache.get(key);
    }

    // 4. Sinon, on calcule, on mémorise, et on renvoie
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}