let mots = [
  "convulsionnent",
  "stéréochromies",
  "désolidarisera",
  "madériseraient",
  "diatoniquement",
  "insatiabilités",
  "nucléariserais",
  "désillusionnée",
  "embrigadassent",
  "transmuterions",
  "entrelaçassiez",
  "couraillerions",
  "déculpabilises",
  "rechigneraient",
  "porte-coutelle",
  "enchevaucherai",
  "désentravèrent",
  "désorientaient",
  "humanitarismes",
  "cohéritassions",
];

// Fonction pour normaliser les chaînes (supprimer les accents)
//-----------type string--
// -----NFD : argument prédéfini : Normalization Form Décomposed : exemple décompose l'accent du é = (e + ')
// ---autres type de normalisation : NFC : Normalization Form composed / NFKC : Normalization Form Compatibility Composed/ NFKD : Normalization Form Compatibility Decomposed
//-----\u0300-\u036f  : plage de caractère UNICOD corréspond aux accents
//   \u0300 : accents grave
// ---\u0301 : accents aigus etc....
// ---"g" : (global) :  la recherche s'applique à toute la chaine de caractère pas seulement au premier match
// -----"" : les accents touvés sont remplacé par une chaine de caractere vide donc supprimés
const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const aplhabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const blockPendu = document.querySelector(".container__image");
const btnReplay = document.querySelector(".btn__replay");
const touch2 = document.querySelectorAll(".touch2");

let clavier = document.querySelectorAll(".touch__clavier");
let btnRandom = document.querySelector(".btn__random");
let arrayWord;
let imagePendu = document.querySelector(".pendu__content");
let message = document.querySelector(".message");
let touchs = document.querySelectorAll(".touch");
let result1 = document.querySelector(".result1");
let pressTouch = [];
let tentativesRestantes = 9;

// Normaliser les mots de la liste pour uniformiser les comparaisons
// map crée un tableau a partir de mots. normalize applique la transformation de chaine de caractère à chaque mots
mots = mots.map((word) => normalize(word));

// Fonction pour sélectionner un mot aléatoirement
// Math.random() retourne un nombre décimal entre 0 et 1 exclu
// Math.floor() arrondit le nombre ver le bas pour obtenir un entier
let randomIndex = Math.floor(Math.random() * mots.length);
let randomMots = mots[randomIndex];

btnRandom.addEventListener("click", function () {
  touch2.forEach((caseResult) => (caseResult.textContent = "")); // Réinitialiser les cases
  blockPendu.style.display = "flex";
  message.textContent = ""; // Effacer les anciens messages
  imagePendu.className = "pendu__content"; // Réinitialiser l'image
  tentativesRestantes = 9; // Réinitialiser les tentatives

  randomIndex = Math.floor(Math.random() * mots.length);
  randomMots = mots[randomIndex];
  arrayWord = randomMots.split(""); // Découper le mot en lettres

  console.log("Mot sélectionné :", arrayWord);
});

// Fonction pour gérer le clic sur le clavier
const selectLetter = (td) => {
  // Récupérer la lettre cliquée et la normaliser
  let pressTouch = normalize(td.innerHTML.toLowerCase());

  // Vérifier si la lettre est dans le mot à deviner
  arrayWord.forEach((element, index) => {
    if (normalize(element) === pressTouch) {
      touch2[index].textContent = element.toUpperCase(); // Afficher la lettre dans la bonne case
    }
  });

  // Vérifier si la lettre est absente du mot
  const result = arrayWord.filter((word) => normalize(word) === pressTouch);

  if (result.length === 0) {
    tentativesRestantes--;
    // Appliquer la classe de mouvement correspondante
    if (tentativesRestantes === 8) {
      imagePendu.classList.add("move__image");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }

    if (tentativesRestantes === 7) {
      imagePendu.classList.add("move__image2");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 6) {
      imagePendu.classList.add("move__image3");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 5) {
      imagePendu.classList.add("move__image4");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 4) {
      imagePendu.classList.add("move__image5");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 3) {
      imagePendu.classList.add("move__image6");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 2) {
      imagePendu.classList.add("move__image7");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 1) {
      imagePendu.classList.add("move__image8");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
    if (tentativesRestantes === 0) {
      imagePendu.classList.add("move__image9");
      console.log(`Classe ajoutée : move__image${tentativesRestantes}`);

    }
  }

  // Vérifier si toutes les tentatives sont épuisées
  if (tentativesRestantes === 0) {
    message.textContent = `Perdu ! Le mot à trouver était ${randomMots.toUpperCase()}.`;
    message.style.color = "red";
    btnReplay.style.display = "block"; // Afficher le bouton Rejouer
    btnRandom.disabled = true; // Désactiver le bouton Jouer
    return; // Arrêter ici si la partie est perdue
  }

  // Vérifier si le mot est entièrement trouvé (victoire)
  //  dans ce cas parcourt le tableau des lettres  et compare chaque lettre (every()) avec le contenu des cases correspondantes
  const isWin = arrayWord.every(
    (letter, index) => touch2[index].textContent === letter.toUpperCase()
  );

  if (isWin) {
    message.textContent = "Bravo, vous avez gagné !";
    message.style.color = "black";
    btnReplay.style.display = "block"; // Afficher le bouton Rejouer
    btnRandom.disabled = true; // Désactiver le bouton Jouer
  }
};

// Fonction pour réinitialiser le jeu avec le bouton Rejouer
btnReplay.addEventListener("click", function () {
  tentativesRestantes = 9;
  message.textContent = "";
  message.style.color = "";
  imagePendu.className = "pendu__content"; // Réinitialiser l'image
  btnRandom.disabled = false;
  btnReplay.style.display = "none";

  randomIndex = Math.floor(Math.random() * mots.length);
  randomMots = mots[randomIndex];
  arrayWord = randomMots.split("");

  touch2.forEach((caseResult) => (caseResult.textContent = ""));
  console.log("Jeu réinitialisé. Nouveau mot :", arrayWord);
});
