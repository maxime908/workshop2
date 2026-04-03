import axios from 'axios'

//TODO : Change this to : /api/ for production 
const url = "/api/"

//Communications avec l'API

export function getAPI(path) {
    return axios.get(url + path)
        .then(response => response)
        .catch(err => console.log(err));
}

export function getPersonnality(personality) {
    return axios.get(url + personality)
        .then(response => response)
        .catch(err => console.log(err));
}

export function getStep(personality, step) {
    return axios.get(url + personality + "/" + step)
        .then(response => response)
        .catch(err => console.log(err));
}

export function getStats(device_id) {
    return axios.post(url, {
        device_id: device_id
    })
    .then(response => response)
    .catch(err => console.log(err));
}

export async function createGame(personality) {
    let deviceId = getDeviceId()
    
    if (!deviceId) {
        console.log("Pas de device id trouvé je vais en générer un")
        deviceId = createDeviceId()
        console.log("Nouveau device id :", deviceId)
    }

    console.log("Je vais envoyer à",url + personality, "la valeur de device ID :",deviceId)
    return axios.post(url + personality, {
        device_id: deviceId,
    })
}

export async function setParams(personality, params) {
    return axios.post(url + personality + "/params", {
        params: params,
    })
}

export async function updateGame(personality,deviceId, endDate, score) {
    return axios.patch(url + "/" + personality, {
        device_id: deviceId,
        endDate: endDate,
        score: score
    })
}

export async function closeGame(score) {
    let deviceId = getDeviceId()
    
    if (!deviceId) {
        console.log("Pas de device id trouvé je vais en générer un")
        deviceId = createDeviceId()
        console.log("Nouveau device id :", deviceId)
    }

    return axios.patch(url, {
        device_id: deviceId,
        score: score
    })

}


export async function updateScore(personality,score) {
    return axios.patch(url + "/" + personality, {
        score: score
    })
}

// Lire dans le fichier JSON (pour le desktop)
export async function readJSONFile(file) {
  try {

    const response = await fetch(file);

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



// Gérer les deviceId
export function getDeviceId() {
    return JSON.parse(localStorage.getItem('deviceId'));
}

export function createDeviceId() {
    const deviceId = crypto.randomUUID();
    // const deviceId = "TESTTESTTEST2456789"
    localStorage.setItem("deviceId",JSON.stringify(deviceId))
    
    return deviceId
}




