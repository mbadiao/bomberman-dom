/* 
    Implementation de la logique du score dependant du temps
*/

import Actor from "../components/molecules/actor";
import LifeAndActor from "../components/molecules/life";
import timer from "../components/molecules/timer";

// import { gameOver } from "./menuPause.js"

export let chronoId

export function updateLifeScore(actor) {
    actor.life--
    console.log('actor.life :>> ', actor.name, " - ", actor.life);
    actor.kill()
    let lifeCpn = document.querySelectorAll('.avatars-representations')
    lifeCpn.forEach(element => element.remove());
    timer.elem.appendChild((new LifeAndActor(gameState.get("avatars").map(avatar => new Actor(avatar)))).render())

}

export function updateScore() {
    const divScore = document.querySelector('#score span')
    let score = parseInt(divScore.textContent)
    divScore.textContent = `${score += 10}`
}

export function domLifeScore(actor) {
    document.querySelector('#life').innerHTML = `Life : <span>${actor.life}</span>`

}

export function domNombreBombe(bomb) {
    document.querySelector('#nbBombe').innerHTML = `Bombes : <span>${bomb.max}</span>`
}

function ajusterADeuxChiffres(nombre) {
    return nombre < 10 ? '0' + nombre : nombre + '';
}

export function chronometre() {
    const span = document.querySelector("#chronometre span")
    let actualTime = span.textContent.split(':')
    let secondes = parseInt(actualTime[1]);
    let minutes = parseInt(actualTime[0]);

    chronoId = setInterval(() => {
        secondes++;

        if (secondes >= 60) {
            secondes = 0;
            minutes++;

            if (minutes >= 60) {
                minutes = 0;
                heures++;
            }
        }

        document.getElementById('chronometre').innerHTML =
            `Timer : <span> ${ajusterADeuxChiffres(minutes)}:${ajusterADeuxChiffres(secondes)} </span> `;
    }, 1000);
}
