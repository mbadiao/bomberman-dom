import { murs } from "./grid.js"

export function ajoutPowersUp() { // REVIEW: Has nothing to do in `components/`.
    const powerUp = ['hyperBombe', 'dualBombe', 'accelerate']
    murs[0].dataset.powerUp = 'dualBombe'
    for (let i = 0; i < 5; i++) {
        murs[Math.floor(Math.random()*(murs.length-1))+1].dataset.powerUp = powerUp[Math.floor(Math.random()*3)]
    }
}

