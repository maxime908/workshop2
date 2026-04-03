import { getAPI, createGame, getStep, getPersonnality, setParams, updateScore } from "../../utils";

const personnality = "lamarr"
const containerChoices = document.querySelector("#section-step2-events");
const containerDates = document.querySelector("#section-step2-dates");
const containerChoicesQuestion = document.querySelector("#section-step3-buttons");
const containerQuestion = document.querySelector("#section-step3-questions");

let score = 0

let allData = await getPersonnality(personnality)
allData = allData.data

document.querySelector("#step1").style.display = "none"
document.querySelector("#step2").style.display = "none"
document.querySelector("#step3").style.display = "none"

let createGameStatus = await createGame("lamarr")
createGameStatus = createGameStatus.data

// Précharge toutes les données au départ sans changer le step desktop
const preloadStep0 = await getStep("lamarr", 0)
const preloadStep1 = await getStep("lamarr", 1)
const preloadStep2 = await getStep("lamarr", 2)

// Remet le desktop à 0 après les préchargements
getStep("lamarr", 0)

document.querySelector("#start").addEventListener("click", () => {
    document.querySelector("#start").style.display = "none"
    document.querySelector("#section-step2").style.display = "block"
    document.querySelector("#Logo").style.display = "none"

    // Change le desktop à l'étape 1
    getStep("lamarr", 1)

    let choices = preloadStep0.data[0].question
    choices = JSON.parse(choices).choices

    if (!choices) {
        console.error("Erreur: choices introuvable");
        return;
    }

    containerChoices.innerHTML = "";
    containerDates.innerHTML = "";

    const answers = []
    let selected = null

    containerChoices.addEventListener("click", (e) => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"))
        selected = e.target
        selected.classList.add("selected")
    })

    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.name;
        button.dataset.date = choice.date;
        button.classList.add("chip")
        containerChoices.appendChild(button);
    });

    const uniqueDates = [...new Set(choices.map(c => c.date))];

    containerDates.addEventListener("click", (e) => {
        if (e.target.classList.contains("chip")) {
            const chip = e.target
            containerChoices.appendChild(chip)
            chip.classList.remove("selected")
            let index = -1
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].name === chip.textContent) index = i
            }
            answers.splice(index, 1)
            return
        }

        if (!selected) return
        const row = e.target.closest(".timeline-row")
        if (!row) return
        row.querySelector(".chips-zone").appendChild(selected)
        selected.classList.remove("selected")
        answers.push({
            name: selected.textContent,
            placedDate: row.dataset.date,
            correctDate: selected.dataset.date,
            correct: selected.dataset.date == row.dataset.date ? 1 : 0
        })
        selected = null
    })

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

    document.querySelector("#submit").addEventListener("click", () => {
        if (answers.length < choices.length) {
            console.log("Tu n'as pas placé tous les événements !")
            return
        }
        answers.forEach(answer => {
            containerDates.querySelectorAll("button").forEach(btn => {
                if (btn.textContent === answer.name) {
                    btn.classList.add(answer.correct === 1 ? "correct" : "incorrect")
                    if (answer.correct === 1) score++
                }
            })
        })
        // Change le desktop à l'étape 2
        getStep("lamarr", 2)
        setTimeout(() => document.querySelector("#step1").click(), 2000)
    })
})

document.querySelector("#step1").addEventListener("click", () => {
    document.querySelector("#step1").style.display = "none";
    document.querySelector("#section-step2").style.display = "none";
    document.querySelector("#section-step3").style.display = "block";
    document.querySelector("#step2").style.display = "none";

    let parsed = JSON.parse(preloadStep1.data[0].question);

    if (!parsed.choices) {
        console.error("Erreur: choices introuvable");
        return;
    }

    containerChoicesQuestion.innerHTML = "";
    containerQuestion.innerHTML = "";

    const questions = document.createElement("p");
    questions.textContent = parsed.question;
    containerQuestion.appendChild(questions);

    parsed.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.label;
        button.addEventListener("click", () => {
            if (choice.correct) {
                button.classList.add("correct");
                setParams("lamarr", "goodAnswer")
                score++
            } else {
                button.classList.add("incorrect");
                setParams("lamarr", "wrongAnswer")
            }
            setTimeout(() => document.querySelector("#step2").click(), 2000)
        });
        containerChoicesQuestion.appendChild(button);
    });
})

document.querySelector("#step2").addEventListener("click", () => {
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#section-step3").style.display = "none"
    document.querySelector("#section-step4").style.display = "block"

    // Change le desktop à l'étape 3
    getStep("lamarr", 3)

    const track = document.getElementById('track');
    const thumb = document.getElementById('thumb');
    const display = document.getElementById('value-display');
    const MAX_VALUE = 30000000;
    let finalValue = 0;

    function updateSlider(e) {
        let ratio = (e.clientX - track.getBoundingClientRect().left) / track.offsetWidth;
        if (ratio < 0) ratio = 0;
        if (ratio > 1) ratio = 1;
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

    const parsed = JSON.parse(preloadStep2.data[0].question)

    document.querySelector("#step4-question").textContent = parsed.question
    document.querySelector("#validate").classList.remove("correct", "incorrect")
    document.querySelector("#validate").textContent = "Valider"

    document.querySelector("#validate").addEventListener("click", () => {
        if (finalValue <= 1000) {
            document.querySelector("#validate").classList.add("correct")
            document.querySelector("#validate").textContent = parsed.message
            score++
        } else {
            document.querySelector("#validate").classList.add("incorrect")
            document.querySelector("#validate").textContent = "Mauvaise réponse!"
        }
        setTimeout(() => document.querySelector("#step3").click(), 5000)
    })
})

document.querySelector("#step3").addEventListener("click", () => {
    document.querySelector("#step3").style.display = "none"
    document.querySelector("#start").style.display = "block"
    document.querySelector("#section-step4").style.display = "none"
    document.querySelector("#Logo").style.display = "block"

    // Enregistre le score final
    updateScore("lamarr", score)
    console.log("Score final :", score)

    // Remet le desktop à 0
    getStep("lamarr", 0)
})
