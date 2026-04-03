import gsap from "gsap";
import { readJSONFile } from "../../utils";

const qrcodeContainer = document.querySelector("#qrcode");
if(qrcodeContainer) {
    new QRCode(qrcodeContainer, `${window.location.origin}/front/src/tesla/mobile/index.html`);
}

let oldData;

// Mes vidéos
const video = "../assets/animTesla.mp4"

const videoSegments = [
    { start: 0, end: 4 },
    { start: 4, end: 7 },
    { start: 7, end: 15 }
];

// Ici on récupère l'étape pour afficher la vidéo correspondante
function changeVideo(step) {
    const lecteur = document.getElementById("lecteur")
    if(!lecteur) return;

    if (!lecteur.src.includes("animTesla.mp4")) {
        lecteur.src = video;
    }

    if (step === 0) {
        lecteur.style.display = "block"
        if(qrcodeContainer) qrcodeContainer.style.display = "block"
        lecteur.pause()
        lecteur.currentTime = 0

        console.log("Étape 0");
    } else {
        if(qrcodeContainer) qrcodeContainer.style.display = "none"

        const segmentIndex = step - 1
        const segment = videoSegments[segmentIndex];

        if (segment) {
            lecteur.style.display = "block"
            lecteur.currentTime = segment.start;

            // FIX: Séparer le play() du ontimeupdate
            let playPromise = lecteur.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log("Attente d'interaction :", e));
            }

            lecteur.ontimeupdate = function () {
                if (lecteur.currentTime >= segment.end) {
                    lecteur.pause();
                    lecteur.ontimeupdate = null;
                }
            }
        }
    }
}

async function changeWindow() {
    const data = await readJSONFile('/steps.json')
    if (!data || !data.tesla) return;
    
    const dataStep = data.tesla.step

    if (!oldData) {
        changeVideo(dataStep);
        console.log("DataStep au tout début donne", dataStep);
    } else {
        if (JSON.stringify(data.tesla) == JSON.stringify(oldData)) {
            // Rien n'a changé
        } else {
            // === CHANGEMENT ICI : Détection du Reset ===
            if (data.tesla.params === "reset" || data.tesla.step === 0) {
                changeVideo(0);
            } 
            else if (data.tesla.step != oldData.step) {
                changeVideo(dataStep);
            } else {
                console.log("Le params a changé");
                if (data.tesla.params == "goodAnswer") {
                    // showAnswer(dataStep, true)
                } else if (data.tesla.params == "wrongAnswer") {
                    // showAnswer(dataStep, false)
                }
            }
        }
    }
    oldData = data.tesla
}

setInterval(changeWindow, 500)