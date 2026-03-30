import { getAPI } from "../../utils";

const name = document.querySelector('#name'); 

getAPI("/lamarr").then(res => {
    res.data.forEach(personne => {
        name.innerHTML += `
            <div>
                <h2>${personne.name}</h2>
                <p>${personne.description}</p>
            </div>
        `;
    });
});

console.log("jinx");