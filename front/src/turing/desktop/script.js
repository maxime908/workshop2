import axios from "axios";

async function readSteps() {
  try {

    const response = axios.get("../../../steps.json") 
    
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement : ${response.status}`);
    }
    
    // On transforme la réponse en objet JavaScript utilisable
    // const data = await response.json();
    // return data;
    
  } catch (error) {
    console.error("Impossible de lire le fichier steps.json :", error);
  }
}

let oldData;

async function changeWindow() {

  const data = await readSteps()
  const dataStep = data.turing.step
  
  if (dataStep == oldData) {
      console.log("Aucune valeur changée")
  } else {
      console.log("Nouvelles valeurs, changeons la window !")
      document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep
  }
  
  console.log("data :", dataStep)

  console.log("oldData :", oldData)

  oldData = dataStep
}

console.log("harry potter")

setInterval(changeWindow,1000)