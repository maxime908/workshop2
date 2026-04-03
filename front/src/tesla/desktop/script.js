import gsap from "gsap";
import { readJSONFile } from "../../utils";

const qrcodeContainer = document.querySelector("#qrcode");
new QRCode(qrcodeContainer, `${window.location.origin}/front/src/tesla/mobile/index.html`);

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

    if (!lecteur.src.includes(video)) {
        lecteur.src = video;
    }

    if (step === 0) {
        lecteur.style.display = "block"
        qrcodeContainer.style.display = "block"
        lecteur.pause()
        lecteur.currentTime = 0

        console.log("Étape 0");
    } else {
        qrcodeContainer.style.display = "none"

        const segmentIndex = step - 1
        const segment = videoSegments[segmentIndex];

        if (segment) {

            lecteur.style.display = "block"
            lecteur.currentTime = segment.start;

            lecteur.play();
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
    const dataStep = data.tesla.step

    if (!oldData) {
        changeVideo(dataStep);
        console.log("DataStep au tout début donne", dataStep);
    } else {
        if (JSON.stringify(data.tesla) == JSON.stringify(oldData)) {
        } else {
            // AJOUT ICI : On écoute si le mobile a envoyé "reset"
            if (data.tesla.params == "reset") {
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