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
        <div class="gsap-anim w-100">
            <div class="p-3 card-hover card w-75 m-auto">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        <span>
                            Personnalité choisie : ${element.name}
                        </span>
                        <span>
                            score : ${element.score}
                        </span>
                    </div>
                    <span class="text-muted">
                        ${i}
                    </span>
                </div>
            </div>
        </div>
    `
    scoreTot += element.score; 
    i++;
});


// let tl = gsap.timeline();

// statsId.querySelectorAll(".gsap-anim").forEach((element, i) => {
//     tl.to(element, { 
//         x: 0,
//         duration: 1, 
//         ease: "power1.in",
//         stagger: 0.4
//     })
// })

gsap.fromTo(".gsap-anim", {
    // y: -200,
    opacity: 0,
    scale: 1.05
}, {
    scale: 1,
    // y: 0,
    opacity: 1,
    ease: "power4.out",
    duration: 0.3,
    stagger: 0.3,
})