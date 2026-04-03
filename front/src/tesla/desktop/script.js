import gsap from "gsap";
import { readJSONFile } from "../../utils";

const qrcodeContainer = document.querySelector("#qrcode");
new QRCode(qrcodeContainer, `https://b1-workshop.online/src/tesla/mobile/index.html`);

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
    const lecteur = document.getElementById("lecteur");

    if (!lecteur.src.includes("animTesla.mp4")) {
        lecteur.src = video;
    }

    if (step === 0) {
        lecteur.style.display = "block";
        lecteur.pause();
        lecteur.currentTime = 0;

        // Réapparition du qr code
        gsap.to(qrcodeContainer, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            display: "block",
            ease: "power2.out"
        });

        console.log("Étape 0");
    } else {
        const segmentIndex = step - 1;
        const segment = videoSegments[segmentIndex];

        // Disparition du qr code
        gsap.to(qrcodeContainer, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => { qrcodeContainer.style.display = "none"; }
        });

        if (segment) {
            lecteur.style.display = "block";
            lecteur.ontimeupdate = null;
            lecteur.currentTime = segment.start;

            lecteur.play().catch(e => console.log("Lecture bloquée :", e));

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
    const data = await readJSONFile('/steps.json');
    if (!data || !data.tesla) return;

    const dataStep = data.tesla.step;

    if (!oldData) {
        changeVideo(dataStep);
    } else {
        if (dataStep !== oldData.step) {
            changeVideo(dataStep);
        } else {
            if (data.tesla.params !== oldData.params) {
                console.log("Le params a changé");
            }
        }
    }
    oldData = { ...data.tesla };
}



setInterval(changeWindow, 500);