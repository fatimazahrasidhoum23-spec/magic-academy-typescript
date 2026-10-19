import { SpellCastEvent, NonSpellEvent } from "./models/events";
import { HousePoints } from "./models/house";

const sort: SpellCastEvent = {
  type: "spell-cast",
  wizardId: 1,
  spell: "Expelliarmus",
  power: 50,
};

const points: NonSpellEvent = {
  type: "points-awarded",
  house: "Gryffindor",
  points: 10,
  reason: "Bonne réponse en cours de potions",
};

const coupe: HousePoints = {
  Gryffindor: 120,
  Slytherin: 110,
  Ravenclaw: 95,
  Hufflepuff: 100,
};

console.log("Sort lancé :", sort);
console.log("Autre événement :", points);
console.log("Coupe des Quatre Maisons :", coupe);