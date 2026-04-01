import { getPersonnality, getStep } from "../../utils.js";

// Initialisation de la connexion avec le serveur Temps Réel
// (Nécessite d'avoir importé la librairie Socket.io dans ton fichier HTML desktop)
const socket = io(); 

const personnality = "turing";

// Éléments fixes de la page
const titleElement = document.querySelector("#title");
const descElement = document.querySelector("#desc");

// Variables globales pour stocker nos éléments DOM dynamiques
let letterShow;
let TextInput;
let allData;

// 1. Initialisation de la page Desktop (Titre et Description de base)
async function initDesktop() {
    let response = await getPersonnality(personnality);
    allData = response.data;

    titleElement.textContent = allData.name;
    descElement.textContent = allData.description;
}

initDesktop();

// 2. Fonction pour construire l'interface de l'étape 1 (Lampes + Input)
function buildStep1UI() {
    // Si l'interface existe déjà, on ne la recrée pas
    if (document.querySelector(".lamp-board")) return;

    letterShow = document.createElement("div");
    TextInput = document.createElement("input");
    
    letterShow.classList.add("lamp-board"); 
    TextInput.classList.add("secret-input");
    
    // On désactive l'input pour empêcher le joueur de tricher avec son clavier physique
    TextInput.disabled = true; 

    const touchesEnigma = [
        'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O','P', 
        'Q', 'S', 'D', 'F', 'G', 'H', 'J','K', 'L', 'M',
        'W', 'X', 'C', 'V', 'B', 'N'
    ];

    touchesEnigma.forEach(lettre => {
        const toucheLum = document.createElement("div");
        toucheLum.textContent = lettre;
        toucheLum.classList.add("lamp");
        toucheLum.dataset.lettre = lettre; 
        
        letterShow.appendChild(toucheLum);
    });

    // On ajoute les éléments à la page
    document.querySelector("body").appendChild(TextInput);
    document.querySelector("body").appendChild(letterShow);
}

// ---------------------------------------------------------
// 3. GESTION DU TEMPS RÉEL (Écoute des événements du mobile)
// ---------------------------------------------------------

// A. Le mobile change d'étape (Ex: Clic sur "Commencer l'expérience" ou "Etape 2")
socket.on("changeStep", async (data) => {
    const step = data.step;
    
    // On récupère les infos de la nouvelle étape
    let stepContent = await getStep(personnality, step);
    stepContent = stepContent.data;

    if (step === 1) {
        titleElement.textContent = allData.name;
        descElement.style.display = "none"; // On peut cacher la description pendant le jeu
        buildStep1UI();
        
    } else if (step === 2) {
        titleElement.textContent = stepContent.name;
        
        // On nettoie l'écran de l'étape 1 si on passe à la 2
        if (letterShow) letterShow.remove();
        if (TextInput) TextInput.remove();
        
    } else if (step === 3) {
        titleElement.textContent = stepContent.name;
    }
});

// B. Le mobile envoie une lettre chiffrée
socket.on("receiveLetter", (data) => {
    // Sécurité : on s'assure que l'interface de l'étape 1 est bien affichée
    if (!TextInput || !letterShow) return;

    const lettreChiffree = data.lettre;
    
    // 1. On ajoute la lettre au champ texte
    TextInput.value += lettreChiffree;

    // 2. On trouve la lampe correspondante et on l'allume
    const lampeAAllumer = letterShow.querySelector(`[data-lettre="${lettreChiffree}"]`);
    
    if (lampeAAllumer) {
        lampeAAllumer.classList.add("lit");
        
        // On l'éteint après 500ms
        setTimeout(() => {
            lampeAAllumer.classList.remove("lit");
        }, 500);
    }
});

// C. Le mobile clique sur "supprimer"
socket.on("clearText", () => {
    if (TextInput) {
        TextInput.value = "";
    }
});