// import { getAPI } from "../../utils";



const step1 = document.querySelector(".step1")
const step2 = document.querySelector(".step2")
const step3 = document.querySelector(".step3")
const text = document.querySelector(".text")

step1.addEventListener("click", () => {
    step2.style.display = "flex"
    step1.style.display = "none"
    text.textContent = "Étape 1"
    
})

step2.addEventListener("click", () => {
    step3.style.display = "flex"
    step2.style.display = "none"
    text.textContent = "Étape 2"
    

})

step3.addEventListener("click", () => {
    step1.style.display = "flex"
    step3.style.display = "none"
    text.textContent = "Fini !"
    

})