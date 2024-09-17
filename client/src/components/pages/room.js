import gameState, { actors, ws } from "../../app.js";
import ChatCpn from "../chat.js";
import Bomb from "../molecules/bomb.js";
import TimerCpn from "../molecules/timer.js";
import VirtualNode from "../../core/node.js";
import header from "../atoms/header.js";
import container from "../atoms/container.js";
import { joinRoomHandle } from "../../services/join.js";
import avartarCard from "../atoms/avatarCard.js";

const Room = () => {
    if (gameState.get('nickname') === "") {
        window.location.hash = "/insert";
        return
    }
    document.body.innerHTML = '';
    document.body.appendChild(new Bomb().render())
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
            class: "waiting-text"
        },
        children: ["Waiting..."]
    }).render())

    ws.addEventListener('message', (e) => {
        let data = JSON.parse(e.data);
        console.log('data :>> ', data);

        if (data.type === 'playerJoin') {
            const avatars = joinRoomHandle(actors, data);
            main.elem.innerHTML = "";
            avatars.forEach(avatar => main.elem.appendChild(new avartarCard(avatar.representation).render()));
        }

        if (data.type === 'startCountDown') {
            let countdown = 9;
            let chrono = setInterval(() => {
                timer.elem.querySelector("#formattedTime").innerText = "00:0"+countdown;
                countdown--;
            }, 1000);
            setTimeout(() => {
                clearInterval(chrono);
                timer.elem.querySelector("#formattedTime").innerText = "00:00";
                window.location.hash = '/game';
            }, 10000);
        }
    })

}

export default Room;