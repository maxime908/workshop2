import { getAPI } from "../../utils";

const allData = await getAPI("/tesla")

const step1 = await getAPI("/tesla/1")

document.querySelector("p").textContent = allData.data


document.querySelector("#start").addEventListener("click", () => {
    document.querySelector(".step1").textContent = step1.data
})