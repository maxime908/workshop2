import { all } from "axios";
import { getAPI, createGame, getStep, getPersonnality } from "../../utils";

// Nom de la personnalité utilisée pour toutes les requêtes API
const personnality = "lamarr"

const containerChoices = document.querySelector("#section-step2-events");
const containerDates = document.querySelector("#section-step2-dates");

const containerChoicesQuestion = document.querySelector("#section-step3-buttons");
const containerQuestion = document.querySelector("#section-step3-questions");
// Récupère les infos de la personnalité (nom, description, etc.)
let allData = await getPersonnality(personnality)
allData = allData.data
console.log(allData)

// Cache les boutons de navigation des étapes au départ
document.querySelector("#step1").style.display = "none"
document.querySelector("#step2").style.display = "none"
document.querySelector("#step3").style.display = "none"

// Affiche le nom et la description de la personnalité dans le HTML
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description

// Crée une partie — retourne true si OK, false si quelqu'un joue déjà
let createGameStatus = await createGame("lamarr")
createGameStatus = createGameStatus.data


document.querySelector("#start").addEventListener("click", async () => {
    // Cache le bouton start et affiche l'étape 0
    document.querySelector("#start").style.display = "none"
    document.querySelector("#step1").style.display = "block"
    document.querySelector("#section-step2").style.display = "block"

    // Récupère les données de l'étape 0 depuis l'API
    const result = await getStep("lamarr", 0);
    console.log(result.data)


    // Parse le JSON de la question pour récupérer les choix
    let choices = result.data[0].question;
    choices = JSON.parse(choices)
    choices = choices.choices

    if (!choices ) {
        console.error("Erreur: choices introuvable", result);
        return;
    }
    

    containerChoices.innerHTML = "";
    containerDates.innerHTML = "";

    // Stocke les réponses du joueur
    const answers = []
    // Stocke le bouton événement actuellement sélectionné
    let selected = null

    // Quand on clique sur un événement, on le sélectionne
    containerChoices.addEventListener("click", (e) => {
        selected = e.target
        console.log(selected)
    })

    // Crée un bouton pour chaque événement avec sa date correcte en data-date
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.name;
        button.dataset.date = choice.date; // date correcte stockée en dataset
        containerChoices.appendChild(button);
    });

    // Récupère les dates uniques pour la frise
    const uniqueDates = [...new Set(choices.map(c => c.date))];

    // Quand on clique sur une date, on associe l'événement sélectionné à cette date
    containerDates.addEventListener("click", (e) => {
        if (!selected) return

        // Stocke la réponse du joueur (correct = 1 si bonne réponse, 0 sinon)
        answers.push({
            name: selected.textContent,
            placedDate: e.target.textContent,
            correctDate: selected.dataset.date,
            correct: selected.dataset.date === e.target.textContent ? 1 : 0
        })

        selected = null
        console.log(answers)
    })

    // Crée un bouton pour chaque date unique de la frise
    uniqueDates.forEach(date => {
        const button = document.createElement("button");
        button.textContent = date;
        containerDates.appendChild(button);
    });

    // Quand on clique sur Soumettre
    document.querySelector("#submit").addEventListener("click", () => {
        // Vérifie que tous les événements ont été placés
        if (answers.length < choices.length) {
            console.log("Tu n'as pas placé tous les événements !")
            return
        }

        // Colorie chaque bouton en vert (correct) ou rouge (incorrect)
        answers.forEach(answer => {
            const buttons = containerChoices.querySelectorAll("button")
            buttons.forEach(btn => {
                if (btn.textContent === answer.name) {
                    btn.classList.add(answer.correct === 1 ? "correct" : "incorrect")
                }
            })
        })

        // Passe à l'étape suivante après 2 secondes
        setTimeout(() => document.querySelector("#step1").click(), 2000)
    })

    showStep(0)

    if (createGameStatus) {
        console.log("le jeu a commencé")
    } else {
        // Afficher que quelqu'un joue déjà
    }
})

