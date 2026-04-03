
import gsap from "gsap";
import { readJSONFile } from "../../utils";

let oldData;

const video = [
    "../assets/lamarr_step01.mp4",
    "../assets/lamarr_step02.mp4",
    "../assets/lamarr_step03.mp4"
]

function changeVideo(step) {
    const lecteur = document.getElementById("lecteur")

    if (step === 0) {
        document.body.classList.add("show-bg")
        lecteur.style.display = "none"
        document.getElementById("qrcode").style.display = "block"
        document.getElementById("vector").style.display = "block"
        document.getElementById("vector2").style.display = "block"
        document.getElementById("vector3").style.display = "block"
        document.getElementById("info").style.display = "block"
        console.log("Étape 0");
    } else {
        document.getElementById("qrcode").style.display = "none"
        document.getElementById("vector").style.display = "none"
        document.getElementById("vector2").style.display = "none"
        document.getElementById("vector3").style.display = "none"
        document.getElementById("info").style.display = "none"

        const videoIndex = step - 1
        if (video[videoIndex]) {
            document.body.classList.remove("show-bg")
            lecteur.style.display = "block"
            lecteur.src = video[videoIndex];
            console.log("Vidéo", videoIndex);
            lecteur.load();
            lecteur.play();
            

            if (videoIndex === video.length - 1) {
                lecteur.loop = false
                lecteur.addEventListener('ended', () => {
                    lecteur.pause()
                })
            }
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
