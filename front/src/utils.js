import axios from 'axios'

const url = "http://localhost/workshop2/api/lamarr/1/"

export function getAPI(path) {
    return axios.get(url + path)
        .then(response => response)
        .catch(err => console.log(err));
}