async function readSteps() {
    try {

        const response = await fetch('/steps.json');

        if (!response.ok) {
            throw new Error(`Erreur lors du chargement : ${response.status}`);
        }

        // On transforme la réponse en objet JavaScript utilisable
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Impossible de lire le fichier steps.json :", error);
    }
}


// Tableau de mes vidéos
const video = [
    "../../assets/step1.mp4",
    "../../assets/step2.mp4",
    "../../assets/step3.mp4"
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



let oldData;

async function changeWindow() {

    const data = await readSteps()
    // const dataStep = 1
    const dataStep = data.lamarr.step

    if (dataStep === oldData) {
        console.log("Aucune valeur changée")
    } else {
        console.log("Nouvelles valeurs, changeons la window !")
        document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep + " !"
        document.querySelector("p").textContent = "État de la réponse : " + data.lamarr.params

        changeVideo(dataStep)

        oldData = dataStep // On met à jour après le changement
    }

    console.log("data :", dataStep)

    console.log("oldData :", oldData)

    oldData = dataStep
}

setInterval(changeWindow, 1000)
