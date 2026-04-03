import gsap from "gsap";
import { readJSONFile } from "../../utils";

const qrcodeContainer = document.querySelector("#qrcode");
if (qrcodeContainer) {
    new QRCode(qrcodeContainer, `${window.location.origin}/front/src/tesla/mobile/index.html`);
}

let oldData = null;
const videoPath = "../assets/animTesla.mp4";

const videoSegments = [
    { start: 0, end: 4 },
    { start: 4, end: 7 },
    { start: 7, end: 15 }
];

function changeVideo(step) {
    const lecteur = document.getElementById("lecteur");
    if (!lecteur) return;

    if (!lecteur.getAttribute('src')) {
        lecteur.setAttribute('src', videoPath);
        lecteur.load();
    }

    if (step === 0) {
        console.log("▶ ÉTAPE 0 : Affichage QR Code");
        gsap.to(qrcodeContainer, { opacity: 1, scale: 1, duration: 0.5, display: "block" });
        lecteur.style.display = "block";
        lecteur.pause();
        lecteur.currentTime = 0;
    } else {
        console.log("▶ ÉTAPE " + step + " : Lecture vidéo");
        gsap.to(qrcodeContainer, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.4, 
            onComplete: () => { qrcodeContainer.style.display = "none"; } 
        });

        const segmentIndex = step - 1;
        const segment = videoSegments[segmentIndex];

        if (segment) {
            lecteur.ontimeupdate = null;
            lecteur.currentTime = segment.start;
            
            lecteur.play().catch(e => console.log("Lecture auto bloquée"));

            lecteur.ontimeupdate = function () {
                if (lecteur.currentTime >= segment.end) {
                    lecteur.pause();
                    lecteur.ontimeupdate = null;
                }
            };
        }
    }
}

async function changeWindow() {
    try {
        const data = await readJSONFile('/steps.json');
        if (!data || !data.tesla) return;

        const currentStep = data.tesla.step;
        const currentParams = data.tesla.params;

        // 1. Détection du retour à zéro (soit step = 0, soit params = reset)
        if (currentStep === 0 || currentParams === "reset") {
            if (!oldData || oldData.step !== 0) {
                changeVideo(0);
                // On force oldData à 0 pour éviter que ça boucle
                oldData = { step: 0, params: currentParams };
            }
        } 
        // 2. Détection d'un changement d'étape classique
        else if (!oldData || currentStep !== oldData.step) {
            changeVideo(currentStep);
            oldData = { step: currentStep, params: currentParams };
        } 
        // 3. Détection d'un changement de paramètres
        else if (currentParams !== oldData.params) {
            console.log("Le params a changé :", currentParams);
            oldData.params = currentParams;
        }
    } catch (e) {
        console.error("Erreur lecture JSON :", e);
    }
}

setInterval(changeWindow, 500);