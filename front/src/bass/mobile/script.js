import { getAPI, createGame, getStep, getPersonnality, setParams } from "../../utils";
import gsap from "gsap";

// Ici modifier avec le nom de votre personnalité
const personnality = "bass"

// Step en cours
let currentStep = 0

// A répondu à la question ?
let answered = false

let allData = await getPersonnality(personnality)
allData = allData.data

console.log(allData)

// Exemple d'utilisation du contenu de allData
document.querySelector("#title").textContent = allData.name
document.querySelector("#desc").textContent = allData.description

// Le popup pour dire d'attendre car un joueur joue déjà
const dialog = document.querySelector("#wait")

// Fermer le popup
document.querySelector("#cancelButton").addEventListener("click", () => {
    dialog.close()
})



// Quand on clique sur le bouton "Commencer l'expérience" ou sur "Réessayer" sur le popup
const buttonsStart = [document.querySelector("#retryButton"), document.querySelector("#start")]

buttonsStart.forEach(element => {
    element.addEventListener("click", async () => {
        dialog.close()

        // On essaie de créer une partie. True = la partie a été créée / False = la partie n'a pas pu être créée (quelq'un est déjà en train de jouer)
        let createGameStatus = await createGame("bass")
        createGameStatus = createGameStatus.data

        showStep(1)

        // if (createGameStatus) {
        //     console.log("J'ai pu créer une game")
        //     // On affiche l'étape 1
        //     showStep(1)
        // } else {
        //     dialog.showModal()
        //     console.log("Je n'ai pas pu créer une game")
        //     // Ici afficher l'info que quelqu'un joue déjà et qu'il faut attendre encore quelques instants
        // }
    })
});

let stepContent;

