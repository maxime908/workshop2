import { getAPI, createGame, getStep, getPersonnality } from "../../utils.js";

// Ici modifier avec le nom de votre personnalité
const personnality = "turing"

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

// Exemple d'utilisation du contenu de allData
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description



// On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
let createGameStatus = await createGame("turing")
createGameStatus = createGameStatus.data


// Quand on clique sur le bouton "Commencer l'expérience"
document.querySelector("#start").addEventListener("click", () => {
    showStep(0)
    document.querySelector("#title").textContent = allData.name
    document.querySelector("#step1").style.display="block"
    document.querySelector("#start").style.display="none"
    if (createGameStatus) {
        console.log("le jeu a commencée")
    } else {
        // Ici afficher l'info que quelqu'un joue déjà et qu'il faut attendre encore quelques instants
    }
})

document.querySelector("#step1").addEventListener("click", ()=>{
    showStep(1)
    document.querySelector("#step2").style.display ="block"
    document.querySelector("#step1").style.display ="none"
    document.querySelector("#start").style.display ="none"
})

document.querySelector("#step2").addEventListener("click", ()=>{
    showStep(2)
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "block"
})

document.querySelector("#step3").addEventListener("click", ()=>{
    showStep(3)
    document.querySelector("#step3").style.display = "none"
    document.querySelector("#start").style.display = "block"
})


async function showStep(step) {

    // Cette variable contient toutes les infos d'une étape infos importantes : le nom (correspond à la question) et toutes les infos de l'intéraction en JSON
    let stepContent = await getStep(personnality, step)

    stepContent=stepContent.data

    console.log("J'ai getStep", step ,"ça m'a donné", stepContent)

    if (step == 1) {
        console.log("harry potter")
        document.querySelector("#title").textContent = stepContent.name
    } else if (step == 2) {
        console.log("harry potter2")
        document.querySelector("#title").textContent = stepContent.name
    } else if (step == 3) {
        console.log("harry potter3")
        document.querySelector("#title").textContent = stepContent.name
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

}
