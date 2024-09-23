import Cover from "../molecules/cover.js";
import Image from "../atoms/image.js";
import Heading from "../atoms/heading.js";
import Span from "../atoms/span.js";
import Button from "../atoms/button.js";

export default () => {
  document.body.innerHTML = "";

  const entryCover = new Cover(
    // <img>
    new Image("logo", "./assets/svg/man.svg", {
      width: "200",
      height: "200",
    }),

    // <h1>
    new Heading(
      "title",
      "BOMBERMAN-DOM".split("").map((letter) => {
        return new Span("letter", letter);
      })
    ),

    // <button>
    new Button(
      ["Start"],
      'home-button',
      'button',
      () => window.location.hash = "/insert"
    )
  )

  document.body.appendChild(entryCover.render());
};
