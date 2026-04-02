import gsap from "gsap";
import { readJSONFile } from "../../utils";

let oldData;

// Tableau de mes vidéos
const video = [
    "../assets/step1.mp4",
    "../assets/step2.mp4",
    "../assets/336603.mp4",
    "../assets/step3.mp4"
]

// Ici on récupère l'étape pour afficher la vidéo correspondante
function changeVideo(step) {
    const lecteur = document.getElementById("lecteur")

    const videoIndex = step - 1

    if (video[videoIndex]) {
        lecteur.src = video[videoIndex]
        console.log("Vidéo", videoIndex);

        lecteur.load();
        lecteur.play();
    }
}

// changeVideo(dataStep)



async function changeWindow() {

    const data = await readJSONFile('/steps.json')
    const dataStep = data.bass.step

    if (!oldData) {
        oldData = ""
        console.log("DataStep au tout début donne", dataStep)
        // hideStep(0)
        // showStep(dataStep)
    }

    if (JSON.stringify(data.bass) == JSON.stringify(oldData)) {
        console.log("Aucune valeur changée")
    } else {

        if (JSON.stringify(data.bass.step) != JSON.stringify(oldData.step)) {
            // hideStep(dataStep - 1)
            // showStep(dataStep)

            changeVideo(dataStep)
        } else {
            console.log("Le params a changé")
            if (data.bass.params == "goodAnswer") {
                showAnswer(dataStep, true)
            } else if (data.bass.params == "wrongAnswer") {
                showAnswer(dataStep, false)
            }
        }
    }

    oldData = data.bass
}

setInterval(changeWindow, 500)