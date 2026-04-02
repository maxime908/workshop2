import { getAPI, createGame, getStep, getPersonnality } from "../../utils.js";
import { setParams } from "../../utils";

<<<<<<< HEAD

const personnality = "turing"

=======
// Ici modifier avec le nom de votre personnalité
const personnality = "turing"
>>>>>>> ec6ba06d3506dae57203d80201ed7d2119f2be97

let allData = await getPersonnality(personnality)

allData = allData.data
<<<<<<< HEAD

console.log("poule : " ,allData)

=======
>>>>>>> ec6ba06d3506dae57203d80201ed7d2119f2be97

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



<<<<<<< HEAD
let clavier;
let cryptedText;
let qcmContainer;
let qcmIa;
let valid = document.createElement("button");
valid.innerText = "Valider";

async function showStep(step) {
    let stepContent = await getStep(personnality, step);
    stepContent = stepContent.data;
    let questionName = stepContent[0].question;
    let awnserName = stepContent[0].interaction;
    awnserName = JSON.parse(awnserName);
    questionName = JSON.parse(questionName);
=======
let letterShow
let clavier
let TextInput
let cryptedText
let qcmContainer
let qcmIa


async function showStep(step) {
    let stepContent = await getStep(personnality, step)
    stepContent = stepContent.data
>>>>>>> ec6ba06d3506dae57203d80201ed7d2119f2be97
    
    document.querySelector("#title").textContent = questionName.name;
    document.querySelector("#desc").textContent = questionName.question;

    if (step == 1) {
        clavier = document.createElement("div");
        cryptedText = document.createElement("h2");
        cryptedText.innerText = "XIXK";
        
        clavier.classList.add("keyboard-container"); 

        if (clavier.children.length === 0) {
            const Alphabet = ['A','B','C','D','E','F','G','H','I','J',
                'K','L','M','N','O','P','Q','R','S','T','U','V',
                'W','X','Y','Z'];

            const touchesEnigma = [
                'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O','P', 
                'Q', 'S', 'D', 'F', 'G', 'H', 'J','K', 'L', 'M',
                'W', 'X', 'C', 'V', 'B', 'N'
            ];

            const supp = document.createElement("button");
<<<<<<< HEAD
            supp.innerText = "supprimer";
=======
            supp.innerText="supprimer"

            const valid = document.createElement("button")
            valid.innerText="Valider"
            

>>>>>>> ec6ba06d3506dae57203d80201ed7d2119f2be97

            touchesEnigma.forEach(lettre => {
                const touche = document.createElement("button");
                touche.textContent = lettre;
                touche.classList.add("key");

                touche.addEventListener("click", async () => {
                    let indexActuel = Alphabet.indexOf(lettre);
                    // Caesar shift + 3
                    let nouvelIndex = (indexActuel + 3) % Alphabet.length; 
                    let lettreChiffree = Alphabet[nouvelIndex];
                    
                    try {
                        await setParams("turing", lettreChiffree);
                        console.log(`Lettre envoyée : ${lettreChiffree}`);
                    } catch (e) {
                        console.error("Erreur lors de l'envoi de la lettre", e);
                    }
                });
                
                clavier.appendChild(touche);
            });
            
            // Send DELETE command to desktop
            supp.addEventListener("click", async () => {
                try {
                    await setParams("turing", "DELETE");
                } catch (e) {
                    console.error(e);
                }
            });

            // Send VALIDATE command to desktop
            valid.addEventListener("click", async () => {
                try {
                    await setParams("turing", "VALIDATE");
                } catch (e) {
                    console.error(e);
                }
            });
      
            clavier.appendChild(supp);

            document.querySelector("body").appendChild(cryptedText);
            document.querySelector("body").appendChild(valid);
            document.querySelector("body").appendChild(clavier);
        }
    } else if (step == 2) {
        console.log("Etape 2 chargée")
        document.querySelector("#title").textContent = stepContent.name
        
        if (clavier) clavier.remove()
        if (TextInput) TextInput.remove()
<<<<<<< HEAD
        if (cryptedText) cryptedText.remove()
        if (valid) valid.remove()
        
        
=======
        if (letterShow) letterShow.remove()
>>>>>>> ec6ba06d3506dae57203d80201ed7d2119f2be97

        qcmContainer = document.createElement("div");
        
        const questionElement = document.createElement("h3");
        questionElement.textContent = "question";
        qcmContainer.appendChild(questionElement);

        const awnsers = ["reponsse A", "reponsse B", "reponsse C", "reponsse D"];
        const gooodAwnser = "reponsse B"; 
        
        const buttonStep2 = [];

        awnsers.forEach(awnser => {
            const btnAw = document.createElement("button");
            btnAw.textContent = awnser;
            btnAw.style.display = "block"; 
            btnAw.style.margin = "10px 0"; 
            
            
            buttonStep2.push(btnAw);
            
            btnAw.addEventListener("click", () => {
                buttonStep2.forEach(btn => btn.disabled = true);

                if (awnser === gooodAwnser) {
                    console.log("Bonne réponse !");
                    btnAw.style.backgroundColor = "green";
                } else {
                    console.log("Mauvaise réponse !");
<<<<<<< HEAD
                    element.style.backgroundColor = "red";
                    element.textContent == gooodAwnser
                    document.getElementById(gooodAwnser).style.backgroundColor="green"
=======
                    btnAw.style.backgroundColor = "red";
>>>>>>> ec6ba06d3506dae57203d80201ed7d2119f2be97
                }
            });
            
            qcmContainer.appendChild(btnAw);
        });

        document.querySelector("body").appendChild(qcmContainer);
        
    } else if (step == 3) {
        console.log("harry potter3")
        document.querySelector("#title").textContent = stepContent.name
        if (qcmContainer) qcmContainer.remove()
    
        qcmIa = document.createElement("div")

        const awnsers = ["personne A", "personne B"]
        const goodAnwser = "personne A"

       
        const buttonStep3 = [];

        awnsers.forEach(awnser => {
            const btnAw = document.createElement("button");
            btnAw.textContent = awnser;
            btnAw.style.display = "block"; 
            btnAw.style.margin = "10px 0"; 
            
   
            buttonStep3.push(btnAw);
            
            btnAw.addEventListener("click", () => {
                buttonStep3.forEach(btn => btn.disabled = true);

                if (awnser === goodAnwser) {
                    console.log("Bonne réponse !");
                    btnAw.style.backgroundColor = "green";
                } else {
                    console.log("Mauvaise réponse !");
                    btnAw.style.backgroundColor = "red";
                }
            });
            
            qcmIa.appendChild(btnAw);
        });

        document.querySelector("body").appendChild(qcmIa)

    } 
}