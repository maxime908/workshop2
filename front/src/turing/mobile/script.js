import { getAPI, createGame, getStep, getPersonnality } from "../../utils.js";
import { setParams } from "../../utils";


const personnality = "turing"


let allData = await getPersonnality(personnality)

allData = allData.data

console.log("poule : " ,allData)


console.log(allData)

// Exemple d'utilisation du contenu de allData
// document.querySelector("#title").textContent = allData.name
// document.querySelector("#desc").textContent = allData.description



// On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
let createGameStatus = await createGame("turing")
createGameStatus = createGameStatus.data


// Quand on clique sur le bouton "Commencer l'expérience"
document.querySelector("#start").addEventListener("click", () => {
    showStep(1)
    // document.querySelector("#title").textContent = allData.name
    document.querySelector("#step1").style.display="block"
    document.querySelector("#start").style.display="none"
    if (createGameStatus) {
        console.log("le jeu a commencée")
    } else {
        // Ici afficher l'info que quelqu'un joue déjà et qu'il faut attendre encore quelques instants
    }
})

document.querySelector("#step1").addEventListener("click", ()=>{
    showStep(2)
    // document.querySelector("#step2").style.display ="block"
    document.querySelector("#step2").style.display ="block"
    document.querySelector("#step1").style.display ="none"
    document.querySelector("#start").style.display ="none"
})

document.querySelector("#step2").addEventListener("click", ()=>{
    showStep(3)
    document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "block"
    // document.querySelector("#start").style.display = "block"
})

document.querySelector("#step3").addEventListener("click", ()=>{
    showStep(0)
    // document.querySelector("#step2").style.display = "none"
    document.querySelector("#step3").style.display = "none"
    document.querySelector(".step3").style.display = "none"
    document.querySelector("#start").style.display ="block"
    document.querySelectorAll("#step-btn circle").forEach((element) => {
        element.style.fill = "#F8FCF9";
    })

    document.querySelectorAll(".hidd").forEach((element) => {
        element.style.display = "block"
    })
})



// document.querySelector("#step3").addEventListener("click", ()=>{
//     showStep(3)
//     document.querySelector("#step3").style.display = "none"
//     document.querySelector("#start").style.display = "block"
// })



let clavier;
let cryptedText;
let qcmContainer;
let qcmIa;
let valid = document.createElement("button");
valid.innerText = "Valider";
valid.classList.add("main-btn")

async function showStep(step) {
    let stepContent = await getStep(personnality, step);
    stepContent = stepContent.data;
    let questionName = stepContent[0].question;
    let awnserName = stepContent[0].interaction;
    awnserName = JSON.parse(awnserName);
    questionName = JSON.parse(questionName);
    
    // document.querySelector("#title").textContent = questionName.name;
    // document.querySelector("#desc").textContent = questionName.question;

    if (step == 1) {
        document.querySelectorAll(".hidd").forEach((element) => {
            element.style.display = "none"
        })

        clavier = document.createElement("div");

        document.querySelector("#step-btn1 circle").style.fill = "#C88010";
        
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
            supp.innerText = "supprimer";
            supp.classList.add("main-btn")

            const h1 = document.createElement("h1");
            h1.innerHTML = "Décrypte ce message : <br> XIXK";
            clavier.appendChild(h1)  

            const div = document.createElement("div");

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
                
                div.appendChild(touche);
            });

            clavier.appendChild(div)
            
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

            document.querySelector("#sect-step1").appendChild(clavier);
            document.querySelector("#sect-step1").appendChild(valid);
        }
    } else if (step == 2) {
        console.log("Etape 2 chargée")
        // document.querySelector("#title").textContent = stepContent.name
        
        if (clavier) clavier.remove()
        // if (TextInput) TextInput.remove()
        if (cryptedText) cryptedText.remove()
        if (valid) valid.remove()
        
        document.querySelector("#step-btn2 circle").style.fill = "#C88010";

        qcmContainer = document.createElement("div");
        
        const questionElement = document.createElement("h1");
        questionElement.textContent = "Pourquoi la machine de Turing est-elle importante ?";
        questionElement.classList.add("question-step2")
        questionElement.classList.add("jost")

        const awnsers = awnserName.answers;
        const gooodAwnser = awnserName.goodAnswer; 
        
        const buttonStep2 = [];

        const div = document.createElement("div")

        div.classList.add("btnGroup")

        div.appendChild(questionElement)

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
                    btnAw.style.backgroundColor = "red";
                    btnAw.textContent == gooodAwnser

                    qcmContainer.querySelectorAll("button").forEach((element) => {
                        if (element.textContent === gooodAwnser) {
                            element.style.backgroundColor = "green";
                        }
                    })
                    
                    document.getElementById(gooodAwnser).style.backgroundColor="green"
                }
            });

            document.querySelectorAll(".hidd").forEach(element => {
                element.style.display = "none";
            });

            div.appendChild(btnAw)
            
            qcmContainer.appendChild(div);
        });

        document.querySelector("#sect-step2").appendChild(qcmContainer);
        
    } else if (step == 3) {
        console.log("harry potter3")
        // document.querySelector("#title").textContent = stepContent.name
        if (qcmContainer) qcmContainer.remove()
    
        qcmIa = document.createElement("div")
        qcmIa.classList.add("step3")
        qcmIa.classList.add("btnGroup")
        const title = document.createElement("h1");
        title.textContent = "Qui est l’humain ?"
        const img = document.createElement("img")
        img.src = "../assets/message.svg";
        img.classList.add("img-message")

        const div = document.createElement("div");

        qcmIa.appendChild(title)
        qcmIa.appendChild(img)
        qcmIa.appendChild(div)

        document.querySelector("#step-btn3 circle").style.fill = "#C88010";

        const awnsers = awnserName.answers;
        const goodAnwser = awnserName.goodAnswer;

       
        const buttonStep3 = [];

        awnsers.forEach(awnser => {
            const btnAw = document.createElement("button");
            btnAw.classList.add("btnAw-sect3")
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

                qcmIa.querySelectorAll("button").forEach((element) => {
                    if (element.textContent === goodAnwser) {
                        element.style.backgroundColor = "green";
                    }
                })
            });
            
            div.appendChild(btnAw)
        });

        document.querySelector("#sect-step3").appendChild(qcmIa)
    } 
}