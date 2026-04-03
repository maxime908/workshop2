import gsap from "gsap";
import { readJSONFile } from "../../utils";

const qrcodeContainer = document.querySelector("#qrcode");
// Initialisation du QR Code
if (qrcodeContainer) {
    new QRCode(qrcodeContainer, `${window.location.origin}/front/src/tesla/mobile/index.html`);
}

let oldData;

// Chemin de la vidéo unique
const videoPath = "../assets/animTesla.mp4";

// Définition des segments (en secondes)
const videoSegments = [
    { start: 0, end: 4 },  // Step 1
    { start: 4, end: 7 },  // Step 2
    { start: 7, end: 15 }  // Step 3
];

function changeVideo(step) {
    const lecteur = document.getElementById("lecteur");
    if (!lecteur) return;

    // Injection de la source une seule fois
    if (!lecteur.src || lecteur.src === "" || lecteur.src.includes('undefined')) {
        lecteur.src = videoPath;
        lecteur.load();
    }

    if (step === 0) {
        // AFFICHAGE ACCUEIL : QR Code visible, Vidéo sur la frame 0
        gsap.to(qrcodeContainer, { opacity: 1, scale: 1, duration: 0.5, display: "block", ease: "power2.out" });
        
        lecteur.pause();
        lecteur.currentTime = 0;
        console.log("Mode Accueil : Step 0");
    } else {
        // MODE JEU : On cache le QR Code
        gsap.to(qrcodeContainer, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.4, 
            ease: "power2.in",
            onComplete: () => { qrcodeContainer.style.display = "none"; }
        });

        const segmentIndex = step - 1;
        const segment = videoSegments[segmentIndex];

        if (segment) {
            lecteur.ontimeupdate = null; // Nettoyage
            lecteur.currentTime = segment.start;
            
            lecteur.play().catch(e => console.log("Lecture en attente d'interaction"));

            lecteur.ontimeupdate = function () {
                if (lecteur.currentTime >= segment.end) {
                    lecteur.pause();
                    lecteur.ontimeupdate = null;
                    console.log(`Fin du segment ${step}`);
                }
            };
        }
    }
}

async function changeWindow() {
    try {
        const data = await readJSONFile('/steps.json');
        if (!data || !data.tesla) return;

        const dataStep = data.tesla.step;
        const dataParams = data.tesla.params;

        // Détection du retour à l'accueil (soit par step 0, soit par signal reset)
        if (dataStep === 0 || dataParams === "reset") {
            if (!oldData || oldData.step !== 0 || oldData.params !== "reset") {
                changeVideo(0);
            }
        } 
        // Détection changement d'étape classique
        else if (!oldData || dataStep !== oldData.step) {
            changeVideo(dataStep);
        } 
        // Détection changement de paramètres (Bonne/Mauvaise réponse)
        else if (dataParams !== oldData.params) {
            console.log("Changement de params détecté :", dataParams);
        }

        oldData = { ...data.tesla };
    } catch (error) {
        console.error("Erreur polling :", error);
    }
}

// Vérification toutes les 500ms
setInterval(changeWindow, 500);