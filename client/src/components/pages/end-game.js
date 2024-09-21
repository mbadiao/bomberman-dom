import Cover from "../molecules/cover.js";
import Image from "../atoms/image.js";
import Heading from "../atoms/heading.js";
import Span from "../atoms/span.js";
// import Button from "../atoms/button.js";

export default () => {

    let ok = false
    document.body.innerHTML = '';
    document.body.appendChild(new Cover(new Cover(
        // <img>
        new Image("logo", "./assets/man.svg", {
          width: "200",
          height: "200",
        }),
  
        // <h1>
        new Heading(
          "title",
          "GAME-OVER".split("").map((letter) => {
            return new Span("letter", letter);
          })
        ),
  
        // // <button>
        // new Button(() => {
        //   window.location.hash = "/insert";
        // }, ["Start"])
      )))
}