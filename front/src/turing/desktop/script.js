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
      
      // --- GESTION DU QR CODE ---
      const qrcodeContainer = document.querySelector("#qrcode");
      if (qrcodeContainer) {
        if (dataStep !== 0) {
          console.log("supp qrcode");
          qrcodeContainer.style.display = "none"; // Cache complètement la div
          qrcodeContainer.innerHTML = "";         // Vide le QR code
        } else {
          console.log("gn qrcode");
          qrcodeContainer.style.display = "block"; // Réaffiche la div
          qrcodeContainer.innerHTML = "";          // S'assure qu'elle est vide
          new QRCode(qrcodeContainer, `${window.location.origin}/src/turing/mobile/index.html`);
        }
      }

      // --- NETTOYAGE DES ÉTAPES ---
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

      if (dataStep !== 2) {
        const step2Container = document.getElementById("step-2-container");
        if (step2Container) {
          step2Container.remove();
        }
      }
      
      if (dataStep !== 3) {
        const step3Container = document.getElementById("step-3-container");
        if (step3Container) {
          step3Container.remove();
        }
      }

      // --- INITIALISATION DE LA NOUVELLE ÉTAPE ---
      if (dataStep === 0) initStep0();
      if (dataStep === 1) initLampBoard();
      if (dataStep === 2) initStep2();
      if (dataStep === 3) initStep3();

      oldDataStep = dataStep;
    }

    // --- GESTION DES TOUCHES (ÉTAPE 1) ---
    if (dataStep === 1 && dataLettre !== oldDataLettre && dataLettre !== "") {
      if (dataLettre === "DELETE") {
        if (TextInput.value.length > 0) {
          TextInput.value = "";
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

function initStep0() {
  if (step0Container) return;

  step0Container = document.createElement("div");
  step0Container.id = "step-0-container";

  step0Container.innerHTML = `
      <img src="../assets/Vector.svg" id="vector-bg" class="step0-asset" alt="Background Vector">
      <img src="../assets/Title.svg" id="title-img" class="step0-asset" alt="Alan Turing Title">
      <img src="../assets/head.svg" id="turing-head" class="step0-asset" alt="Alan Turing Head">
      <img src="../assets/decoration.svg" id="decor-1" class="step0-asset" alt="Decoration Top Left">
      <img src="../assets/decoration1.svg" id="decor-2" class="step0-asset" alt="Decoration Bottom Right">
  `;

  document.body.appendChild(step0Container);
}

function initLampBoard() {
  if (document.getElementById("step-1-container")) return;

  const step1Container = document.createElement("div");
  step1Container.id = "step-1-container";

  const vectorBg = document.createElement("img");
  vectorBg.src = "../assets/vector2.svg";
  vectorBg.id = "step1-vector-bg";
  step1Container.appendChild(vectorBg);

  const enigma = document.createElement("img")
  enigma.src = "../assets/Enigma.svg"

  const titre = document.createElement("div")
  titre.appendChild(enigma)
  titre.classList.add("titre")
  step1Container.appendChild(titre); // Modifié ici pour qu'il soit bien supprimé quand on change d'étape

  letterShow = document.createElement("div");
  letterShow.classList.add("lamp-board");

  const Alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
    'W', 'X', 'Y', 'Z'
  ];

  Alphabet.forEach(lettre => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("lamp-wrapper");

    const toucheLum = document.createElement("div");
    toucheLum.classList.add("lamp");
    toucheLum.dataset.lettre = lettre;

    const etiquette = document.createElement("div");
    etiquette.classList.add("lamp-label");
    etiquette.textContent = lettre;

    wrapper.appendChild(toucheLum);
    wrapper.appendChild(etiquette);
    letterShow.appendChild(wrapper);
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

function write(value) {
  if (TextInput) {
    TextInput.value += value;
  }
}

function initStep2() {
  if (document.getElementById("step-2-container")) return;

  const step2Container = document.createElement("div");
  step2Container.id = "step-2-container";

  const vectorBg = document.createElement("img");
  vectorBg.src = "../assets/Vector3.svg";
  vectorBg.id = "step2-vector-bg";
  vectorBg.classList.add("step2-asset");
  step2Container.appendChild(vectorBg);

  const title = document.createElement("img");
  title.src = "../assets/machinedeturingtxt.svg";
  title.id = "step2-title";
  title.classList.add("step2-asset");
  step2Container.appendChild(title);

  // --- CHANGEMENT ICI : machine.gif ---
  const machine = document.createElement("img");
  machine.src = "../assets/machine.gif"; 
  machine.id = "step2-machine";
  machine.classList.add("step2-asset");
  step2Container.appendChild(machine);

  const decor = document.createElement("img");
  decor.src = "../assets/decoration2.svg";
  decor.id = "step2-decor";
  decor.classList.add("step2-asset");
  step2Container.appendChild(decor);

  document.body.appendChild(step2Container);
}
function initStep3() {
  if (document.getElementById("step-3-container")) return;

  const step3Container = document.createElement("div");
  step3Container.id = "step-3-container";

  const vectorBg = document.createElement("img");
  vectorBg.src = "../assets/vector4.svg";
  vectorBg.id = "step3-vector-bg";
  vectorBg.classList.add("step3-asset");
  step3Container.appendChild(vectorBg);

  const title = document.createElement("img");
  title.src = "../assets/title2.svg";
  title.id = "step3-title";
  title.classList.add("step3-asset");
  step3Container.appendChild(title);

  // --- CHANGEMENT ICI : animeIA.gif ---
  const animation = document.createElement("img");
  animation.src = "../assets/animeIA.gif"; 
  animation.id = "step3-animation";
  animation.classList.add("step3-asset");
  step3Container.appendChild(animation);

  const decor = document.createElement("img");
  decor.src = "../assets/decoration3.svg";
  decor.id = "step3-decor";
  decor.classList.add("step3-asset");
  step3Container.appendChild(decor);

  document.body.appendChild(step3Container);
}