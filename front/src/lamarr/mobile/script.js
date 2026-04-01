import { all } from "axios";
import { getAPI, createGame, getStep, getPersonnality } from "../../utils";

// Ici modifier avec le nom de votre personnalité
const personnality = "lamarr"

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

// --- CACHER LES BOUTONS AU DEPART ---
document.querySelector("#step1").style.display = "none"
document.querySelector("#step2").style.display = "none"
document.querySelector("#step3").style.display = "none"

// Exemple d'utilisation du contenu de allData
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description // Correction # en .



// On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
let createGameStatus = await createGame("lamarr")
createGameStatus = createGameStatus.data


// Quand on clique sur le bouton "Commencer l'expérience"
document.querySelector("#start").addEventListener("click", () => {
    document.querySelector("#start").style.display = "none"
    document.querySelector("#step1").style.display = "block"
    document.querySelector("#section-step2").style.display = "block"
    showStep(0)
    if (createGameStatus) {
        // On affiche l'étape 1
        console.log("le jeu a commencé")
    } else {
        // Ici afficher l'info que quelqu'un joue déjà
    }
})

document.querySelector("#step1").addEventListener("click", () => {
    document.querySelector("#step1").style.display = "none"
    document.querySelector("#step2").style.display = "block"
    showStep(1)
})

document.querySelector("#step2").addEventListener("click", () => {
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "block"
    showStep(2)
})

document.querySelector("#step3").addEventListener("click", () => {
    document.querySelector("#step3").style.display = "none"
    document.querySelector("#start").style.display = "block"
    showStep(3)
})

async function showStep(step) {

    // Cette variable contient toutes les infos d'une étape infos importantes : le nom (correspond à la question) et toutes les infos de l'intéraction en JSON
    let stepContent = await getStep(personnality, step)
    stepContent = stepContent.data

    console.log("J'ai getStep", step ,"ça m'a donné", stepContent)

    if (stepContent && stepContent.name) {
        document.querySelector("#title").textContent = stepContent.name
    }

    if (step == 1) {
        // Ici on gère l'affichage de l'intéraction 1
    } else if (step == 2) {
        // Ici on gère l'affichage de l'intéraction 2
    } else if (step == 3) {
        // Ici on gère l'affichage de l'intéraction 3
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

}