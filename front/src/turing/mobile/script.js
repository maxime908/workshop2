import { getAPI, createGame, getStep, getPersonnality } from "../../utils.js";

// Ici modifier avec le nom de votre personnalité
const personnality = "turing"

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

// Exemple d'utilisation du contenu de allData
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description



// On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
let createGameStatus = await createGame("turing")
createGameStatus = createGameStatus.data


// Quand on clique sur le bouton "Commencer l'expérience"
document.querySelector("#start").addEventListener("click", () => {
    showStep(0)
    document.querySelector("#title").textContent = allData.name
    document.querySelector("#step1").style.display="block"
    document.querySelector("#start").style.display="none"
    if (createGameStatus) {
        console.log("le jeu a commencée")
    } else {
        // Ici afficher l'info que quelqu'un joue déjà et qu'il faut attendre encore quelques instants
    }
})

document.querySelector("#step1").addEventListener("click", ()=>{
    showStep(1)
    document.querySelector("#step2").style.display ="block"
    document.querySelector("#step1").style.display ="none"
    document.querySelector("#start").style.display ="none"
})

document.querySelector("#step2").addEventListener("click", ()=>{
    showStep(2)
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "block"
})

document.querySelector("#step3").addEventListener("click", ()=>{
    showStep(3)
    document.querySelector("#step3").style.display = "none"
    document.querySelector("#start").style.display = "block"
})


const Alphabet = [
    'A','B','C','D','E','F','G','H','I','J',
    'K','L','M','N','O','P','Q','R','S','T','U','V',
    'W','X','Y','Z'
];

const touchesEnigma = [
    'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O','P', 
    'Q', 'S', 'D', 'F', 'G', 'H', 'J','K', 'L', 'M',
    'W', 'X', 'C', 'V', 'B', 'N'
];

// Génère le champ de texte
function generateTextInput() {
    const input = document.createElement("input");
    input.classList.add("secret-input");
    // Ajout d'un attribut readonly si tu veux forcer l'utilisateur à utiliser le clavier virtuel
    // input.setAttribute("readonly", true); 
    return input;
}

// Génère le panneau des lumières (les lettres qui s'allument)
function generateLetterShow(touches) {
    const board = document.createElement("div");
    board.classList.add("lamp-board");

    touches.forEach(lettre => {
        const toucheLum = document.createElement("div");
        toucheLum.textContent = lettre;
        toucheLum.classList.add("lamp");
        toucheLum.dataset.lettre = lettre;
        board.appendChild(toucheLum);
    });

    return board;
}

// Génère le clavier cliquable et gère la logique de chiffrement
function generateClavier(touches, alphabet, textInputElement, lampBoardElement) {
    const keyboard = document.createElement("div");
    keyboard.classList.add("keyboard-container");

    const supp = document.createElement("button");
    supp.innerText = "supprimer";
    
    // Logique du bouton supprimer
    supp.addEventListener("click", () => {
        textInputElement.value = "";
    });

    touches.forEach(lettre => {
        const touche = document.createElement("button");
        touche.textContent = lettre;
        touche.classList.add("key");

        // Logique de chiffrement César (+3)
        touche.addEventListener("click", () => {
            let indexActuel = alphabet.indexOf(lettre);
            let nouvelIndex = (indexActuel + 3) % alphabet.length; 
            let lettreChiffree = alphabet[nouvelIndex];
            
            textInputElement.value += lettreChiffree;

            // Allumer la lampe correspondante
            const lampeAAllumer = lampBoardElement.querySelector(`[data-lettre="${lettreChiffree}"]`);
            if (lampeAAllumer) {
                lampeAAllumer.classList.add("lit");
                setTimeout(() => {
                    lampeAAllumer.classList.remove("lit");
                }, 500);
            }
        });

        keyboard.appendChild(touche);
    });

    keyboard.appendChild(supp);
    return keyboard;
}

let letterShow;
let clavier;
let TextInput;

async function showStep(step) {
    let stepContent = await getStep(personnality, step);
    stepContent = stepContent.data;

    if (step == 1) {
        // On vérifie si les éléments n'ont pas déjà été créés pour éviter les doublons
        if (!clavier) { 
            TextInput = generateTextInput();
            letterShow = generateLetterShow(touchesEnigma);
            clavier = generateClavier(touchesEnigma, Alphabet, TextInput, letterShow);
            
            document.body.appendChild(TextInput);
            document.body.appendChild(letterShow);
            document.body.appendChild(clavier); 
        }
    } 
    else if (step == 2) {
        console.log("harry potter2");
        
        const titleElement = document.querySelector("#title");
        if (titleElement) {
            titleElement.textContent = stepContent.name;
        }

        // On supprime les éléments du DOM s'ils existent
        if (clavier) clavier.remove();
        if (TextInput) TextInput.remove();
        if (letterShow) letterShow.remove();
        
        // Optionnel : on réinitialise les variables
        clavier = null;
        TextInput = null;
        letterShow = null;
    }
    else if (step == 3) {
        console.log("harry potter3")
        document.querySelector("#title").textContent = stepContent.name
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

} 

