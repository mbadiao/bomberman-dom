import gameState from "../../core/state.js";
import { ws } from "../../app.js";
import ChatCpn from "../orgarnisms/chat.js";
import timer from "../molecules/timer.js";
import VirtualNode from "../../core/node.js";
import container from "../molecules/container.js";
import { joinRoomHandle } from "../../services/join.js";
import avartarCard from "../molecules/avatarCard.js";
import { main } from "../orgarnisms/main.js";
import LifeAndActor from "../molecules/life.js";
import Actor from "../molecules/actor.js";
import chatMain from "../molecules/chat-main.js";
import countdown from "../../services/countdown.js";

const Room = () => {
  if (gameState.get("nickname") === "") {
    window.location.hash = "/insert";
    return;
  }
  
  document.body.innerHTML = "";
  document.body.append(container.render());

  let chat = new ChatCpn();
  container.elem.append(timer.render(), main.render(), chat.render());

  let msgInterval = setInterval(() => chatMain.newMessage({
    name: 'Fatima+Keita',
    content: "Is the room ready?",
  }), 4000);

  setTimeout(() => {
    clearInterval(msgInterval);
  }, 10000)

  main.elem.appendChild(
    new VirtualNode({
      tag: "div",
      attrs: {
        class: "waiting-text",
      },
      children: ["Waiting..."],
    }).render()
  );
  timer.elem.appendChild((new LifeAndActor(gameState.get("avatars").map(avatar => new Actor(avatar)))).render())
  if (gameState.get("playerCount") == 4) {
    countdown()
  }
};

export default Room;
