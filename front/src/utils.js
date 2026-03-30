import axios from 'axios'

const url = "../../api/"

export function getAPI(path) {
    return axios.get(path)
        .then(response => response)
        .catch(err => console.log(err));
}