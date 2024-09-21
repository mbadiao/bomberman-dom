import { grid } from "./components/grid.js";
import matrixToAscii from "./utils/convert.js";
import { Avatar } from "./components/molecules/avatar.js";
// import { Bomb } from "./atoms/bomb.js";
import { ajoutPowersUp } from "./components/powerUp.js";
import { joinRoomHandle } from "./services/join.js";
import gameState from "./core/state.js";
import router from "./core/router.js";
import boom from "./components/molecules/bomb.js";
import Home from "./components/pages/home.js";
import Insert from "./components/pages/insert.js";
import Game from "./components/pages/game.js";
import Room from "./components/pages/room.js";
import avartarCard from "./components/molecules/avatarCard.js";
import timer from "./components/molecules/timer.js";
import { main } from "./components/orgarnisms/main.js";
import alert from "./components/molecules/alert.js";
import {
  updateLifeScore,
  chronometre,
  domLifeScore,
  domNombreBombe,
} from "./interface/barreScore.js";
import countdown from "./services/countdown.js";
import actionOnAvatar from "./services/action.js";
import { canPass } from "./services/allow.js";
import { displayMsg } from "./services/message.js";
import { soundHome } from "./interface/sound.js";
import GameOver from "./components/pages/game-over.js";
import EndGame from "./components/pages/end-game.js";
import Hearts from "./components/molecules/hearts.js";

//------------------------------------------------------------------------------

export const ws = new WebSocket(`ws://${window.location.host.split(":")[0]}:8080/`);

export let originGrid;



//------------------------------------------------------------------------------

gameState.set({
  nickname: "",
  playerCount: 0,
  avatars: [],
  error: "",
  timerDebounce: 0,
  avatar: {},
});

gameState.subscribe(alert.display.bind(alert));

//------------------------------------------------------------------------------

router.add("/", Home);
router.add("/insert", Insert);
router.add("/room", Room);
router.add("/game", Game);
router.add("/gameover", EndGame);


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
    map: () => (originGrid = matrixToAscii(data.map)),
    alert: () => gameState.set({ error: data.content }),
    playerJoin: () => joinRoomHandle(data),
    startCountDown: () => countdown(),
    Action: () => actionOnAvatar(data),
    Msg: () => displayMsg(data),
    GameOver: () => GameOver(),
  };

  if (messageHandlers[data.type]) {
    messageHandlers[data.type]();
  } else {
    console.error(`Unhandled message type: ${data.type}`);
  }
};

//------------------------------------------------------------------------------

soundHome();

export function keyHandler(e) {
  if (canPass(e)) {
    if (gameState.get("nickname") != "" && gameState.get("timerDebounce") == 0 && (e.key).includes("Arrow")) {
      let me = gameState.get("avatar");
      let timerDebounce = setTimeout(() => {
        ws.send(
          JSON.stringify({
            type: "Action",
            name: gameState.get("nickname"),
            content: e.key,
          })
        );
        clearTimeout(timerDebounce);
        gameState.set({ timerDebounce: 0 });
      }, 200 / me.speed);
      gameState.set({ timerDebounce: timerDebounce });

    }
    if (e.key === " ") {
      ws.send(
        JSON.stringify({
          type: "Action",
          name: gameState.get("nickname"),
          content: " ",
        })
      );
    }
  }
}

//------------------------------------------------------------------------------

export function sendMsg(msg) {
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


