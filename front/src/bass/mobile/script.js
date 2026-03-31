import { getAPI } from "../../utils";

const allData = await getAPI("/bass")

const step1 = await getAPI("/bass/1")

document.querySelector("h1").textContent = allData.data


document.querySelector("#start").addEventListener("click", () => {
    document.querySelector(".step1").textContent = step1.data
})