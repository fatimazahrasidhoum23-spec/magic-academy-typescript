import { NewSpell } from "./models/spell";

const lumos: NewSpell = {
  name: "Lumos",
  incantation: "Lumos !",
  power: 10,
};

const expelliarmus: NewSpell = {
  name: "Expelliarmus",
  incantation: "Expelliarmus !",
  power: 50,
};

console.log("Sorts :", lumos, expelliarmus);