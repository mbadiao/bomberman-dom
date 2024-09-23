import Cover from "../molecules/cover.js";
import Image from "../atoms/image.js";
import Heading from "../atoms/heading.js";
import Span from "../atoms/span.js";

export default () => {
    let ok = false
    document.body.innerHTML = '';

    const endCover = new Cover(new Cover(
      // <img>
        new Image("logo", "./assets/svg/crying.svg", {
          width: "200",
          height: "200",
        }),
  
        // <h1>
        new Heading(
          "title",
          ["GAME-OVER!!!"]
        ),
      ))
      
      document.body.appendChild(endCover.render())
}