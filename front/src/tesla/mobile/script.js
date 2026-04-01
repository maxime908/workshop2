import { all } from "axios";
import { getPersonnality, createGame } from "../../utils";

const allData = await getPersonnality("/tesla")

const step1 = await getPersonnality("/tesla/1")

document.querySelector("h1").textContent = allData.data.name
document.querySelector(".desc").textContent = allData.data.description



document.querySelectorAll("#steps button").forEach(element => {
    element.addEventListener("click", async () => {
        // console.log(element.value);
        
        const step = await getPersonnality("/tesla/" + element.value)
        console.log(step.data[0].number);
        document.querySelector(".step").textContent = step.data[0].number


        // document.querySelector(".step1").textContent = step1.data
        // console.log(step1.data[0].name)
    })
});




