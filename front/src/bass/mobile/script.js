import axios from "axios";
import { getAPI, createGame, getStep, getPersonnality } from "../../utils";

// Ici modifier avec le nom de votre personnalité
const personnality = "bass"

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

// Exemple d'utilisation du contenu de allData
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description

// Le popup pour dire d'attendre car un joueur joue déjà
const dialog = document.querySelector("#wait")

// Fermer le popup
document.querySelector("#cancelButton").addEventListener("click", () => {
    dialog.close()
})


// Quand on clique sur le bouton "Commencer l'expérience" ou sur "Réessayer" sur le popup
const buttonsStart = [document.querySelector("#retryButton"), document.querySelector("#start")]

buttonsStart.forEach(element => {
    element.addEventListener("click", async () => {
        dialog.close()

        // On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
        let createGameStatus = await createGame("bass")
        createGameStatus = createGameStatus.data

        if (createGameStatus) {
            console.log("J'ai pu créer une game")
            // On affiche l'étape 1
            showStep(1)
        } else {
            dialog.showModal()
            console.log("Je n'ai pas pu créer une game")
            // Ici afficher l'info que quelqu'un joue déjà et qu'il faut attendre encore quelques instants
        }
    })
});

let stepContent;

// Afficher un step
async function showStep(step) {
    
    // Cette variable contient toutes les infos d'une étape infos importantes : le nom (correspond à la question) et toutes les infos de l'intéraction en JSON
    stepContent = await getStep(personnality, step)

    const decimal = step % 1;

    if (decimal.toFixed(1) == 0.1) {
        console.log("Il a donné une bonne réponse")
    } else if (decimal.toFixed(1) == 0.2) {
        console.log("Il a donné une mauvaise réponse")
    } else {

        
        stepContent = stepContent.data[0]

        stepContent = JSON.parse(stepContent.interaction)

        console.log("J'ai getStep", step ,"ça m'a donné", stepContent)

        if (step == 1) {
            document.querySelector("#step0").style.display = "none"
            // Ici on gère l'affichage de l'intéraction 1
        } else if (step == 2) {
            // Ici on gère l'affichage de l'intéraction 2
        } else if (step == 3) {
            // Ici on gère l'affichage de l'intéraction 3
        } // ... et ainsi de suite si on souhaite ajouter des intéractions

        // On créé un nouveau step
        const newStep = document.createElement("div");
        newStep.setAttribute("id", "step" + step)
        newStep.classList.add("step");
        newStep.innerHTML = `
            <h1>${stepContent.question}</h1>
            <button id="answer1" class="answer">${stepContent.answer1}</button>
            <button id="answer2" class="answer">${stepContent.answer2}</button>
            <button id="answer3" class="answer">${stepContent.answer3}</button>
        `

        // On ajoute le nouveau step au body
        document.body.appendChild(newStep)


        // Quand on clique sur une réponse
        document.querySelectorAll(".answer").forEach(element => {
            element.addEventListener("click", () => {
                if (element.textContent = stepContent.goodAnswer) {
                    console.log("Bonne réponse !")
                    showStep(1.1)
                } else {
                    showStep(1.2)
                }
            })
            
        });
    }
}

