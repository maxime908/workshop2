import gsap from "gsap";
import { readJSONFile, getStep } from "../../utils";

let oldData;

async function changeWindow() {

  const data = await readJSONFile('/steps.json')
  const dataStep = data.bass.step

  if (!oldData) {
    oldData = ""
    console.log("DataStep au tout début donne", dataStep)
    hideStep(0)
    showStep(dataStep)
  }

  if (JSON.stringify(data.bass) == JSON.stringify(oldData)) {
    // console.log("Aucune valeur changée")
  } else {

    if (JSON.stringify(data.bass.step) != JSON.stringify(oldData.step)) {
      hideStep(dataStep - 1)
      showStep(dataStep)
      
    } else {
      console.log("Le params a changé")
      if (data.bass.params == "goodAnswer") {
        if (dataStep == 3) {
          launchParty()
          hideStep(dataStep)
          showStep(4)
          animEnd()
        } else {
          showAnswer(dataStep, true)
        }
        
      } else if (data.bass.params == "wrongAnswer") {
        if (dataStep == 3) {
          hideStep(dataStep)
          showStep(4)
          animEnd()
        } else {
          showAnswer(dataStep, false)
        }
      } else if (data.bass.params == "refresh") {
        getStep("bass",0)
        setTimeout(() => {
            window.location.reload();
        }, 500);
      } 
    }
    // console.log("Nouvelles valeurs, changeons la window !")
    // document.querySelector("h2").textContent = "Nous sommes à l'étape " + dataStep + " !"
    // document.querySelector("p").textContent = "État de la réponse : " + data.bass.params



    

  }

  // console.log("data :", data.bass)

  // console.log("oldData :", oldData)

  oldData = data.bass
}


setInterval(changeWindow, 500)

const qrcodeContainer = document.querySelector("#qrcode");
new QRCode(qrcodeContainer, `${window.location.origin}/front/src/bass/mobile/index.html`);

function showStep(step) {
  gsap.fromTo(document.querySelector("#step" + step), {
    opacity: 0,
    x: 1200
  }, {
    duration: 0.5,
    ease: "power4.out",
    x: 0,
    opacity: 1,
  });
}

function hideStep(step) {
  gsap.fromTo(document.querySelector("#step" + step), {
    opacity: 1,
    x: 0
  }, {
    duration: 0.5,
    ease: "power4.out",
    x: -1200,
    opacity: 0,
  });
}


function showAnswer(step, good) {

  if (good) {
    launchParty()
  }
  
  if (step == 1) {

    // On enlève le paragraphe 1
    gsap.to("#paragraph1", {
      duration: 0.5,
      ease: "power4.out",
      x: -650
    })

    // On enlève le paragraphe 2
    gsap.to("#paragraph2", {
      duration: 0.5,
      ease: "power4.out",
      x: 650,
      delay: 0.2
    })

    // On fait disparaître le vecteur rouge
    gsap.to("#vector3", {
      duration: 0.8,
      ease: "power4.out",
      opacity: 0,
    })

    document.querySelector("#map2").setAttribute("src", "../assets/mapStyle2.png")

    // On zoom la carte
    gsap.to("#map2", {
      duration: 0.8,
      ease: "power4.out",
      scale: 3,
      x: -800,
      y: -100,
      delay: 0.6,
    })

    // On affiche le miniInfos answer
    gsap.to("#miniAnswer", {
      duration: 0.8,
      ease: "power4.out",
      opacity: 1,
    })

  } else if (step == 2) {

    // On enlève le portrait de Kubrick
    gsap.to("#portrait2", {
      duration: 0.5,
      ease: "power4.out",
      x: -700
    })

    // On enlève le portrait de Preminger
    gsap.to("#portrait3", {
      duration: 0.5,
      ease: "power4.out",
      x: 700
    })

    // On enlève le portrait de hitchcock
    gsap.to("#portrait1", {
      duration: 0.5,
      ease: "power4.out",
      x: 700,
    })

    // On fait disparaître le blob
    gsap.to("#gif", {
      duration: 0.8,
      ease: "power4.out",
      opacity: 0,
    })

    // On affiche le miniInfos
    gsap.to("#step2 .miniInfos", {
      duration: 0.8,
      ease: "power4.out",
      opacity: 1,
    })

    // On affiche la petite vidéo avec l'oiseau et Hitchcock
    gsap.to("#video3", {
      duration: 0.8,
      ease: "power4.out",
      opacity: 1,
    })
  }

}


//Confetti c'est la fête
function launchParty(dure = 1000) {
  const duration = dure,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);


    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

// L'animation du dégradé
gsap.to("#step4", {
  "--angle": "360deg",
  duration: 10,
  repeat: -1,
  ease: "none",  
  yoyo: true
});

function animEnd() {

  // On fait apparaître la tête de Bass
  gsap.fromTo("#pp", {
    y: 200,
    opacity: 0
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.in",
    delay: 0.5
  });

  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  tl.to("#fondBass", {
    y: -25,
    x: 12,
    rotation: 2,
    duration: 2,
    ease: "sine.inOut"
  })
  .to("#fondBass", {
    y: -10,
    x: -8,
    rotation: -1,
    duration: 2.5,
    ease: "sine.inOut"
  })
  .to("#fondBass", {
    y: -20,
    x: 5,
    rotation: 1,
    duration: 2,
    ease: "sine.inOut"
  });
}

animEnd()