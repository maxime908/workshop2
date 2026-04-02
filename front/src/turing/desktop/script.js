import axios from "axios";
import { readJSONFile } from "../../utils";

let oldDataStep = null;
let oldDataLettre = null;
let letterShow = null; 
let TextInput = null;

async function checkUpdates() {
  try {
    const data = await readJSONFile("../../../steps.json");
    const dataStep = data.turing.step;
    const dataLettre = data.turing.params;
    
    if (dataStep !== oldDataStep) {
      console.log("Nouvelles valeurs, changeons la window ! Étape :", dataStep);
      document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep;
      
      // Cleanup previous step elements
      if (dataStep !== 1) {
          if (letterShow) { letterShow.remove(); letterShow = null; }
          if (TextInput) { TextInput.remove(); TextInput = null; }
      }

      // Initialize the specific step
      if (dataStep === 0) console.log("harrypotter step 0");
      if (dataStep === 1) initLampBoard();
      if (dataStep === 2) console.log("harrypotter step 2");
      if (dataStep === 3) console.log("harrypotter step 3");
      
      oldDataStep = dataStep;
    }

    // Handle incoming letters and commands
    if (dataStep === 1 && dataLettre !== oldDataLettre && dataLettre !== "") {
      
      if (dataLettre === "DELETE") {
          // Remove the last character
          if (TextInput.value.length > 0) {
              TextInput.value = TextInput.value.slice(0, -1);
              TextInput.style.backgroundColor = ""; // Reset color
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
          // It's a normal letter: light it up and write it
          lightUpLetter(dataLettre);
          write(dataLettre);
          TextInput.style.backgroundColor = ""; // Reset color in case they type after an error
      }

      oldDataLettre = dataLettre;
    }

  } catch (error) {
    console.error("Erreur de lecture du JSON :", error);
  }
}

setInterval(checkUpdates, 200);

function initLampBoard() {
  if (letterShow) return;

  letterShow = document.createElement("div");
  letterShow.classList.add("lamp-board");
  
  TextInput = document.createElement("input");
  TextInput.classList.add("secret-input");
  TextInput.disabled = true;

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

  // Append BOTH the board and the input to the DOM
  document.querySelector("body").appendChild(letterShow);
  document.querySelector("body").appendChild(TextInput); 
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