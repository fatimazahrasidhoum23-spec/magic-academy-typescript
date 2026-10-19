import { Memoize } from "../decorators/memoize";

/** Calcule les dégâts d'un sort selon sa puissance et l'année du sorcier. */
export class SpellCalculatorService {
  /** Nombre de vrais calculs effectués (pour prouver que le cache marche). */
  private computations = 0;

  @Memoize
  calculateDamage(basePower: number, wizardYear: number): number {
    this.computations++;
    console.log(`  🔮 Calcul réel de calculateDamage(${basePower}, ${wizardYear})...`);
    return basePower * (1 + wizardYear * 0.3);
  }

  getComputationCount(): number {
    return this.computations;
  }
}

/** Parameters : le type des arguments de calculateDamage → [number, number] */
export type DamageArgs = Parameters<SpellCalculatorService["calculateDamage"]>;

/** ReturnType : le type du résultat de calculateDamage → number */
export type DamageResult = ReturnType<SpellCalculatorService["calculateDamage"]>;