import { all } from "axios";
import { getPersonnality } from "../../utils";

const allData = await getPersonnality("/lamarr")

const step = await getPersonnality("/lamarr/1")

document.querySelector("h1").textContent = allData.data.name
document.querySelector(".desc").textContent = allData.data.description


document.querySelectorAll("#steps button").forEach(element => {
    element.addEventListener("click", async() => {
        console.log(element.value)
        const step = await getPersonnality("/lamarr/", element.value)
        console.log(step)
        document.querySelector(".step").textContent = step.data.name
        console.log(step)
        // console.log(step.data[0].name)
    })
})