// Afficher un step
async function showStep(step) {

    hideNextButton()
    setParams(personnality, "")

    currentStep = step
    answered = false

    // Cette variable contient toutes les infos d'une étape infos importantes : le nom (correspond à la question) et toutes les infos de l'intéraction en JSON
    stepContent = await getStep(personnality, step)

    console.log(stepContent);

    if (stepContent.data.length === 0) {
        window.location.href = "../../stats/index.html";
        return;
    }

    stepContent = stepContent.data[0]

    stepContent = JSON.parse(stepContent.interaction)

    console.log("J'ai getStep", step, "ça m'a donné", stepContent)

    if (step == 1) {
        hideStep(0)
        // Ici on gère l'affichage de l'intéraction 1
    } else if (step == 2) {
        hideStep(1)
        // Ici on gère l'affichage de l'intéraction 2
    } else if (step == 3) {
        hideStep(2)
        // Ici on gère l'affichage de l'intéraction 3
    } // ... et ainsi de suite si on souhaite ajouter des intéractions

    // On créé un nouveau step
    const newStep = document.createElement("div");
    newStep.setAttribute("id", "step" + step)
    newStep.classList.add("step");

    if (stepContent.type == "qcm") {
        newStep.innerHTML = `
        <h1>${stepContent.question}</h1>
        <button id="answer1" class="answer">${stepContent.answer1}</button>
        <button id="answer2" class="answer">${stepContent.answer2}</button>
        <button id="answer3" class="answer">${stepContent.answer3}</button>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)

        // Quand on clique sur une réponse
        document.querySelectorAll(".answer").forEach(element => {

            element.addEventListener("click", () => {
                console.log("Cliqué", answered)
                if (!answered) {
                    answered = true
                    if (element.textContent == stepContent.goodAnswer) {
                        animCorrectAnswer(element)
                        console.log("Bonne réponse !")
                        setParams(personnality, "goodAnswer")
                        showNextButton()
                    } else {
                        animWrongAnswer(element)
                        setParams(personnality, "wrongAnswer")
                        showNextButton()

                        document.querySelectorAll(".answer").forEach(element2 => {
                            if (element2.textContent == stepContent.goodAnswer) {
                                animCorrectAnswer(element2)
                            }
                        });

                    }
                }

            })

        });
    } else if (stepContent.type == "map") {
        newStep.innerHTML = `
            <h1>${stepContent.question}</h1>
            <svg id="mapQuestion" width="284" height="175" viewBox="0 0 284 175" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_393_259)">
            <path pointer-events: none d="M202.594 146.097C204.81 146.202 207.173 146.553 209.371 146.059C212.315 145.392 215.802 142.706 218.6 141.868C219.307 141.707 219.643 142.032 220.044 142.548C223.808 147.79 236.511 165.714 240.072 170.701C240.756 171.763 241.464 172.028 242.877 171.581C244.406 171.024 248.685 170.147 248.978 168.692C249.027 167.963 248.599 167.289 248.255 166.618C246.739 163.888 244.128 159.243 242.471 156.262C241.061 154.156 241.308 152.087 241.65 149.725C242.065 145.941 237.611 144.428 235.29 142.217C233.977 141.226 233.384 139.923 233.433 138.182C233.409 136.496 233.454 134.759 233.461 133.045C233.503 131.487 233.461 129.526 233.529 128.173C233.537 126.654 233.915 125.88 234.992 124.981C239.19 121.031 253.284 107.708 259.822 101.543C261.294 100.493 261.096 98.7181 260.819 97.1214C260.164 89.1198 255.544 92.5304 254.367 87.2189C253.848 84.5779 255.054 81.9424 257.167 80.3654C258.39 79.3294 259.222 78.236 259.337 76.523C259.667 73.0366 259.989 67.1433 260.281 63.5883C260.205 60.0403 262.253 58.8403 264.683 56.6394C266.215 55.3301 267.833 53.5961 269.739 53.076C272.147 52.2587 275.478 53.4643 277.145 51.1162C278.267 49.4929 278.17 46.8995 276.767 45.3533C275.826 44.1884 274.535 43.2464 274.194 41.7142C273.796 39.5133 273.644 35.2489 274.907 33.2948C276.672 30.8668 279.074 28.4739 281.066 26.1118C282.726 24.0974 284.61 22.7474 283.815 20.2872C282.728 17.478 279.756 15.8084 278.354 13.243C277.467 11.5426 277.051 8.84831 275.633 7.68619C273.758 6.5395 270.887 9.06559 269.319 10.267C268.103 11.2763 267.493 12.3641 267.418 14.0631C267.344 15.9948 267.404 18.2574 267.403 20.147C267.323 21.8713 267.663 23.6025 266.119 24.5095C260.652 28.1024 247.863 36.5008 240.602 41.1927C239.503 41.86 238.218 41.9427 236.955 42.1025C229.557 42.6464 230.44 44.5234 229.493 50.7588C228.786 54.2745 224.429 51.9209 222.028 52.6358C219.298 53.1671 218.808 56.5385 216.775 57.9459C215.455 58.902 213.563 58.2698 212.877 56.8609C212.358 55.839 212.679 54.6811 212.893 53.5989C213.494 50.8625 214.444 46.5575 215.048 43.8239C215.35 42.6702 215.501 41.1002 216.847 40.803C218.678 40.5591 220.811 41.2305 222.621 40.4203C225.638 39.3423 224.375 36.3129 222.698 34.3434C221.67 32.9892 220.483 31.0406 219.114 30.4042C218.35 30.0089 217.08 30.257 215.989 30.5556C213.806 31.0589 210.998 32.3079 208.823 32.364C207.903 32.3135 207.323 31.642 206.688 31.0154C203.391 27.63 195.405 19.2695 191.882 15.6528C191.281 15.0402 190.685 14.5397 189.853 14.3463C188.881 14.1262 187.812 14.1486 186.798 14.1542C185.251 14.2131 183.809 14.1472 182.471 14.722C180.845 15.4467 179.912 17.5663 178.973 19.1195C177.806 20.9895 176.92 23.5437 174.334 23.6362C172.287 23.7483 170.046 23.5843 167.967 23.5016C163.358 23.6432 163.413 18.6261 161.411 15.8981C128.89 11.7459 37.8402 1.28544 28.0926 0.0252003C27.4309 -0.165448 27.2722 0.754151 27.0643 1.24339C25.5275 5.47551 23.7982 6.17081 20.3832 2.93399C18.4812 1.16068 14.7769 1.29385 13.8329 4.00078C13.507 5.08159 13.5603 6.32361 13.6629 7.48433C14.1279 12.1748 14.7207 17.6896 15.2179 21.4493C15.3261 22.3016 15.3317 22.9255 15.0381 23.7231C11.8058 31.8327 3.06679 54.8899 0.479224 61.3748C0.03532 62.5818 -0.280751 63.1677 0.378081 64.4953C4.71176 76.4122 15.0381 103.961 17.5864 110.995C17.887 111.663 17.9488 112.258 18.713 112.55C23.8586 114.128 31.1915 115.853 36.8751 117.423C39.1705 118.037 39.5919 118.143 41.0515 119.968C44.6209 124.367 48.3759 129.192 52.0058 133.601C52.7461 134.438 53.1366 134.609 54.0356 134.594C63.0963 134.086 80.4802 132.799 86.8747 132.487C87.7681 132.412 88.1755 133.144 88.4438 134.114C88.9074 135.656 89.2487 136.894 89.7643 138.709C90.5706 141.529 91.4219 144.566 92.2268 147.39C92.7185 148.934 92.9573 151.015 94.4182 151.774C95.8806 152.543 97.5157 152.927 99.1101 153.471C100.547 153.932 102.497 154.661 103.791 154.535C106.194 154.146 107.325 151.005 109.036 149.638C111.103 147.705 114.763 149.766 117.208 150.214C118.907 150.811 120.533 150.825 121.529 152.195C123.306 156.42 124.948 161.792 127.018 167.563C127.725 169.589 128.343 171.38 128.774 172.604C129.113 173.653 129.613 174.766 130.86 174.856C132.82 175.1 134.891 174.955 136.897 174.987C139.004 174.986 140.715 174.85 140.674 172.408C140.779 168.818 139.66 165.953 142.731 163.243C145.794 160.059 149.554 155.573 152.77 152.616C154.264 151.808 155.919 152.302 157.985 152.16C165.478 152.111 178.903 152.111 184.241 152.059C184.823 152.052 185.352 151.978 185.729 151.545C186.75 150.143 186.521 147.618 187.571 146.201C188.335 145.12 190.025 145.363 191.247 145.402C194.923 145.608 198.908 145.878 202.572 146.096H202.596L202.594 146.097Z" fill="#A6A6A6"/>
            <path class="city" d="M27.2294 124.122C33.2203 124.122 38.0769 119.276 38.0769 113.297C38.0769 107.319 33.2203 102.472 27.2294 102.472C21.2384 102.472 16.3818 107.319 16.3818 113.297C16.3818 119.276 21.2384 124.122 27.2294 124.122Z" fill="#882F8E"/>
            <path class="city" id="goodAnswer" d="M260.094 80.8097C266.085 80.8097 270.941 75.9633 270.941 69.9848C270.941 64.0064 266.085 59.1599 260.094 59.1599C254.103 59.1599 249.246 64.0064 249.246 69.9848C249.246 75.9633 254.103 80.8097 260.094 80.8097Z" fill="#882F8E"/>
            <path class="city" d="M246.924 171.57C250.537 171.57 253.466 168.647 253.466 165.041C253.466 161.436 250.537 158.513 246.924 158.513C243.311 158.513 240.382 161.436 240.382 165.041C240.382 168.647 243.311 171.57 246.924 171.57Z" fill="#882F8E"/>
            <path class="city" d="M10.8208 94.266C14.6666 94.266 17.7842 91.1548 17.7842 87.3171C17.7842 83.4793 14.6666 80.3682 10.8208 80.3682C6.97504 80.3682 3.85742 83.4793 3.85742 87.3171C3.85742 91.1548 6.97504 94.266 10.8208 94.266Z" fill="#882F8E"/>
            <path class="city" d="M208.419 65.9798C213.24 65.9798 217.148 62.0798 217.148 57.2689C217.148 52.4579 213.24 48.5579 208.419 48.5579C203.598 48.5579 199.689 52.4579 199.689 57.2689C199.689 62.0798 203.598 65.9798 208.419 65.9798Z" fill="#882F8E"/>
            <path class="city" d="M188.607 121.075C193.056 121.075 196.663 117.475 196.663 113.035C196.663 108.595 193.056 104.996 188.607 104.996C184.158 104.996 180.551 108.595 180.551 113.035C180.551 117.475 184.158 121.075 188.607 121.075Z" fill="#882F8E"/>
            <path class="city" d="M270.37 56.1684C274.819 56.1684 278.426 52.569 278.426 48.129C278.426 43.6889 274.819 40.0895 270.37 40.0895C265.92 40.0895 262.313 43.6889 262.313 48.129C262.313 52.569 265.92 56.1684 270.37 56.1684Z" fill="#882F8E"/>
            </g>
            <defs>
            <clipPath id="clip0_393_259">
            <rect width="284" height="175" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `

        // On ajoute le nouveau step au body
        document.querySelector("#steps").appendChild(newStep)
    }

    //On rend tous les points sur la carte cliquables
    document.querySelectorAll(".city").forEach(element => {
        element.addEventListener("click", () => {
            console.log("Cliqué sur un point de la carte !")
            if (element.getAttribute("id") == "goodAnswer") {
                gsap.to(element, {
                    scale: 1.1,
                    duration: 0.2,
                    fill: "#3A8A3A",
                    transformOrigin: "50% 50%"
                })

                console.log("Bonne réponse !")
                setParams(personnality, "goodAnswer")
                showNextButton()
            } else {
                gsap.to("#goodAnswer", {
                    scale: 1.1,
                    duration: 0.2,
                    fill: "#3A8A3A",
                    transformOrigin: "50% 50%"
                })
                gsap.to(element, {
                    duration: 0.2,
                    fill: "#C8251A",
                })
                setParams(personnality, "wrongAnswer")
                showNextButton()
            }
        })
        
    });
}



function hideStep(step) {
    document.querySelector("#step" + step).style.display = "none"
}

function showNextButton() {
    document.querySelector("#nextContainer").style.display = "flex"
}

function hideNextButton() {
    document.querySelector("#nextContainer").style.display = "none"
}

document.querySelector("#next").addEventListener("click", () => {
    showStep(currentStep + 1)
})


//Animation bonne réponse
function animCorrectAnswer(element) {
    gsap.timeline({
        defaults: { ease: "back.out(2)", duration: 0.3 }
    })
        .to(element, {
            rotate: -8,
            scale: 1.1,
            duration: 0.2,
            backgroundColor: "#3A8A3A",
            color: "#fff"
        })
        .to(element, {
            rotate: 8,
            duration: 0.2
        })
        .to(element, {
            rotate: 0,
            scale: 1,
            duration: 0.2,
        });
}

//Animation mauvaise réponse
function animWrongAnswer(element) {
    gsap.timeline({
        defaults: { ease: "power1.inOut" }
    })
        .to(element, {
            x: -8,
            duration: 0.08,
            backgroundColor: "#C8251A",
            color: "#fff"
        })
        .to(element, {
            x: 8,
            duration: 0.08,
            repeat: 3,
            yoyo: true
        })
        .to(element, {
            x: 0,
            duration: 0.08
        });
}