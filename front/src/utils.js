import axios from 'axios'

const url = "http://127.0.0.1:80/"

export function getAPI(path) {
    return axios.get(url + path)
        .then(response => response)
        .catch(err => console.log(err));
}