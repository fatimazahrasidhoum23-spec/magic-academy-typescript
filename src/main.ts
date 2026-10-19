import { NewWizard, WizardPreview, WizardUpdate } from "./models/wizard";

const harry: NewWizard = {
  name: "Harry Potter",
  house: "Gryffindor",
  year: 1,
  wand: "Houx, plume de phénix",
};

const apercu: WizardPreview = { name: "Hermione Granger", house: "Gryffindor" };

const changement: WizardUpdate = { year: 2 };

console.log("Nouveau sorcier :", harry);
console.log("Aperçu :", apercu);
console.log("Mise à jour :", changement);