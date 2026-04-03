import gsap from "gsap";
import { readJSONFile } from "../../utils";

let oldData;

const video = [
    "../assets/lamarr_step01.mp4",
    "../assets/lamarr_step02.mp4",
    "../assets/lamarr_step03.mp4"
];

function changeVideo(step) {
    const lecteur = document.getElementById("lecteur");
    const qrcode = document.getElementById("qrcode");
    const elementsToToggle = ["vector", "vector2", "vector3", "info"];

    if (step === 0) {
        // --- LOGIQUE RETOUR ACCUEIL ---
        document.body.classList.add("show-bg");
        lecteur.style.display = "none";
        lecteur.pause(); // On arrête la vidéo proprement
        
        qrcode.style.display = "block";
        elementsToToggle.forEach(id => {
            document.getElementById(id).style.display = "block";
        });
        
        console.log("Écran de veille / Étape 0 activée");
    } else {
        // --- LOGIQUE VIDÉOS ---
        qrcode.style.display = "none";
        elementsToToggle.forEach(id => {
            document.getElementById(id).style.display = "none";
        });

        const videoIndex = step - 1;
        if (video[videoIndex]) {
            document.body.classList.remove("show-bg");
            lecteur.style.display = "block";
            lecteur.src = video[videoIndex];
            lecteur.load();
            lecteur.play();
            console.log("Lecture Vidéo Étape:", step);

            // Gestion de la fin de la dernière vidéo (Step 3)
            if (videoIndex === video.length - 1) {
                lecteur.loop = false;
                
                // On écoute la fin de la vidéo pour réafficher le QR Code
                lecteur.addEventListener('ended', () => {
                    console.log("Dernière vidéo finie -> Retour Step 0");
                    changeVideo(0); 
                }, { once: true }); 
            } else {
                lecteur.loop = true; // On peut laisser les étapes intermédiaires boucler
            }
        }
    }
}

// Initialisation QR Code
const qrcodeContainer = document.querySelector("#qrcode");
if (qrcodeContainer) {
    new QRCode(qrcodeContainer, `https://b1-workshop.online/src/lamarr/mobile/index.html`);
}

async function changeWindow() {
    try {
        const data = await readJSONFile('/steps.json');
        const currentData = data.lamarr;

        if (!oldData) {
            changeVideo(currentData.step);
        } else {
            // Si l'étape a changé, on change de vidéo
            if (currentData.step !== oldData.step) {
                changeVideo(currentData.step);
            } else if (currentData.params !== oldData.params) {
                console.log("Le paramètre a changé :", currentData.params);
                // Optionnel : gérer les feedbacks (goodAnswer / wrongAnswer) ici
            }
        }
        oldData = { ...currentData };
    } catch (err) {
        console.error("Erreur lors de la lecture du JSON", err);
    }
}

setInterval(changeWindow, 500);