/// Navigation étape 1 → étape 2
document.querySelector("#step1").addEventListener("click", async () => {
    // 1. On gère l'affichage initial
    document.querySelector("#step1").style.display = "none";
    document.querySelector("#section-step2").style.display = "none";
    document.querySelector("#section-step3").style.display = "block";
    
    
    // On cache le bouton de l'étape suivante pour forcer à répondre
    document.querySelector("#step2").style.display = "none"; 

    showStep(1);

    const result_question = await getStep("lamarr", 1);
    let parsed = JSON.parse(result_question.data[0].question);
    let choices_questions = parsed.choices;

    if (!choices_questions) {
        console.error("Erreur: choices introuvable", result_question);
        return;
    }

    containerChoicesQuestion.innerHTML = "";
    containerQuestion.innerHTML = "";

    // Affichage de la question
    const questions = document.createElement("p");
    questions.textContent = parsed.question;
    containerQuestion.appendChild(questions);

    // 2. Création des boutons de choix
    choices_questions.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.label; 
        
        button.addEventListener("click", () => {
            if (choice.correct) {
                button.classList.add("correct");
                console.log("Bravo !");
                // On affiche le bouton de l'étape suivante uniquement si c'est juste
                document.querySelector("#step2").style.display = "block";
            } else {
                button.classList.add("incorrect");
                console.log("Raté !");
            }
        });

        containerChoicesQuestion.appendChild(button);
    }); 
});

// Navigation étape 2 → étape 3/
document.querySelector("#step2").addEventListener("click", () => {
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "block"
    document.querySelector("#section-step3").style.display = "none" 
    document.querySelector("#section-step4").style.display = "block" 
    showStep(2)

    const track = document.getElementById('track');
    const thumb = document.getElementById('thumb');
    const display = document.getElementById('value-display');

    const MAX_VALUE = 30000000;
    let finalValue = 0; // C'est cette variable que tu utiliseras pour ton JSON

        function updateSlider(e) {
        const largeurBarre = track.offsetWidth; 
        
        // 2. On calcule la position du doigt (X) par rapport au début de la barre
        let positionX = e.clientX - track.getBoundingClientRect().left;
        let ratio = positionX / largeurBarre;
        ratio = Math.max(0, Math.min(1, ratio));

        // 4. MISE À JOUR VISUELLE : on déplace le bouton noir
        thumb.style.left = (ratio * 100) + "%";

        finalValue = Math.round(ratio * MAX_VALUE);
        
        // 6. ON AFFICHE LE TEXTE
        display.textContent = finalValue.toLocaleString() + "$";
    }

    // Gestion des clics et mouvements
    track.addEventListener('pointerdown', (e) => {
        track.setPointerCapture(e.pointerId); // "Capture" le pointeur pour ne pas le perdre si on bouge vite
        updateSlider(e);
        
        track.onpointermove = updateSlider; // Active le mouvement
    });

    track.addEventListener('pointerup', (e) => {
        track.onpointermove = null; // Désactive le mouvement
        console.log("Valeur finale choisie :", finalValue);
    });
});

// Navigation étape 3 → retour au début
document.querySelector("#step3").addEventListener("click", () => {
    document.querySelector("#step3").style.display = "none"
    document.querySelector("#start").style.display = "block"
    document.querySelector("#section-step4").style.display = "none" 
    showStep(3)
})

// Affiche le contenu d'une étape selon son numéro
async function showStep(step) {
    let stepContent = await getStep(personnality, step)
    stepContent = stepContent.data
    console.log("J'ai getStep", step, "ça m'a donné", stepContent)

    if (stepContent && stepContent.name) {
        document.querySelector("#title").textContent = stepContent.name
    }

    if (step == 1) {
        // Ici on gère l'affichage de l'interaction 1
    } else if (step == 2) {
        // Ici on gère l'affichage de l'interaction 2
    } else if (step == 3) {
        // Ici on gère l'affichage de l'interaction 3
    }
}