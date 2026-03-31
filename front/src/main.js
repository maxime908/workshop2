import axios from "axios";
import { getAPI } from "./utils";

const a = await getAPI("");

console.log(a)

axios.post("http://localhost/workshop2/api/lamarr/", {
    device_id: 6577445544,
})
.then((val) => console.log(val))

axios.post('http://localhost/workshop2/api/lamarr/', {
    device_id: 5566554
})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});