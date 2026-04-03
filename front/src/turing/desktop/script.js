import axios from "axios";
import { readJSONFile } from "../../utils";

let oldDataStep = null;
let oldDataLettre = null;


let step0Container = null;

let letterShow = null; 
let TextInput = null;

async function checkUpdates() {
  try {
    const data = await readJSONFile("../../../steps.json");
    const dataStep = data.turing.step;
    const dataLettre = data.turing.params;
    
    if (dataStep !== oldDataStep) {
      console.log("Nouvelles valeurs, changeons la window ! Étape :", dataStep);
      
  
      if (dataStep !== 0 && step0Container) {
          step0Container.remove();
          step0Container = null;
      }

      
      if (dataStep !== 1) {
        const step1Container = document.getElementById("step-1-container");
        if (step1Container) {
          step1Container.remove();
          letterShow = null;
          TextInput = null;
        } 
      }

      // Initialize the specific step
      if (dataStep === 0) initStep0();
      if (dataStep === 1) initLampBoard();
      if (dataStep === 2) console.log("harrypotter step 2");
      if (dataStep === 3) console.log("harrypotter step 3");
      
      oldDataStep = dataStep;
    }

    // Handle incoming letters and commands for STEP 1
    if (dataStep === 1 && dataLettre !== oldDataLettre && dataLettre !== "") {
      
      if (dataLettre === "DELETE") {
        if (TextInput.value.length > 0) {
          TextInput.value = TextInput.value.slice(0, -1);
          TextInput.style.backgroundColor = ""; 
        }
      } 
      else if (dataLettre === "VALIDATE") {
          if (TextInput.value === "ALAN") {
            console.log("win");
            TextInput.style.backgroundColor = "green";
          } else {
            console.log("lose");
            TextInput.style.backgroundColor = "red";
          }
      } 
      else {
          lightUpLetter(dataLettre);
          write(dataLettre);
          TextInput.style.backgroundColor = ""; 
      }

      oldDataLettre = dataLettre;
    }

  } catch (error) {
    console.error("Erreur de lecture du JSON :", error);
  }
}

setInterval(checkUpdates, 200);

// --- STEP 0 FUNCTION ---
function initStep0() {
  if (step0Container) return;

  step0Container = document.createElement("div");
  step0Container.id = "step-0-container";

  // Build the layout matching the mockups
  step0Container.innerHTML = `
      <img src="../assets/Vector.svg" id="vector-bg" class="step0-asset" alt="Background Vector">
      <img src="../assets/Title.svg" id="title-img" class="step0-asset" alt="Alan Turing Title">
      <img src="../assets/head.svg" id="turing-head" class="step0-asset" alt="Alan Turing Head">
      <img src="../assets/decoration.svg" id="decor-1" class="step0-asset" alt="Decoration Top Left">
      <img src="../assets/decoration1.svg" id="decor-2" class="step0-asset" alt="Decoration Bottom Right">
      <div id="qr-placeholder" class="step0-asset"></div>
  `;

  document.body.appendChild(step0Container);
}


function initLampBoard() {
  if (document.getElementById("step-1-container")) return;

  // Création du conteneur principal de l'étape 1
  const step1Container = document.createElement("div");
  step1Container.id = "step-1-container";

  // Ajout de la ligne verte en fond
  const vectorBg = document.createElement("img");
  vectorBg.src = "../assets/vector2.svg";
  vectorBg.id = "step1-vector-bg";
  step1Container.appendChild(vectorBg);


  
  letterShow = document.createElement("div");
  letterShow.classList.add("lamp-board");
  
  const Alphabet = [
    'A','B','C','D','E','F','G','H','I','J',
    'K','L','M','N','O','P','Q','R','S','T','U','V',
    'W','X','Y','Z'
  ];

  Alphabet.forEach(lettre => {
    const toucheLum = document.createElement("div");
    toucheLum.textContent = lettre;
    toucheLum.classList.add("lamp");          
    toucheLum.dataset.lettre = lettre; 
    letterShow.appendChild(toucheLum);
  });
  
  step1Container.appendChild(letterShow);


  const tvContainer = document.createElement("div");
  tvContainer.id = "tv-container";

  const tvImg = document.createElement("img");
  tvImg.src = "../assets/televerte.svg";
  tvImg.id = "tv-img";
  tvContainer.appendChild(tvImg);


  const tvScreen = document.createElement("div");
  tvScreen.id = "tv-screen";

  TextInput = document.createElement("input");
  TextInput.classList.add("secret-input");
  TextInput.disabled = true;
  tvScreen.appendChild(TextInput);

  tvContainer.appendChild(tvScreen);
  step1Container.appendChild(tvContainer);

  document.body.appendChild(step1Container);
}

function lightUpLetter(lettre) {
  if (!letterShow) return;
  
  const lampeAAllumer = letterShow.querySelector(`[data-lettre="${lettre}"]`);
  
  if (lampeAAllumer) {
    lampeAAllumer.classList.add("lit");
    
    setTimeout(() => {
      lampeAAllumer.classList.remove("lit");
    }, 500);
  }
}

function write(value){
  if (TextInput) {
      TextInput.value += value;
  }
}