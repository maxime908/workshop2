import axios from 'axios'

const url = "http://localhost/workshop2/api/"

export function getAPI(path) {
    return axios.get(url + path)
        .then(response => response)
        .catch(err => console.log(err));
}

export function getPersonnality(personality) {
    return axios.get(url + "/" + personality)
        .then(response => response)
        .catch(err => console.log(err));
}

export async function createGame(personality,deviceId) {
    return axios.post(url + "/" + personality, {
        deviceId: deviceId,
    })
}

export async function updateGame(personality,object) {
    return axios.patch(url + "/" + personality, object)
}


async function getDeviceId() {
  try {

    const devices = await navigator.mediaDevices.enumerateDevices();

    console.log("Voici les périphériques trouvés :");

    devices.forEach((device) => {
      console.log(`ID Unique : ${device.deviceId}`);
    });

  } catch (error) {
    console.error("Erreur lors de l'accès aux périphériques :", error);
  }
}

getDeviceId();