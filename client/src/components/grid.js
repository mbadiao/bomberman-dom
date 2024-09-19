import VirtualNode from "../core/node.js";
import { main } from "./orgarnisms/main.js";

export let originGrid = [
  ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
  ["b", "c", "c", "c", "c", "m", "m", "c", "m", "c", "c", "c", "c", "c", "b"],
  ["b", "c", "b", "c", "b", "m", "b", "m", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "c", "c", "m", "c", "m", "m", "m", "m", "c", "c", "c", "c", "b"],
  ["b", "m", "b", "m", "b", "m", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "m", "m", "m", "c", "m", "m", "m", "m", "m", "c", "c", "c", "b"],
  ["b", "m", "b", "m", "b", "m", "b", "m", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "m", "m", "m", "m", "m", "m", "m", "m", "m", "m", "m", "c", "b"],
  ["b", "m", "b", "c", "b", "m", "b", "m", "b", "m", "b", "c", "b", "c", "b"],
  ["b", "m", "m", "m", "m", "m", "m", "m", "c", "c", "c", "c", "c", "c", "b"],
  ["b", "m", "b", "m", "b", "m", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "c", "c", "m", "c", "m", "m", "c", "c", "c", "c", "c", "c", "b"],
  ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
];

export let divs = [];

export function grid() {
  /* 
        b -> bloc, m -> mur, c -> chemin, x -> bonus
    */

  
 
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
      divs.push(div.elem);
    }
  }
}
