import VirtualNode from "../core/node.js";
import { main } from "./orgarnisms/main.js";
import { ajoutPowersUp } from "./powerUp.js";
import { originGrid } from "../app.js";

export let divs = [];
export let murs = [];

export function grid() {
  // On enleve tout le contenu de main

  main.elem.innerHTML = "";
  for (let i = 0; i < originGrid.length; i++) {
    for (let j = 0; j < originGrid[i].length; j++) {
      let div = new VirtualNode({
        tag: "div",
        attrs: {
          class: originGrid[i][j],
        },
      });
      main.elem.appendChild(div.render());
      if (originGrid[i][j] === "m") murs.push(div.elem);
      divs.push(div.elem);
    }
  }
}
