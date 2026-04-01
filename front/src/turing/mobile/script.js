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

const letterShow = document.createElement("div");
const clavier = document.createElement("div");
const TextInput = document.createElement("input");



async function showStep(step) {
    let stepContent = await getStep(personnality, step)
    stepContent = stepContent.data
    

    if (step == 1) {
       
        clavier.classList.add("keyboard-container");
        letterShow.classList.add("lamp-board"); 
        TextInput.classList.add("secret-input");



        if (clavier.children.length === 0) {
            
            const Alphabet = ['A','B','C','D','E','F','G','H','I','J',
                'K','L','M','N','O','P','Q','R','S','T','U','V',
                'W','X','Y','Z'];

            const touchesEnigma = [
                'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O','P', 
                'Q', 'S', 'D', 'F', 'G', 'H', 'J','K', 'L', 'M',
                'W', 'X', 'C', 'V', 'B', 'N'
            ];

            touchesEnigma.forEach(lettre => {
                const toucheLum = document.createElement("div");
                const touche = document.createElement("button");
                
                toucheLum.textContent = lettre;
                touche.textContent = lettre;
                
                touche.classList.add("key");
                toucheLum.classList.add("lamp");
                
                
                toucheLum.dataset.lettre = lettre; 

                touche.addEventListener("click", () => {
                    let indexActuel = Alphabet.indexOf(lettre);
                    let nouvelIndex = (indexActuel + 3) % Alphabet.length; 
                    let lettreChiffree = Alphabet[nouvelIndex];
                    
                    TextInput.value += lettreChiffree;


                    const lampeAAllumer = letterShow.querySelector(`[data-lettre="${lettreChiffree}"]`);
                    
                    if (lampeAAllumer) {
                        
                        lampeAAllumer.classList.add("lit");
                        
                
                        setTimeout(() => {
                            lampeAAllumer.classList.remove("lit");
                        }, 500);
                    }
                });

                letterShow.appendChild(toucheLum);
                clavier.appendChild(touche);
            });
            
        
            document.querySelector("body").appendChild(TextInput);
            document.querySelector("body").appendChild(letterShow);
            document.querySelector("body").appendChild(clavier); 
        }
    }
    else if (step == 2) {
        console.log("harry potter2")
        document.querySelector("#title").textContent = stepContent.name
        clavier.style.display="none"
        letterShow.style.display="none"
        TextInput.style.display="none"

    } else if (step == 3) {
        console.log("harry potter3")
        document.querySelector("#title").textContent = stepContent.name
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

}
