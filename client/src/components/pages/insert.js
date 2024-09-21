import { ws } from "../../app.js";
import VirtualNode from "../../core/node.js";
import gameState from "../../core/state.js";
import Heading from "../atoms/heading.js";
import Input from "../atoms/input.js";
import alert from "../molecules/alert.js";

export default () => {
  document.body.innerHTML = "";

  const info = new Heading("info", ["Please enter your nickname"], 1);

  const nameInput = new Input(
    "nickname-input",
    "Nickname here...",
    event => {
      const input = event.target.value;
      event.target.value = '';

      if (input.trim() !== '' && ws.readyState == 1) {
        ws.send(JSON.stringify({
          type: 'join',
          name: input
        }))
      }
    },
    {
      required: true,
      maxlength: 7,
    }
  );

  // REVIEW: <h1> should only contain text.
  //TODO: document.body.appendChild(nameInput.render())
  document.body.append(info.render(), alert.render(), nameInput.render());
  nameInput.elem.focus();
};
