import {
  SpellCalculatorService,
  DamageArgs,
  DamageResult,
} from "./services/spell-calculator.service";

console.log("=== Exercice 5 ===");

const calculateurHarry = new SpellCalculatorService();
const calculateurDraco = new SpellCalculatorService();

console.log("\n-- Calculateur de Harry --");
console.log("Résultat :", calculateurHarry.calculateDamage(50, 3)); // calcul
console.log("Résultat :", calculateurHarry.calculateDamage(50, 3)); // cache ⚡
console.log("Résultat :", calculateurHarry.calculateDamage(80, 5)); // calcul (nouveaux args)
console.log("Résultat :", calculateurHarry.calculateDamage(50, 3)); // cache ⚡

console.log("\n-- Calculateur de Draco (cache séparé) --");
console.log("Résultat :", calculateurDraco.calculateDamage(50, 3)); // calcul (autre instance)

console.log("\nCalculs réels Harry :", calculateurHarry.getComputationCount()); // 2
console.log("Calculs réels Draco :", calculateurDraco.getComputationCount()); // 1

// Parameters et ReturnType
const args: DamageArgs = [100, 7];
const resultat: DamageResult = calculateurHarry.calculateDamage(...args);
console.log("\nAvec Parameters et ReturnType :", resultat);