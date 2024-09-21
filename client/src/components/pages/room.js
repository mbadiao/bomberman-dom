import gameState from "../../core/state.js";
import { ws } from "../../app.js";
import ChatCpn from "../orgarnisms/chat.js";
import timer from "../molecules/timer.js";
import VirtualNode from "../../core/node.js";
import container from "../molecules/container.js";
import { joinRoomHandle } from "../../services/join.js";
import avartarCard from "../molecules/avatarCard.js";
import { main } from "../orgarnisms/main.js";

const Room = () => {
  if (gameState.get("nickname") === "") {
    window.location.hash = "/insert";
    return;
  }
  document.body.innerHTML = "";
  document.body.append(container.render());
  let chat = new ChatCpn();
  container.elem.append(timer.render(), main.render(), chat.render());
  main.elem.appendChild(
    new VirtualNode({
      tag: "div",
      attrs: {
        class: "waiting-text",
      },
      children: ["Waiting..."],
    }).render()
  );
};

export default Room;
