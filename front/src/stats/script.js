import gsap from "gsap";
import { getDeviceId, getStats } from "../utils";

let stats = await getStats(getDeviceId());
let scoreTot = 0;

stats = stats.data;

const statsId = document.getElementById("stats");
let i = 1;

if (stats.length === 0) {
    statsId.innerHTML = "Aucune parties jouées sur cet appareil !"; 
    statsId.style.alignItems = "center";
    statsId.style.justifyContent = "center";
    statsId.style.height = "100vh";
    document.querySelector("main").classList.remove("p-5")
}

stats.forEach(element => {
    statsId.innerHTML += 
    `
        <div class="gsap-anim">
            <div class="p-3 card-hover card">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        <span class="text-muted">
                            ${i}
                        </span>
                        <span>
                            Personnalité(e) choisi : ${element.name}
                        </span>
                        <span>
                            score : ${element.score}
                        </span>
                    </div>
                    <span class="text-muted">
                        ${element.device_id}
                    </span>
                </div>
            </div>
        </div>
    `
    scoreTot += element.score; 
    i++;
});


let tl = gsap.timeline();

statsId.querySelectorAll(".gsap-anim").forEach((element, i) => {
    tl.to(element, { x: 0, duration: 1, ease: "power1.in" }, 0.4 * i)
})