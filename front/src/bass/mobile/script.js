import { all } from "axios";
import { getAPI, createGame, getStep, getPersonnality } from "../../utils";

// Ici modifier avec le nom de votre personnalité
const personnality = "bass"

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

// Exemple d'utilisation du contenu de allData
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description



// On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
let createGameStatus = await createGame("bass")
createGameStatus = createGameStatus.data


// Quand on clique sur le bouton "Commencer l'expérience"
document.querySelector("#start").addEventListener("click", () => {
    showStep(1)
    if (createGameStatus) {
        // On affiche l'étape 1
        showStep(1)
    } else {
        // Ici afficher l'info que quelqu'un joue déjà et qu'il faut attendre encore quelques instants
    }
})

async function showStep(step) {

    // Cette variable contient toutes les infos d'une étape infos importantes : le nom (correspond à la question) et toutes les infos de l'intéraction en JSON
    const stepContent = await getStep(personnality, step)

    console.log("J'ai getStep", step ,"ça m'a donné", stepContent)

    if (step == 1) {
        // Ici on gère l'affichage de l'intéraction 1
    } else if (step == 2) {
        // Ici on gère l'affichage de l'intéraction 2
    } else if (step == 3) {
        // Ici on gère l'affichage de l'intéraction 3
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

}
