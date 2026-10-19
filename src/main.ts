import { InMemoryRepository } from "./repositories/in-memory.repository";
import { Spell } from "./models/spell";

const sorts = new InMemoryRepository<Spell>();

const lumos = sorts.add({ name: "Lumos", incantation: "Lumos !", power: 10 });
const stupefix = sorts.add({ name: "Stupefix", incantation: "Stupefix !", power: 60 });

console.log("Lumos a reçu l'id :", lumos.id);
console.log("Stupefix a reçu l'id :", stupefix.id);
console.log("Tous les sorts :", sorts.findAll());
console.log("Sort n°2 :", sorts.findById(2));
console.log("Sorts de puissance 10 :", sorts.findBy("power", 10));
console.log("Suppression de Lumos :", sorts.remove(1));
console.log("Après suppression :", sorts.findAll());