import { all } from "axios";
import { getAPI, createGame, getStep, getPersonnality } from "../../utils";

const personnality = "lamarr"

let allData = await getPersonnality(personnality)
allData = allData.data

document.querySelector("h1").textContent = allData.name
document.querySelector(".desc").textContent = allData.description

let createGameStatus = await createGame("lamarr")
createGameStatus = createGameStatus.data

// --- GESTION DU CLIC COMMENCER ---
document.querySelector("#step0").addEventListener("click", () => {
    if (createGameStatus) {
        // 1. On cache le bouton "Commencer"
        document.querySelector("#step0").style.display = "none";
        // 2. On lance l'étape 1
        showStep(1)
    } else {
        document.querySelector(".step").textContent = "Une session est déjà en cours..."
    }
})

// --- ÉCOUTEURS POUR LES AUTRES BOUTONS ---
document.querySelector("#step1").addEventListener("click", () => showStep(2)) // Clique sur Etape 1 -> Go Etape 2
document.querySelector("#step2").addEventListener("click", () => showStep(3)) // Clique sur Etape 2 -> Go Etape 3
document.querySelector("#step3").addEventListener("click", () => {
    document.querySelector(".step").textContent = "Fin de l'expérience !";
    document.querySelector("#step3").style.display = "none";

    document.querySelector("#step0").style.display = "inline-block";
    document.querySelector("#step0").textContent = "Recommencer l'expérience";
})

async function showStep(step) {
    const stepContent = await getStep(personnality, step)
    const displayElement = document.querySelector(".step")

    // On cache TOUS les boutons d'étapes d'abord pour faire le ménage
    document.querySelectorAll("#steps button").forEach(btn => btn.style.display = "none");

    if (step == 1) {
        displayElement.textContent = "Question 1 : " + stepContent.name
        // On affiche le bouton de l'étape 1 pour pouvoir passer à la suite
        document.querySelector("#step1").style.display = "inline-block";

    } else if (step == 2) {
        displayElement.textContent = "Question 2 : " + stepContent.name
        // On affiche le bouton de l'étape 2
        document.querySelector("#step2").style.display = "inline-block";

    } else if (step == 3) {
        displayElement.textContent = "Question 3 : " + stepContent.name
        // On affiche le bouton de l'étape 3
        document.querySelector("#step3").style.display = "inline-block";
    }
}