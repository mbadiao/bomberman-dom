import { grid } from "./components/grid.js";
import { Avatar } from "./components/atoms/avatar.js";
// import { Bomb } from "./components/bomb.js";
import {
  updateLifeScore,
  chronometre,
  domLifeScore,
  domNombreBombe,
} from "./interface/barreScore.js";
import { ajoutPowersUp } from "./components/powerUp.js";
import { joinRoomHandle } from "./services/join.js";
// import { pauseGame } from "./interface/menuPause.js";
import State from "./core/state.js";
import router from "./core/router.js";
import Bomb from './components/molecules/bomb.js'
import Home from "./components/pages/home.js";
import Insert from "./components/pages/insert.js";
import Game from "./components/pages/game.js";
import Room from "./components/pages/room.js";


export const ws = new WebSocket(`ws://localhost:8989/`);
export const actors = [];


//------------------------------------------------------------------------------

export const gameState = new State({
  nickname: "",
  playerCount: 0,
});

export const avatarsState = new State({
  avatars: [],
});

//------------------------------------------------------------------------------

router.add("/", Home);

router.add("/insert", Insert);

router.add("/room", Room);

router.add("/game", Game);

export default gameState;

//------------------------------------------------------------------------------


// chronometre();
// ajoutPowersUp();
let myName;

ws.onopen = () => {
  console.log("connected");
};

const avatarsActor = document.getElementsByClassName("avatarGame");
const divs = document.querySelector("main")?.querySelectorAll("div");
let avatar;


ws.onmessage = (e) => {
  let data = JSON.parse(e.data);
  if (data.type == "Action") {
    let i = data.playerCount - 1;
    console.log('actors[i] :>> ', actors[i]);
    console.log("action", data);
    const avatarActor = document.getElementById(`avatar${actors[i].name}`);
    actors[i].move(avatarActor, data.content, true);
  } 
}







export let boom = new Bomb();

// domLifeScore(actor);
// domNombreBombe(boom);

// let counter = 0;
export function keyHandler(e) {

  if (e.key == " ") {
    boom.poserBomb(divs, actor.position(), actor);
    //   domNombreBombe(boom);
    //   // } else if (e.key == 'Escape') {
    //   //     pauseGame(actor)
  } else if (e.key.includes("Arrow")) {
    ws.send(JSON.stringify({
      type: "Action",
      name: avatar.name,
      content: e.key,
    }));

    // if (counter % 5 == 0) {
    // requestAnimationFrame(() => {

    // actors.forEach((actor, i) => {
    //   actor.move(avatarActor[i], e.key, true);
    // });
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
  }
}

document.addEventListener("keydown", keyHandler);

// document.addEventListener("keyup", (e) => {
//   if (e.key.includes("Arrow")) counter = 0;
// });

// ennemies(actor)
