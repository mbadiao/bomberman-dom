import { grid } from "./components/grid.js";
import { Avatar } from "./components/atoms/avatar.js";
// import { Bomb } from "./atoms/bomb.js";
import { ajoutPowersUp } from "./components/powerUp.js";
import { joinRoomHandle } from "./services/join.js";
// import { pauseGame } from "./interface/menuPause.js";
import gameState from "./core/state.js";
import router from "./core/router.js";
import boom from "./components/atoms/bomb.js";
import Home from "./components/pages/home.js";
import Insert from "./components/pages/insert.js";
import Game from "./components/pages/game.js";
import Room from "./components/pages/room.js";
import avartarCard from "./components/atoms/avatarCard.js";
import timer from "./components/molecules/timer.js";
import { main } from "./components/orgarnisms/main.js";
import alert from "./components/atoms/alert.js";
import {
  updateLifeScore,
  chronometre,
  domLifeScore,
  domNombreBombe,
} from "./interface/barreScore.js";
import { timerCountDown } from "./services/timerCountDown.js";
import actionOnAvatar from "./services/action.js";
import { canPass } from "./services/allow.js";
import { displayMsg } from "./services/message.js";
import { soundHome } from "./interface/sound.js";

//------------------------------------------------------------------------------

export const ws = new WebSocket(`ws://localhost:8080/`);

//------------------------------------------------------------------------------

gameState.set({
  nickname: "",
  playerCount: 0,
  avatars: [],
  error: "",
});

gameState.subscribe(alert.display.bind(alert));

//------------------------------------------------------------------------------

router.add("/", Home);
router.add("/insert", Insert);
router.add("/room", Room);
router.add("/game", Game);

//------------------------------------------------------------------------------

// chronometre();
// ajoutPowersUp();

//------------------------------------------------------------------------------


ws.onopen = () => {
  console.log("connected");
};

ws.onmessage = (e) => {
  let data;
  
  try {
    data = JSON.parse(e.data);
  } catch (error) {
    console.error("Error parsing message data: ", error);
    return;
  }

//------------------------------------------------------------------------------

  const messageHandlers = {
    InvalidName: () => gameState.set("error", data.content),
    playerJoin: () => joinRoomHandle(data),
    startCountDown: () => timerCountDown(),
    Action: () => actionOnAvatar(data),
    Msg: () => displayMsg(data)
  };

  if (messageHandlers[data.type]) {
    messageHandlers[data.type]();
  } else {
    console.error(`Unhandled message type: ${data.type}`);
  }
};

//------------------------------------------------------------------------------

soundHome();
// domLifeScore(actor);
// domNombreBombe(boom);

// let counter = 0;
export function keyHandler(e) {
  if (canPass(e)) {
    console.log('gameState.get("nickname") :>> ', gameState.get("nickname"));
    if (gameState.get("nickname") != "") {
      ws.send(
        JSON.stringify({
          type: "Action",
          name: gameState.get("nickname"),
          content: e.key,
        })
      );
    }
    
  } 
}

//------------------------------------------------------------------------------

export function sendMsg(msg){
  if (gameState.get("nickname") != "") {
    ws.send(
      JSON.stringify({
        type: "Msg",
        name: gameState.get("nickname"),
        content: msg,
      })
    );
  }
  
}

document.addEventListener("keydown", keyHandler);

//else{
    

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
  //}

// document.addEventListener("keyup", (e) => {
//   if (e.key.includes("Arrow")) counter = 0;
// });

// ennemies(actor)
