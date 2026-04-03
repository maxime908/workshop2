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

        let createGameStatus = await createGame("tesla")
        createGameStatus = true

        if (createGameStatus) {
            console.log("J'ai pu créer une game")
            showStep(1)
        } else {
            dialog.showModal()
            console.log("Je n'ai pas pu créer une game")
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

    stepContent = await getStep(personnality, step)

    // === C'EST ICI QUE SE FAIT LE RESET POUR LE GRAND ÉCRAN ===
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

        document.querySelector("#finalNext").addEventListener("click", async () => {
            // 1. On envoie le signal "reset" au JSON pour que le Grand Écran revienne à 0
            await setParams(personnality, "reset");
            
            // 2. On laisse 800ms au Grand Écran pour lire le JSON avant de quitter la page
            setTimeout(() => {
                window.location.href = "../../stats/index.html";
            }, 800);
        })

        return;
    }

    stepContent = stepContent.data[0]
    stepContent = JSON.parse(stepContent.interaction)

    console.log("J'ai getStep", step, "ça m'a donné", stepContent)

    if (step == 1) {
        hideStep(0)
    } else if (step == 2) {
        hideStep(1)
    } else if (step == 3) {
        hideStep(2)
    } 

    const newStep = document.createElement("div");
    newStep.setAttribute("id", "step" + step)
    newStep.classList.add("step");

    if (stepContent.type === "qcm1") {
        newStep.innerHTML = `
        <h1 id="question">${stepContent.question}</h1>
        <div id="answers1">
            <button id="answer1" class="answer1">${stepContent.answer1}</button>
            <button id="answer2" class="answer1">${stepContent.answer2}</button>
            <button id="answer3" class="answer1">${stepContent.answer3}</button>
        </div>
        `

        document.querySelector("#steps").appendChild(newStep)

        document.querySelectorAll(".answer1").forEach(element => {
            element.addEventListener("click", () => {
                if (!answered) {
                    answered = true

                    document.querySelectorAll(".answer1").forEach(btn => {
                        btn.style.color = "#B0C8E8";
                        btn.style.border = "2px solid #B0C8E8";
                        btn.style.backgroundColor = "transparent";
                    });

                    element.style.color = "#0D0D1F";
                    element.style.border = "none";

                    if (element.textContent === stepContent.goodAnswer) {
                        setParams(personnality, "goodAnswer")
                        element.style.backgroundColor = "#008610";
                    } else {
                        setParams(personnality, "wrongAnswer")
                        element.style.backgroundColor = "#CB0000";

                        document.querySelectorAll(".answer1").forEach(element2 => {
                            if (element2.textContent == stepContent.goodAnswer) {
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
        newStep.innerHTML = `
        <h1 id="question">${stepContent.question}</h1>
        <div id="answers2">
            <button id="answer1" class="answer2"><img src="../assets/moteur.svg" alt="${stepContent.answer1}"></button>
            <button id="answer2" class="answer2"><img src="../assets/bobine.svg" alt="${stepContent.answer2}"></button>
            <button id="answer3" class="answer2"><img src="../assets/barrage.svg" alt="${stepContent.answer3}"></button>
            <button id="answer4" class="answer2"><img src="../assets/radio.svg" alt="${stepContent.answer4}"></button>
        </div>
        `

        document.querySelector("#steps").appendChild(newStep)

        document.querySelectorAll(".answer2").forEach(element => {
            const imgElement = element.querySelector("img")

            element.addEventListener("click", () => {
                if (!answered) {
                    answered = true
                    const answerSelected = imgElement.alt

                    document.querySelectorAll(".answer2").forEach(btn => {
                        btn.style.border = "3px solid #B0C8E8";
                    });

                    if (answerSelected === stepContent.goodAnswer) {
                        setParams(personnality, "goodAnswer")
                        element.style.border = "3px solid #008610";
                    } else {
                        setParams(personnality, "wrongAnswer")
                        element.style.border = "3px solid #CB0000";

                        document.querySelectorAll(".answer2").forEach(element2 => {
                            const imgElement = element2.querySelector("img")
                            const answerSelected = imgElement.alt
                            if (answerSelected === stepContent.goodAnswer) {
                                element2.style.border = "3px solid #008610";
                            }
                        });
                    }
                }
                showNextButton()
            })
        });
    } else if (stepContent.type === "frise") {
        newStep.innerHTML = `
            <h1 id="question">${stepContent.question}</h1>
            <div id="choices-container" class="choices-container"></div>
            <div id="dates-container" class="dates-container"></div>
            <button id="submitFrise" class="action-button" style="margin-top: 20px;">Valider</button>
        `;

        document.querySelector("#steps").appendChild(newStep);

        const containerChoices = newStep.querySelector("#choices-container");
        const containerDates = newStep.querySelector("#dates-container");
        const submitBtn = newStep.querySelector("#submitFrise");

        const choices = stepContent.choices;
        let answers = [];

        choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.name;
            button.dataset.date = choice.date;
            button.classList.add("chip");
            containerChoices.appendChild(button);
        });

        containerChoices.addEventListener("click", (e) => {
            if (e.target.classList.contains("chip")) {
                selected = e.target;
            }
        });

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

        containerDates.addEventListener("click", (e) => {
            if (e.target.classList.contains("chip")) {
                const chip = e.target;
                if (chip.classList.contains("locked")) return;

                chip.style.backgroundColor = "";
                chip.style.color = "";
                chip.style.border = "";
                containerChoices.appendChild(chip);
                answers = answers.filter(ans => ans.name !== chip.textContent);
                return;
            }

            if (!selected) return;

            const row = e.target.closest(".timeline-row");
            if (!row) return;

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
            answers = answers.filter(ans => ans.name !== selected.textContent);
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
            if (answers.length < choices.length) return;

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
                    if (!scoreSent) setParams(personnality, "goodAnswer");
                    submitBtn.style.display = "none";
                    showNextButton();
                } else {
                    if (!scoreSent) {
                        setParams(personnality, "wrongAnswer");
                        scoreSent = true;
                    }
                }
            }
        });
    }

    document.querySelectorAll(".date").forEach(element => {
        element.addEventListener("click", () => {
            if (element.getAttribute("id") == "goodAnswer") {
                setParams(personnality, "goodAnswer")
                showNextButton()
            } else {
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