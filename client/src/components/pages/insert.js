import { ws } from "../../app.js";
import VirtualNode from "../../core/node.js";
import gameState from "../../core/state.js";
import Heading from "../atoms/heading.js";
import Input from "../atoms/input.js";
import alert from "../atoms/alert.js";

const Insert = () => {
  document.body.innerHTML = "";

  const info = new Heading(1, "info", "Please enter your nickname ");

  const nameInput = new Input(
    "nickname-input",
    "Nickname here...",
    "join",
    {
      required: true,
      maxlength: 7,
    }
  );

  // REVIEW: <h1> hould only contain text.
  //TODO: document.body.appendChild(nameInput.render())
  document.body.append(info.render(), alert.render(), nameInput.render());
  nameInput.elem.focus();
};

export default Insert;
