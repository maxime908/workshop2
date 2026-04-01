import { getAPI, createGame, getStep, getPersonnality, setParams } from "../../utils";

// Ici modifier avec le nom de votre personnalité
const personnality = "tesla"

// Step en cours
let currentStep = 0

// A répondu à la question ?
let answered = false

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
        let createGameStatus = await createGame("tesla")
        createGameStatus = true
        // createGameStatus = createGameStatus.data

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

    hideNextButton()
    setParams(personnality, "")

    currentStep = step
    answered = false

    // Cette variable contient toutes les infos d'une étape infos importantes : le nom (correspond à la question) et toutes les infos de l'intéraction en JSON
    stepContent = await getStep(personnality, step)

    console.log(stepContent);

    if (stepContent.data.length === 0) {
        window.location.href = "../../stats/index.html";
        return;
    }

    stepContent = stepContent.data[0]

    stepContent = JSON.parse(stepContent.interaction)

    console.log("J'ai getStep", step, "ça m'a donné", stepContent)

    if (step == 1) {
        hideStep(0)
        // Ici on gère l'affichage de l'intéraction 1
    } else if (step == 2) {
        hideStep(1)
        // Ici on gère l'affichage de l'intéraction 2
    } else if (step == 3) {
        hideStep(2)
        // Ici on gère l'affichage de l'intéraction 3
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

    // On créé un nouveau step
    const newStep = document.createElement("div");
    newStep.setAttribute("id", "step" + step)
    newStep.classList.add("step");

    if (stepContent.type === "qcm1") {
        // Ici on gère l'affichage du qcm avec 3 réponses
        newStep.innerHTML = `
        <h1>${stepContent.question}</h1>
        <button id="answer1" class="answer">${stepContent.answer1}</button>
        <button id="answer2" class="answer">${stepContent.answer2}</button>
        <button id="answer3" class="answer">${stepContent.answer3}</button>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)

        // Quand on clique sur une réponse
        document.querySelectorAll(".answer").forEach(element => {

            element.addEventListener("click", () => {
                console.log("Cliqué", answered);

                if (!answered) {
                    answered = true
                    if (element.textContent === stepContent.goodAnswer) {
                        console.log("Bonne réponse !")
                        setParams(personnality, "goodAnswer")
                        showNextButton()
                    } else {
                        setParams(personnality, "wrongAnswer")
                        showNextButton()

                        document.querySelectorAll(".answer").forEach(element2 => {
                            if (element2.textContent == stepContent.goodAnswer) {
                                console.log("Bonne réponse !");
                            }
                        });
                    }
                }
            })

        });
    } else if (stepContent.type === "qcm2") {
        // Ici on gère l'affichage du qcm avec 4 réponses
        newStep.innerHTML = `
        <h1>${stepContent.question}</h1>
        <button id="answer1" class="answer">${stepContent.answer1}</button>
        <button id="answer2" class="answer">${stepContent.answer2}</button>
        <button id="answer3" class="answer">${stepContent.answer3}</button>
        <button id="answer4" class="answer">${stepContent.answer4}</button>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)

        // Quand on clique sur une réponse
        document.querySelectorAll(".answer").forEach(element => {

            element.addEventListener("click", () => {
                console.log("Cliqué", answered);

                if (!answered) {
                    answered = true
                    if (element.textContent === stepContent.goodAnswer) {
                        console.log("Bonne réponse !")
                        setParams(personnality, "goodAnswer")
                        showNextButton()
                    } else {
                        setParams(personnality, "wrongAnswer")
                        showNextButton()

                        document.querySelectorAll(".answer").forEach(element2 => {
                            if (element2.textContent === stepContent.goodAnswer) {
                                console.log("Bonne réponse !");
                            }
                        });
                    }
                }
            })

        });
    } else if (stepContent.type === "frise") {
        // Ici on gère l'affichage de la frise chronologique
        newStep.innerHTML = `
        <h1>${stepContent.question}</h1>
        <div class="track" id="track">
            <div class="line"></div>
            <div class="dot-fixed start"></div> 
            <div class="dot-fixed middle"></div> 
            <div class="dot-fixed end"></div> 
        </div>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)
    }
}


function hideStep(step) {
    document.querySelector("#step" + step).style.display = "none"
}

function showNextButton() {
    document.querySelector("#nextContainer").style.display = "flex"
}

function hideNextButton() {
    document.querySelector("#nextContainer").style.display = "none"
}

document.querySelector("#next").addEventListener("click", () => {
    showStep(currentStep + 1)
})
