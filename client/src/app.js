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

//------------------------------------------------------------------------------

export const ws = new WebSocket(`ws://localhost:8989/`);
// export const actors = [];

//------------------------------------------------------------------------------

gameState.set({
  nickname: "",
  playerCount: 0,
  avatars: [],
  ownerName: "",
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
let myName;

ws.onopen = () => {
  console.log("connected");
};

ws.onmessage = (e) => {
  let data;

  try {
    data = JSON.parse(e.data);
    console.log('e.data :>> ', e.data);
  } catch (error) {
    console.error("Error parsing message data: ", error);
    return;
  }

  const messageHandlers = {
    InvalidName: () => {
      0.0;
      gameState.set("error", data.content);
    },

    playerJoin: () => {
      joinRoomHandle(data);
    },

    startCountDown: () => {
      timerCountDown();
    }, // timerCountDown(), 

    Action: () => {
      const players = gameState.get("avatars");
      const actionnedActor = players.find(
        (player) => player.name === data.name
      );
      const avatarElement = document.querySelector(
        `#avatar${actionnedActor.name ?? ""}`
      );
      if (data.content == " ") {
        boom.poserBomb(divs, actionnedActor.position(), actionnedActor);
        domNombreBombe(boom);
      } else if ((data.content).includes("Arrow")) {
        actionnedActor.move(avatarElement, data.content, true);
      }

    },
  };

  if (messageHandlers[data.type]) {
    messageHandlers[data.type]();
  } else {
    console.error(`Unhandled message type: ${data.type}`);
  }
};





// domLifeScore(actor);
// domNombreBombe(boom);

// let counter = 0;
export function keyHandler(e) {
  if (e.key == "") {
    // boom.poserBomb(divs, actor.position(), actor);
    //   domNombreBombe(boom);
    //   // } else if (e.key == 'Escape') {
    //   //     pauseGame(actor)
  } else if (e.key.includes("Arrow") || e.key != " ") {
    console.log('gameState.get("ownerName") :>> ', gameState.get("ownerName"));
    if (gameState.get("ownerName") != "") {
      ws.send(
        JSON.stringify({
          type: "Action",
          name: gameState.get("ownerName"),
          content: e.key,
        })
      );
    }

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
