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
document.querySelector("#start").addEventListener("click", async () => {
    document.querySelector("#start").style.display = "none"
    document.querySelector("#step1").style.display = "block"
    document.querySelector("#section-step2").style.display = "block"

   const result = await getStep("lamarr", 0);

    let choices = result.data[0].question;
    console.log(result.data)
    choices = JSON.parse(choices)

    choices = choices.choices

    if (!choices) {
        console.error("Erreur: choices introuvable", result);
        return;
    }

    const containerChoices = document.querySelector("#section-step2-events");
    const containerDates = document.querySelector("#section-step2-dates");

    containerChoices.innerHTML = "";
    containerDates.innerHTML = "";
    const answers = []
    let selected = null

    containerChoices.addEventListener("click", (e) => {
        selected = e.target
        console.log(selected)
    })

    // boutons noms
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.name;
        button.dataset.date = choice.date;
        containerChoices.appendChild(button);
    });

    // dates uniques
    const uniqueDates = [...new Set(choices.map(c => c.date))];

    containerDates.addEventListener("click", (e) => {

        
        if (!selected) return
        if (selected.dataset.date === e.target.textContent) {
            console.log("bonne réponse !")
        } else {
            console.log("mauvaise réponse !")
        }
       answers.push({
            name: selected.textContent,
            placedDate: e.target.textContent,
            correctDate: selected.dataset.date,
            correct: selected.dataset.date === e.target.textContent ? 1 : 0
        })
        if (selected.dataset.date === e.target.textContent) {
            selected.classList.add("correct")
        } else {
            selected.classList.add("incorrect")
        }
        selected = null
        console.log(answers)
    })

    uniqueDates.forEach(date => {
        const button = document.createElement("button");
        button.textContent = date;
        containerDates.appendChild(button);
    }); 

    showStep(0)
    if (createGameStatus) {
        // On affiche l'étape 1
        console.log("le jeu a commencé")
    } else {
        // Ici afficher l'info que quelqu'un joue déjà
    }
})

document.querySelector("#step1").addEventListener("click", async () => {
    document.querySelector("#step1").style.display = "none"
    document.querySelector("#step2").style.display = "block"

    // console.log(result);

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

    console.log("J'ai getStep", step, "ça m'a donné", stepContent)

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