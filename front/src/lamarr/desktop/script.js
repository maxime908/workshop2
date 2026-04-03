import gsap from "gsap";
import { readJSONFile } from "../../utils";

let oldData;

// Mes vidéos
const video = [
    "../assets/4en_boucle_1.mp4",
    "../assets/76681-559745365_medium.mp4",
    "../assets/137614-767056227.mp4"
]


function changeVideo(step) {
    const lecteur = document.getElementById("lecteur")
    if (step === 0) {
        document.body.classList.add("show-bg")
        lecteur.style.display = "none"
        document.getElementById("qrcode").style.display = "block"
        console.log("Étape 0");
    } else {
        document.getElementById("qrcode").style.display = "none"
        const videoIndex = step - 1
        if (video[videoIndex]) {
            document.body.classList.remove("show-bg")
            lecteur.style.display = "block"
            lecteur.src = video[videoIndex];
            console.log("Vidéo", videoIndex);
            lecteur.load();
            lecteur.play();
            lecteur.loop = true
        }
    }
} 

new QRCode(document.getElementById("qrcode"), "http://192.168.1.45/src/lamarr/mobile/")

async function changeWindow() {

    const data = await readJSONFile('/steps.json')
    const dataStep = data.lamarr.step

    if (!oldData) {
        changeVideo(dataStep);
        console.log("DataStep au tout début donne", dataStep);
    } else {
        if (JSON.stringify(data.lamarr) == JSON.stringify(oldData)) {
        } else {
            if (data.lamarr.step != oldData.step) {
                changeVideo(dataStep);
            } else {
                console.log("Le params a changé");
                if (data.lamarr.params == "goodAnswer") {
                    // showAnswer(dataStep, true)
                } else if (data.lamarr.params == "wrongAnswer") {
                    // showAnswer(dataStep, false)
                }
            }
        }
    }
    oldData = data.lamarr
}





setInterval(changeWindow, 500)


// - Enlever le qr code
// - Mettre la vidéo en portrait