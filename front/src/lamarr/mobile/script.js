import { all } from "axios";
import { getPersonnality } from "../../utils";

const allData = await getPersonnality("/lamarr")

document.querySelector("h1").textContent = allData.data.name
document.querySelector(".desc").textContent = allData.data.description


document.querySelectorAll("#steps button").forEach(element => {
    element.addEventListener("click", async() => {
        // console.log(element.value)
        const step = await getPersonnality("/lamarr/" + element.value)
        console.log(step.data[0].number)
        document.querySelector(".step").textContent = step.data[0].number
        // console.log(step.data[0].name)
    })
})