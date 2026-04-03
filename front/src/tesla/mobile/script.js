import { getAPI, createGame, getStep, getPersonnality, setParams } from "../../utils";

// Ici modifier avec le nom de votre personnalité
const personnality = "tesla"

// Step en cours
let currentStep = 0

// A répondu à la question ?
let answered = false

// Stocke le bouton événement actuellement sélectionné
let selected = null

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

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

    if (stepContent.data.length === 0) {
        const endStep = document.createElement("div");
        endStep.classList.add("step", "transparent-step");
        endStep.innerHTML = `
            <div id="div-logo">
                <img src="../assets/logoCortexia.svg" alt="" id="logo">
            </div>
            <p id="info" style="margin-top: 20px;">FÉLICITATIONS ! <br><br> TU AS TERMINÉ LE QUIZ SUR <br> <strong>NIKOLA TESLA</strong> <br><br> <span style="text-transform: none; font-size: 18px;">Test les autres quiz !</span></p>
            <button id="finalNext">CONTINUER</button>
        `

        document.querySelector("#steps").innerHTML = ""
        document.querySelector("#steps").appendChild(endStep)

        // === CHANGEMENT ICI : Envoi du signal RESET ===
        document.querySelector("#finalNext").addEventListener("click", async () => {
            await setParams(personnality, "reset");
            
            setTimeout(() => {
                window.location.href = "../../stats/index.html";
            }, 500);
        })

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
        <h1 id="question">${stepContent.question}</h1>
        <div id="answers1">
            <button id="answer1" class="answer1">${stepContent.answer1}</button>
            <button id="answer2" class="answer1">${stepContent.answer2}</button>
            <button id="answer3" class="answer1">${stepContent.answer3}</button>
        </div>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)

        // Quand on clique sur une réponse
        document.querySelectorAll(".answer1").forEach(element => {

            element.addEventListener("click", () => {
                console.log("Cliqué", answered);

                if (!answered) {
                    answered = true

                    console.log(element.textContent);
                    console.log(stepContent.goodAnswer);

                    document.querySelectorAll(".answer1").forEach(btn => {
                        btn.style.color = "#B0C8E8";
                        btn.style.border = "2px solid #B0C8E8";
                        btn.style.backgroundColor = "transparent";
                    });

                    element.style.color = "#0D0D1F";
                    element.style.border = "none";

                    if (element.textContent === stepContent.goodAnswer) {
                        console.log("Bonne réponse !")
                        setParams(personnality, "goodAnswer")
                        element.style.backgroundColor = "#008610";
                    } else {
                        setParams(personnality, "wrongAnswer")
                        element.style.backgroundColor = "#CB0000";

                        document.querySelectorAll(".answer1").forEach(element2 => {

                            if (element2.textContent == stepContent.goodAnswer) {
                                console.log("Mauvaise réponse !");
                                element2.style.backgroundColor = "#008610";
                                element2.style.color = "#0D0D1F";
                                element2.style.border = "none";
                            }
                        });
                    }
                    showNextButton()
                }
            })

        });

    } else if (stepContent.type === "qcm2") {
        // Ici on gère l'affichage du qcm avec 4 réponses
        newStep.innerHTML = `
        <h1 id="question">${stepContent.question}</h1>
        <div id="answers2">
            <button id="answer1" class="answer2"><img src="../assets/moteur.svg" alt="${stepContent.answer1}"></button>
            <button id="answer2" class="answer2"><img src="../assets/bobine.svg" alt="${stepContent.answer2}"></button>
            <button id="answer3" class="answer2"><img src="../assets/barrage.svg" alt="${stepContent.answer3}"></button>
            <button id="answer4" class="answer2"><img src="../assets/radio.svg" alt="${stepContent.answer4}"></button>
        </div>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)

        // Quand on clique sur une réponse
        document.querySelectorAll(".answer2").forEach(element => {

            const imgElement = element.querySelector("img")

            element.addEventListener("click", () => {
                console.log("Cliqué", answered);

                if (!answered) {
                    answered = true

                    const answerSelected = imgElement.alt

                    console.log(answerSelected);
                    console.log(stepContent.goodAnswer);

                    document.querySelectorAll(".answer2").forEach(btn => {
                        btn.style.border = "3px solid #B0C8E8";
                    });

                    if (answerSelected === stepContent.goodAnswer) {
                        console.log("Bonne réponse !")
                        setParams(personnality, "goodAnswer")
                        element.style.border = "3px solid #008610";

                    } else {
                        setParams(personnality, "wrongAnswer")
                        element.style.border = "3px solid #CB0000";

                        document.querySelectorAll(".answer2").forEach(element2 => {

                            const imgElement = element2.querySelector("img")
                            const answerSelected = imgElement.alt

                            if (answerSelected === stepContent.goodAnswer) {
                                console.log("Bonne réponse !");
                                element2.style.border = "3px solid #008610";
                            }
                        });
                    }
                }
                showNextButton()
            })

        });
    } else if (stepContent.type === "frise") {
        // Ici on gère l'affichage de la frise chronologique
        newStep.innerHTML = `
            <h1 id="question">${stepContent.question}</h1>
            <div id="choices-container" class="choices-container"></div>
            <div id="dates-container" class="dates-container"></div>
            <button id="submitFrise" class="action-button" style="margin-top: 20px;">Valider</button>
        `;

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep);

        // On récupère les zones qu'on vient juste de créer
        const containerChoices = newStep.querySelector("#choices-container");
        const containerDates = newStep.querySelector("#dates-container");
        const submitBtn = newStep.querySelector("#submitFrise");

        const choices = stepContent.choices;
        let answers = []; // Stockera les réponses actuelles du joueur

        // On crée les boutons pour chaque événement
        choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.name;
            button.dataset.date = choice.date;

            button.classList.add("chip");
            containerChoices.appendChild(button);
        });

        // Sélection d'un événement au clic
        containerChoices.addEventListener("click", (e) => {
            if (e.target.classList.contains("chip")) {
                selected = e.target;
                console.log("Sélectionné :", selected.textContent);
            }
        });

        // On crée les lignes de dates pour la frise
        const uniqueDates = [...new Set(choices.map(c => c.date))];
        uniqueDates.forEach(date => {
            const row = document.createElement("div");
            row.classList.add("timeline-row");
            row.dataset.date = date;

            const label = document.createElement("span");
            label.classList.add("date-label");
            label.textContent = date;

            const chipsZone = document.createElement("div");
            chipsZone.classList.add("chips-zone");

            row.appendChild(label);
            row.appendChild(chipsZone);
            containerDates.appendChild(row);
        });

        // Dépôt ET Retrait de l'événement sur la frise
        containerDates.addEventListener("click", (e) => {

            // Retirer une chip
            if (e.target.classList.contains("chip")) {
                const chip = e.target;

                if (chip.classList.contains("locked")) {
                    console.log("Événement bien placé");
                    return;
                }

                chip.style.backgroundColor = "";
                chip.style.color = "";
                chip.style.border = "";

                containerChoices.appendChild(chip);

                answers = answers.filter(ans => ans.name !== chip.textContent);

                console.log("Événement retiré !");
                return;
            }

            // Déposer une chip
            if (!selected) return;

            const row = e.target.closest(".timeline-row");
            if (!row) return;

            // Déplacement visuel de la chip
            const chipsZone = row.querySelector(".chips-zone");
            const existingChip = chipsZone.querySelector(".chip");

            if (existingChip) {
                if (existingChip.classList.contains("locked")) return;

                existingChip.style.backgroundColor = "";
                existingChip.style.color = "";
                existingChip.style.border = "";

                containerChoices.appendChild(existingChip);
                answers = answers.filter(ans => ans.name !== existingChip.textContent);
            }

            chipsZone.appendChild(selected);

            // Si l'événement est déjà placé, on l'enlève de la mémoire
            answers = answers.filter(ans => ans.name !== selected.textContent);

            // On enregistre la nouvelle position
            answers.push({
                name: selected.textContent,
                placedDate: row.dataset.date,
                correctDate: selected.dataset.date,
                correct: selected.dataset.date === row.dataset.date ? 1 : 0
            });

            selected = null;
        });


        let scoreSent = false;

        submitBtn.addEventListener("click", () => {
            // On vérifie que tout a été placé
            if (answers.length < choices.length) {
                console.log("Tu n'as pas placé tous les événements !");
                return;
            }

            if (!answered) {
                let allCorrect = true;

                answers.forEach(answer => {
                    containerDates.querySelectorAll("button").forEach(btn => {

                        if (btn.textContent === answer.name) {
                            if (answer.correct === 1) {
                                setParams(personnality, "goodAnswer")
                                btn.style.border = "3px solid #008610";
                                btn.classList.add("locked");
                            } else {
                                setParams(personnality, "wrongAnswer")
                                btn.style.border = "3px solid #CB0000";
                                allCorrect = false;
                            }
                        }
                    });
                });

                if (allCorrect) {
                    answered = true;

                    if (!scoreSent) {
                        setParams(personnality, "goodAnswer");
                    }

                    submitBtn.style.display = "none";
                    showNextButton();
                    console.log("Frise parfaite !");

                } else {
                    console.log("Il y a des erreurs dans la frise.");

                    if (!scoreSent) {
                        setParams(personnality, "wrongAnswer");
                        scoreSent = true;
                    }
                }
            }
        });
    }

    // On ajoute le nouveau step au body
    document.querySelector("#steps").appendChild(newStep)

    //On rend tous les points sur la frise
    document.querySelectorAll(".date").forEach(element => {
        element.addEventListener("click", () => {
            console.log("Cliqué sur la date")
            if (element.getAttribute("id") == "goodAnswer") {
                console.log("Bonne réponse !")
                setParams(personnality, "goodAnswer")
                showNextButton()
            } else {
                console.log("Mauvaise réponse !")
                setParams(personnality, "wrongAnswer")
            }
        })

    });
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