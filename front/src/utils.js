import axios from 'axios'

const url = "http://localhost/workshop2/api/"

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

export async function createGame(personality) {
    let deviceId = getDeviceId()
    
    if (!deviceId) {
        console.log("Pas de device id trouvé je vais en générer un")
        deviceId = createDeviceId()
        console.log("Nouveau device id :", deviceId)
    }

    return axios.post(url + "/" + personality, {
        deviceId: deviceId,
    })
}

export async function updateGame(personality,deviceId, endDate, score) {
    return axios.patch(url + "/" + personality, {
        deviceId: deviceId,
        endDate: endDate,
        score: score
    })
}


export async function updateScore(personality,score) {
    return axios.patch(url + "/" + personality, {
        score: score
    })
}



// Gérer les deviceId
export function getDeviceId() {
    return JSON.parse(localStorage.getItem('deviceId'));
}

export function createDeviceId() {
    const deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId",JSON.stringify(deviceId))
    
    return deviceId
}




