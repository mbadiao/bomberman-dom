import { ws } from "../../app.js";
import VirtualNode from "../../core/node.js";
import gameState from "../../core/state.js";
import nameInput from "../atoms/input.js";
import alert from '../atoms/alert.js';

const Insert = () => {
    document.body.innerHTML = '';
    let info = new VirtualNode({
        tag: "h1",
        attrs: {
            class: "info"
        },
        children: [
            "Please enter your nickname "
        ],
        
    })
    document.body.append(info.render(), alert.render())
    info.elem.appendChild(nameInput.render()) // REVIEW: Should only contain text. //TODO: document.body.appendChild(nameInput.render())
    nameInput.elem.focus();
}

export default Insert;