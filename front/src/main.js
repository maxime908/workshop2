import axios from "axios";
import { getAPI } from "./utils";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const a = await getAPI("");

console.log(a)

// axios.get("../steps.json")
// .then((val) => console.log(val));