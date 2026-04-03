import { getAPI, createGame, getStep, getPersonnality, setParams } from "../../utils";

const personnality = "tesla";
let currentStep = 0;
let answered = false;
let selected = null;
let stepContent;
const dialog = document.querySelector("#wait");

// Initialisation
let allData = await getPersonnality(personnality);

document.querySelector("#cancelButton").addEventListener("click", () => dialog.close());

const buttonsStart = [document.querySelector("#retryButton"), document.querySelector("#start")];
buttonsStart.forEach(element => {
    element.addEventListener("click", async () => {
        dialog.close();
        let createGameStatus = await createGame("tesla");
        // Forçage à true pour le développement si nécessaire
        if (createGameStatus) {
            showStep(1);
        } else {
            dialog.showModal();
        }
    });
});

async function showStep(step) {
    hideNextButton();
    await setParams(personnality, ""); // Reset des params à chaque étape

    currentStep = step;
    answered = false;

    let response = await getStep(personnality, step);
    
    // CAS : FIN DU QUIZ
    if (response.data.length === 0) {
        const endStep = document.createElement("div");
        endStep.classList.add("step", "transparent-step");
        endStep.innerHTML = `
            <div id="div-logo"><img src="../assets/logoCortexia.svg" alt="" id="logo"></div>
            <p id="info" style="margin-top: 20px;">FÉLICITATIONS ! <br><br> TU AS TERMINÉ LE QUIZ SUR <br> <strong>NIKOLA TESLA</strong></p>
            <button id="finalNext">TERMINER</button>
        `;

        document.querySelector("#steps").innerHTML = "";
        document.querySelector("#steps").appendChild(endStep);

        document.querySelector("#finalNext").addEventListener("click", async () => {
            // SIGNAL DE RESET POUR LE GRAND ÉCRAN
            await setParams(personnality, "reset");
            
            setTimeout(() => {
                window.location.href = "../../stats/index.html";
            }, 500);
        });
        return;
    }

    stepContent = JSON.parse(response.data[0].interaction);
    
    // Nettoyage de l'écran précédent
    const stepsDiv = document.querySelector("#steps");
    stepsDiv.innerHTML = ""; 

    const newStep = document.createElement("div");
    newStep.id = "step" + step;
    newStep.classList.add("step");

    // Logique QCM 1
    if (stepContent.type === "qcm1") {
        newStep.innerHTML = `
            <h1 id="question">${stepContent.question}</h1>
            <div id="answers1">
                <button class="answer1">${stepContent.answer1}</button>
                <button class="answer1">${stepContent.answer2}</button>
                <button class="answer1">${stepContent.answer3}</button>
            </div>
        `;
        stepsDiv.appendChild(newStep);

        document.querySelectorAll(".answer1").forEach(btn => {
            btn.addEventListener("click", async () => {
                if (answered) return;
                answered = true;
                
                if (btn.textContent === stepContent.goodAnswer) {
                    await setParams(personnality, "goodAnswer");
                    btn.style.backgroundColor = "#008610";
                } else {
                    await setParams(personnality, "wrongAnswer");
                    btn.style.backgroundColor = "#CB0000";
                }
                showNextButton();
            });
        });
    }
    // Note: Tu peux rajouter tes blocs QCM2 et Frise ici avec la même logique
}

function showNextButton() { document.querySelector("#nextContainer").style.display = "flex"; }
function hideNextButton() { document.querySelector("#nextContainer").style.display = "none"; }

document.querySelector("#next").addEventListener("click", () => {
    showStep(currentStep + 1);
});