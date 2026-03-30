import axios from "axios";
import { getAPI } from "./utils";

const a = await getAPI("");

console.log(a)

// axios.get("../steps.json")
// .then((val) => console.log(val));