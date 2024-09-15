import { grid } from "./components/grid.js";
import { Avatar } from "./components/avatar.js";
import { Bomb } from "./components/bomb.js";
import {
  updateLifeScore,
  chronometre,
  domLifeScore,
  domNombreBombe,
} from "./interface/barreScore.js";
import { ajoutPowersUp } from "./components/powerUp.js";
import VirtualNode from "./core/node.js";
// import { pauseGame } from "./interface/menuPause.js";
import State from "./core/state.js";
import router from "./core/router.js";
import nameInput from "./components/atoms/input.js";

let header = new VirtualNode({
  tag : "header"
})
let container = new VirtualNode({
  tag: "div",
  attrs : {
      class : "container",
  }
})

//------------------------------------------------------------------------------

const gameState = new State({
  nickname: "",
});

//------------------------------------------------------------------------------

router.add("/", () => {
  document.body.innerHTML = '';
  document.body.appendChild(nameInput.render());
  nameInput.elem.focus();
});

router.add("/room", () => {
  if (gameState.current.nickname === "") {
    window.location.hash = "/";
    return
  }

  document.body.innerHTML = '';
  console.log("Joining room with nickname: ", gameState.current.nickname);
});

router.add("/game", () => {
  if (gameState.current.nickname === "") {
    window.location.hash = "/";
    return
  }
  document.body.innerHTML = '';
  document.body.append(header.render(), container.render())
  grid();
});

export default gameState;

//------------------------------------------------------------------------------


// chronometre();
// ajoutPowersUp();
const actors = [];
actors.push(new Avatar(1, 1), new Avatar(2, 1));

export let boom = new Bomb();
actors.forEach((actor, index) => {
  actor.addAvatarInGrid(`Actor${index}`, "actor");
})

const avatarActor = document.getElementsByClassName("avatarGame");
const divs = document.querySelector("main").querySelectorAll("div");
// domLifeScore(actor);
// domNombreBombe(boom);

// let counter = 0;
export function keyHandler(e) {
  if (e.key == " ") {
    boom.poserBomb(divs, actor.position(), actor);
  //   domNombreBombe(boom);
  //   // } else if (e.key == 'Escape') {
  //   //     pauseGame(actor)
  }
  // else {

  // if (counter % 5 == 0) {
  // requestAnimationFrame(() => {
    actors.forEach((actor,i) => {
      actor.move(avatarActor[i], e.key, true);
    });
    // actor.takePowerUpBomb(divs, boom);
  // });
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
