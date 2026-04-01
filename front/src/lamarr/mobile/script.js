import { getAPI, createGame, getStep, getPersonnality } from "../../utils";

// Nom de la personnalité utilisée pour toutes les requêtes API
const personnality = "lamarr"
const containerChoices = document.querySelector("#section-step2-events");
const containerDates = document.querySelector("#section-step2-dates");
const containerChoicesQuestion = document.querySelector("#section-step3-buttons");
const containerQuestion = document.querySelector("#section-step3-questions");

// Récupère les infos de la personnalité
let allData = await getPersonnality(personnality)
allData = allData.data

// Cache les boutons de navigation au départ
document.querySelector("#step1").style.display = "none"
document.querySelector("#step2").style.display = "none"
document.querySelector("#step3").style.display = "none"

document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description

// Crée une partie — true si OK, false si quelqu'un joue déjà
let createGameStatus = await createGame("lamarr")
createGameStatus = createGameStatus.data

document.querySelector("#start").addEventListener("click", async () => {
    document.querySelector("#start").style.display = "none"
    document.querySelector("#step1").style.display = "block"
    document.querySelector("#section-step2").style.display = "block"

    const result = await getStep("lamarr", 0);
    let choices = result.data[0].question;
    choices = JSON.parse(choices).choices

    if (!choices) {
        console.error("Erreur: choices introuvable", result);
        return;
    }

    containerChoices.innerHTML = "";
    containerDates.innerHTML = "";

    const answers = []
    let selected = null

    // Sélectionne un événement au clic
    containerChoices.addEventListener("click", (e) => {
        selected = e.target
    })

    // Crée les chips événements
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.name;
        button.dataset.date = choice.date;
        button.classList.add("chip")
        containerChoices.appendChild(button);
    });

    const uniqueDates = [...new Set(choices.map(c => c.date))];

    // Dépose la chip sur la date cliquée
    containerDates.addEventListener("click", (e) => {
        if (!selected) return
        const row = e.target.closest(".timeline-row")
        if (!row) return
        row.querySelector(".chips-zone").appendChild(selected)
        answers.push({
            name: selected.textContent,
            placedDate: row.dataset.date,
            correctDate: selected.dataset.date,
            correct: selected.dataset.date == row.dataset.date ? 1 : 0
        })
        selected = null
    })

    // Crée la frise avec date + zone de dépôt
    uniqueDates.forEach(date => {
        const row = document.createElement("div")
        row.classList.add("timeline-row")
        row.dataset.date = date
        const label = document.createElement("span")
        label.classList.add("date-label")
        label.textContent = date
        const chipsZone = document.createElement("div")
        chipsZone.classList.add("chips-zone")
        row.appendChild(label)
        row.appendChild(chipsZone)
        containerDates.appendChild(row)
    })

    // Vérifie les réponses et colorie les chips
    document.querySelector("#submit").addEventListener("click", () => {
        if (answers.length < choices.length) {
            console.log("Tu n'as pas placé tous les événements !")
            return
        }
        answers.forEach(answer => {
            containerDates.querySelectorAll("button").forEach(btn => {
                if (btn.textContent === answer.name) {
                    btn.classList.add(answer.correct === 1 ? "correct" : "incorrect")
                }
            })
        })
        setTimeout(() => document.querySelector("#step1").click(), 2000)
    })

    if (createGameStatus) {
        console.log("le jeu a commencé")
    }
})

// Navigation étape 1 → étape 2
document.querySelector("#step1").addEventListener("click", async () => {
    document.querySelector("#step1").style.display = "none";
    document.querySelector("#section-step2").style.display = "none";
    document.querySelector("#section-step3").style.display = "block";
    document.querySelector("#step2").style.display = "none";

    const result_question = await getStep("lamarr", 1);
    let parsed = JSON.parse(result_question.data[0].question);

    if (!parsed.choices) {
        console.error("Erreur: choices introuvable", result_question);
        return;
    }

    containerChoicesQuestion.innerHTML = "";
    containerQuestion.innerHTML = "";

    const questions = document.createElement("p");
    questions.textContent = parsed.question;
    containerQuestion.appendChild(questions);

    // Affiche le bouton suivant seulement si bonne réponse
    parsed.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.label;
        button.addEventListener("click", () => {
            if (choice.correct) {
                button.classList.add("correct");
                document.querySelector("#step2").style.display = "block";
            } else {
                button.classList.add("incorrect");
            }
        });
        containerChoicesQuestion.appendChild(button);
    });
})

// Navigation étape 2 → étape 3
document.querySelector("#step2").addEventListener("click", async () => {
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "block"
    document.querySelector("#section-step3").style.display = "none"
    document.querySelector("#section-step4").style.display = "block"

    const track = document.getElementById('track');
    const thumb = document.getElementById('thumb');
    const display = document.getElementById('value-display');
    const MAX_VALUE = 30000000;
    let finalValue = 0;

    function updateSlider(e) {
        let ratio = (e.clientX - track.getBoundingClientRect().left) / track.offsetWidth;
        ratio = Math.max(0, Math.min(1, ratio));
        thumb.style.left = (ratio * 100) + "%";
        finalValue = Math.round(ratio * MAX_VALUE);
        display.textContent = finalValue.toLocaleString() + "$";
    }

    track.addEventListener('pointerdown', (e) => {
        track.setPointerCapture(e.pointerId);
        updateSlider(e);
        track.onpointermove = updateSlider;
    });

    track.addEventListener('pointerup', () => {
        track.onpointermove = null;
    });

    const stepData = await getStep(personnality, 2)
    const parsed = JSON.parse(stepData.data[0].question)

    document.querySelector("#step4-question").textContent = parsed.question
    document.querySelector("#validate").classList.remove("correct", "incorrect")
    document.querySelector("#validate").textContent = "Valider"

    // Correct si slider proche de 0 (réponse = 0 dollar)
    document.querySelector("#validate").addEventListener("click", () => {
        if (finalValue <= 1000) {
            document.querySelector("#validate").classList.add("correct")
            document.querySelector("#validate").textContent = parsed.message
        } else {
            document.querySelector("#validate").classList.add("incorrect")
            document.querySelector("#validate").textContent = "Mauvaise réponse, réessaie !"
        }
        setTimeout(() => document.querySelector("#step3").click(), 5000)
    })
})

// Navigation étape 3 → retour au début
document.querySelector("#step3").addEventListener("click", () => {
    document.querySelector("#step3").style.display = "none"
    document.querySelector("#start").style.display = "block"
    document.querySelector("#section-step4").style.display = "none"
})

async function showStep(step) {
    let stepContent = await getStep(personnality, step)
    stepContent = stepContent.data
    if (stepContent && stepContent.name) {
        document.querySelector("#title").textContent = stepContent.name
    }
}
