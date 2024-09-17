import gameState, { actors, avatarsState, ws } from "../../app.js";
import ChatCpn from "../molecules/chat.js";
import Bomb from "../molecules/bomb.js";
import timer from "../molecules/timer.js";
import VirtualNode from "../../core/node.js";
import header from "../atoms/header.js";
import container from "../atoms/container.js";
import { joinRoomHandle } from "../../services/join.js";
import avartarCard from "../atoms/avatarCard.js";
import { main } from "../orgarnism/main.js";

const Room = () => {
    if (gameState.get('nickname') === "") {
        window.location.hash = "/insert";
        return
    }
    document.body.innerHTML = '';
    document.body.appendChild(new Bomb().render())
    document.body.append(header.render(), container.render())
    let chat = new ChatCpn();
    container.elem.append(timer.render(), main.render(), chat.render());
    main.elem.appendChild(new VirtualNode({
        tag: "div",
        attrs: {
            class: "waiting-text"
        },
        children: ["Waiting..."]
    }).render())

}

export default Room;