# Magic Academy — TypeScript avancé

Gestion de l'Académie de Poudlard en TypeScript : inscription des sorciers, maisons, sorts et événements.

Projet réalisé pour pratiquer les Generics, les Utility Types, les décorateurs, les type guards et un système d'événements, en respectant les principes SOLID.

## Technologies

- TypeScript 5 (mode `strict`)
- Node.js
- ts-node

## Installation et lancement

```bash
git clone https://github.com/fatimazahrasidhoum23-spec/magic-academy-typescript.git
cd magic-academy-typescript
npm install
npm start
```

Vérifier les types sans exécuter :

```bash
npx tsc --noEmit
```

## Structure du projet

```
src/
├── models/          → Types : House, Wizard, Spell, AcademyEvent
├── repositories/    → Stockage générique (Generics)
├── decorators/      → ValidateSpellPower, Memoize
├── guards/          → isHouse, isWizard
├── services/        → WizardService, EventBus, gestionnaires
└── main.ts          → Composition et démonstrations
```

## Exercices réalisés

| # | Exercice | Fichier(s) |
|---|---|---|
| 1 | Ajouter un sorcier avec `NewWizard` (`Omit`) | `models/wizard.ts`, `repositories/wizard.repository.ts` |
| 2 | Filtrer par maison avec `findByHouse` | `repositories/wizard.repository.ts` |
| 3 | Événement de sort avec `Extract` | `models/events.ts`, `services/event-handlers.ts` |
| 4 | Refuser une puissance négative (décorateur) | `decorators/validate-spell-power.ts`, `repositories/spell.repository.ts` |
| 5 | Cache de méthode avec une `Map` (décorateur) | `decorators/memoize.ts`, `services/spell-calculator.service.ts` |
| 6 | Type guard strict pour la maison | `guards/is-house.ts`, `guards/is-wizard.ts` |

## Utility Types utilisés

| Utility Type | Utilisation |
|---|---|
| `Omit` | `NewWizard`, `NewSpell` : création sans `id` |
| `Pick` | `WizardPreview` : nom et maison seulement |
| `Partial` | `WizardUpdate` : mise à jour partielle |
| `Record` | `HousePoints` : points des 4 maisons |
| `Extract` | `SpellCastEvent`, `EventOf<K>` |
| `Exclude` | `NonSpellEvent` : tous les événements sauf les sorts |
| `Parameters` | `DamageArgs` : arguments de `calculateDamage` |
| `ReturnType` | `DamageResult` : résultat de `calculateDamage` |

## Principes SOLID

- **S — Responsabilité unique** : un dossier par rôle (types, stockage, validation, logique métier).
- **O — Ouvert/Fermé** : `InMemoryRepository<T>` est étendu par `WizardRepository` et `SpellRepository` sans être modifié ; les décorateurs ajoutent des comportements sans toucher aux méthodes.
- **L — Substitution de Liskov** : `WizardRepository` peut remplacer `InMemoryRepository<Wizard>` partout.
- **I — Ségrégation des interfaces** : `Readable<T>`, `Writable<T>` et `EventPublisher` sont de petites interfaces ciblées.
- **D — Inversion des dépendances** : `WizardService` reçoit ses dépendances par le constructeur et ne connaît que des interfaces (`IWizardRepository`, `EventPublisher`).

## Bonus : système d'événements

`EventBus` typé : `on("spell-cast", handler)` n'accepte qu'un gestionnaire compatible avec cet événement, grâce à `Extract`. Il permet aussi de se désabonner.

## Auteure

Fatima Zahra Sidhoum