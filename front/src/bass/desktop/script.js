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

let oldData;

async function changeWindow() {

    const data = await readSteps()
    const dataStep = data.bass.step
    
    if (dataStep == oldData) {
        console.log("Aucune valeur changée")
    } else {
        console.log("Nouvelles valeurs, changeons la window !")
        document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep + " !"

        const decimal = dataStep % 1;

        if (decimal.toFixed(1) == 0.1) {
          document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep + " et il y a eu une bonne réponse !"
        } else if (decimal.toFixed(1) == 0.2) {
          document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep + " et il y a eu une mauvaise réponse !"
        }
    }
    
    console.log("data :", dataStep)

    console.log("oldData :", oldData)

    oldData = dataStep
}

setInterval(changeWindow,1000)