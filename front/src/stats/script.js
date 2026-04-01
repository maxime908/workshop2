import { getDeviceId, getStats } from "../utils";

let stats = await getStats(getDeviceId());
let scoreTot = 0;

stats = stats.data;

const statsId = document.getElementById("stats");
let i = 1;

stats.forEach(element => {
    console.log(`score pour le device ${element.device_id} : ${element.score}`)
    statsId.innerHTML += 
    `
        <div class="card">
            <div class="d-flex justify-content-between p-3">
                <div class="d-flex flex-column">
                    <span class="text-muted">
                        ${i}
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
    `
    scoreTot += element.score; 
    i++;
});

console.log(`Le score total est de : ${scoreTot}`);