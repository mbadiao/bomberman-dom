import { grid } from "./component/grid.js";
import { Avatar } from "./component/avatar.js";
import { Bomb } from "./component/bomb.js";
import {
  updateLifeScore,
  chronometre,
  domLifeScore,
  domNombreBombe,
} from "./interface/barreScore.js";
import { ajoutPowersUp } from "./component/powerUp.js";
// import { pauseGame } from "./interface/menuPause.js";

grid();
// chronometre();
// ajoutPowersUp();

let actor = new Avatar(1, 1);
// export let boom = new Bomb();

actor.addAvatarInGrid("Actor", "actor");
const avatarActor = document.getElementById("avatarActor");
// const divs = document.querySelector("main").querySelectorAll("div");
// domLifeScore(actor);
// domNombreBombe(boom);

// let counter = 0;
export function keyHandler(e) {
  // if (e.key == " ") {
  //   boom.poserBomb(divs, actor.position(), actor);
  //   domNombreBombe(boom);
  //   // } else if (e.key == 'Escape') {
  //   //     pauseGame(actor)
  // } else {
    
    // if (counter % 5 == 0) {
      //   requestAnimationFrame(() => {
      actor.move(avatarActor, e.key, true);
      // actor.takePowerUpBomb(divs, boom);
      //   });
      // On regarde tranquille si on a pas plongé sur un ennemi
      // for (let i = 0; i < arrayOfGhost.length; i++) {
      //     if (arrayOfGhost[i].position() == actor.position() && arrayOfGhost[i].life != 0) {
      //         updateLifeScore(actor)
      //     }
      // }
      // On regarde si on doit pas prendre de powerUp
    // }
    // counter++;
  // }
}

document.addEventListener("keydown", keyHandler);

// document.addEventListener("keyup", (e) => {
//   if (e.key.includes("Arrow")) counter = 0;
// });

// ennemies(actor)
