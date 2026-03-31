import { all } from "axios";
import { getPersonnality, createGame } from "../../utils";

const allData = await getPersonnality("/tesla")

const step1 = await getPersonnality("/tesla/1")

document.querySelector("h1").textContent = allData.data.name
document.querySelector(".desc").textContent = allData.data.description



document.querySelectorAll("#steps button").forEach(element => {
    element.addEventListener("click", async () => {
        console.log(element.value);
        const step = await getPersonnality("/tesla/", element.value)

        console.log(step);
        


        // document.querySelector(".step1").textContent = step1.data
        // console.log(step1.data[0].name)
    })
});




