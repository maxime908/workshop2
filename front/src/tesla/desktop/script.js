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
    "file:///C:/Users/gaspa/Downloads/334716_medium.mp4",
    "file:///C:/Users/gaspa/Downloads/76681-559745365_medium.mp4",
    "file:///C:/Users/gaspa/Downloads/333819_medium.mp4"
]

// Ici on récupère l'étape pour afficher la vidéo correspondante
function changeVideo(step) {
    const lecteur = document.getElementById("lecteur")

    if(video[step]){
        lecteur.src = video[step]
        console.log("Vidéo", step);
        
    }
}



let oldData;

async function changeWindow() {

    const data = await readSteps()
    const dataStep = data.tesla.step
    
    if (dataStep == oldData) {
        console.log("Aucune valeur changée")
    } else {
        console.log("Nouvelles valeurs, changeons la window !")
        document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep + " !"
        document.querySelector("p").textContent = "État de la réponse : " + data.tesla.params

        changeVideo(dataStep)
    }
    
    console.log("data :", dataStep)

    console.log("oldData :", oldData)

    oldData = dataStep
}

setInterval(changeWindow,1000)
