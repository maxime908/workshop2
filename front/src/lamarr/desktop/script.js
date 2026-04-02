import gsap from "gsap";
import { readJSONFile } from "../../utils";

let oldData;

// Mes vidéos
const video = [
    "../assets/4perso_mc.mp4"
]

// Ici on récupère l'étape pour afficher la vidéo correspondante
function changeVideo(step) {
    const lecteur = document.getElementById("lecteur")

    if (step === 0) {
        document.body.classList.add("show-bg")
        lecteur.style.display = "none"
        lecteur.pause()

        console.log("Étape 0");
    } else {

        const videoIndex = step - 1

        if (video[videoIndex]) {
            document.body.classList.remove("show-bg")
            lecteur.style.display = "block"

            lecteur.src = video[videoIndex];
            console.log("Vidéo", videoIndex);

            lecteur.load();
            lecteur.play();
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
            if (data.tesla.step != oldData.step) {
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


// - Enlever le qr code
// - Mettre la vidéo en portrait