import { grid } from "./components/grid.js";
import { Avatar } from "./components/avatar.js";
// import { Bomb } from "./components/bomb.js";
import {
  updateLifeScore,
  chronometre,
  domLifeScore,
  domNombreBombe,
} from "./interface/barreScore.js";
import { ajoutPowersUp } from "./components/powerUp.js";
import VirtualNode from "./core/node.js";
import { joinRoomHandle } from "./services/join.js";
// import { pauseGame } from "./interface/menuPause.js";
import State from "./core/state.js";
import router from "./core/router.js";
import nameInput from "./components/atoms/input.js";
import entry from "./components/entry.js";
import logo from "./components/atoms/logo.js";
import startBtn from "./components/atoms/startBtn.js";
import titre from "./components/atoms/titre.js";
import TimerCpn from "./components/timer.js";
import ChatCpn from "./components/chat.js";
import Bomb from './components/molecules/bomb.js'
let header = new VirtualNode({
  tag: "header"
})
let container = new VirtualNode({
  tag: "div",
  attrs: {
    class: "container",
  }
})
let ws = new WebSocket(`ws://localhost:8989/`);



//------------------------------------------------------------------------------

const gameState = new State({
  nickname: "",
  playerCount: 0
});

//------------------------------------------------------------------------------

router.add("/", () => {
  document.body.innerHTML = '';
  document.body.appendChild(entry.render())
  entry.elem.append(logo.render(), titre.render(), startBtn.render())
});

router.add("/insert", () => {
  document.body.innerHTML = '';
  let info = new VirtualNode({
    tag: "h1",
    attrs: {
      class: "info"
    },
    children: [
      "Please enter your nickname "
    ]
  })
  document.body.append(info.render())
  info.elem.append(nameInput.render()) // REVIEW: Un <h1> ne devrait contenir que du texte. //TODO: document.body.appendChild(nameInput.render())
  nameInput.elem.focus();
});

router.add("/room", () => {
  if (gameState.get('nickname') === "") {
    window.location.hash = "/insert";
    return
  }
  document.body.innerHTML = '';
  document.body.appendChild(new Bomb().render())
  console.log("Joining room with nickname: ", gameState.get('nickname'));
  console.log('Number of players: ', gameState.get('playerCount'))
  document.body.append(header.render(), container.render())
  let timer = new TimerCpn();
  let chat = new ChatCpn();
  let main = new VirtualNode({
    tag: "main",
  });
  container.elem.append(timer.render(), main.render(), chat.render());
  main.elem.appendChild(new VirtualNode({
    tag: "div",
    attrs: {
      class:"waiting-text"
    },
    children:["Waiting..."]
  }).render())
   setTimeout(() => {
     window.location.hash = '/game';
   }, 30000);
});

router.add("/game", () => {
  if (gameState.current.nickname === "") {
    window.location.hash = "/";
    return
  }
  let data ={
      Type : "join",
      Name : gameState.current.nickname,
  }
  ws.send(JSON.stringify(data))
  document.querySelector("main").innerHTML = "";

  //document.body.innerHTML = '';

  grid();
});

export default gameState;

//------------------------------------------------------------------------------


// chronometre();
// ajoutPowersUp();
let myName;
const actors = [];
 
ws.onopen = () => {
  console.log("connected");
  myName = prompt("Enter your name")
  ws.send(JSON.stringify({
    type: "join",
    name: myName,
  }));
};

const avatarsActor = document.getElementsByClassName("avatarGame");
const divs = document.querySelector("main").querySelectorAll("div");
let avatar;


ws.onmessage = (e) => {
  let data = JSON.parse(e.data);
  console.log(data);
  if (data.type == "join") {
  } else if (data.type == "Action") {
    let i = data.playerCount - 1;
    console.log('actors[i] :>> ', actors[i]);
    console.log("action", data);
    const avatarActor = document.getElementById(`avatar${actors[i].name}`);
    actors[i].move(avatarActor, data.content, true);
  } else if (data.type == "playerJoin") {
    console.log("playerJoin", data);
    avatar = joinRoomHandle(actors, data);
    alert(data.content)
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
