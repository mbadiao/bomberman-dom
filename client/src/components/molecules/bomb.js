// import { originGrid } from "../grid.js";
import { originGrid } from "../../app.js";
import gameState from "../../core/state.js";
import { updateLifeScore, updateScore } from "../../interface/barreScore.js";
import VirtualNode from "../../core/node.js";
// import { arrayOfGhost, intervalIDs } from "./avatar.js"
// import { gameOver, winner } from "../interface/menuPause.js"
import { playSound } from "../../interface/sound.js";
import timer from "./timer.js";
import Actor from "./actor.js";
import LifeAndActor from "./life.js";

export let detonationID = 0;
let deathCounter = 0;

export class Bomb {
  constructor() {
    this.max = 100;
    this.delay = 2000; // en milliseconde
    this.portee = 1; // powerUp pour augmenter la portée de la bombe de 2
    this.minage = 1; // powerUp pour poser plusieurs bombes a la fois
  }

  canCall = true;
  poserBomb(divs, position, actor) {
    if (!this.canCall) {
      return;
    }

    const iconBomb = new VirtualNode({
      tag: "p",
      attrs: {
        class: "bomb",
        style: `font-size: 30px;`,
      },
      children: ["💣"],
    });

    if (divs[position].innerHTML == "") {
      divs[position].appendChild(iconBomb.render());
    }
    setTimeout(() => {
      this.#exploserBomb(divs, position, actor);
    }, this.delay);

    /* Logique Debounce : est une technique utilisée pour limiter la
         fréquence à laquelle une fonction peut être appelée  */
    this.canCall = false;
    setTimeout(() => {
      this.canCall = true;
    }, this.delay);
  }

  #exploserBomb(nodes, position, actor) {
    // On enleve d'abord la bombe
    nodes[position].removeChild(nodes[position].firstChild);

    // On recupere tous les avatars et leur position
    let avatarPos = [];
    gameState.get("avatars").forEach((avatar) => {
      let xyAvatar = avatar.tag.style.transform.match(/(-?\d+(?:\.\d+)?)/g);
      let xAvat = parseInt(xyAvatar[0]),
        yAvat = parseInt(xyAvatar[1]);
      avatarPos.push(((yAvat + 40) / 40) * 16 + xAvat / 40 - yAvat / 40 - 16);
    });

    // jouer le son de l'exposion
    playSound("sound_bomb.mp3");

    // Cassage des murs etc
    this.#boom(nodes[position]);

    // console.log('actor.position() :>> ', actor.position());
    let actorPos = actor.position();
    if (
      actorPos == position + 1 ||
      actorPos == position - 1 ||
      actorPos == position + 15 ||
      actorPos == position - 15 ||
      actorPos == position
    ) {

      updateLifeScore(actor);
      let lifeCpn = document.querySelectorAll('.avatars-representations')
      lifeCpn.forEach(element => element.remove());
      timer.elem.appendChild((new LifeAndActor(gameState.get("avatars").map(avatar => new Actor(avatar)))).render())
      

    }
    if (["c", "m", "x", "y", "z"].includes(nodes[position + 1].className)) {
      this.#boom(nodes[position + 1]);
      originGrid[Math.floor((position + 1) / 15)][(position + 1) % 15] = "c";
    }
    if (["c", "m", "x", "y", "z"].includes(nodes[position - 1].className)) {
      this.#boom(nodes[position - 1]);
      originGrid[Math.floor((position - 1) / 15)][(position - 1) % 15] = "c";
    }
    if (["c", "m", "x", "y", "z"].includes(nodes[position - 15].className)) {
      originGrid[Math.floor((position - 15) / 15)][(position - 15) % 15] = "c";
      this.#boom(nodes[position - 15]);
    }
    if (["c", "m", "x", "y", "z"].includes(nodes[position + 15].className)) {
      originGrid[Math.floor((position + 15) / 15)][(position + 15) % 15] = "c";
      this.#boom(nodes[position + 15]);
    }
    /*
        // On diminue la vie du joueur s'il se trouve dans le champ de porté
        let actorPos = avatarPos[0]
        
    */
    // On kill l'ennemi s'il est dans les parages, à i=0 on a l'acteur
    // console.log('Avatar lenght', avatarPos);
    // for (let i = 1; i < avatarPos.length; i++) {
    //     if ((avatarPos[i] == position + 1 || avatarPos[i] == position - 1 || avatarPos[i] == position + 15 || avatarPos[i] == position - 15 || avatarPos[i] == position) && arrayOfGhost[i - 1].life != 0) {
    //         allAvatar[i].style.display = 'none'
    //         arrayOfGhost[i - 1].life = 0
    //         cancelAnimationFrame(intervalIDs[i - 1])
    //         deathCounter++
    //         console.log(deathCounter);
    //         if (deathCounter === arrayOfGhost.length ){
    //             winner()
    //         }
    //     }
    // }
  }

  #boom(node) {
    node.textContent = "💥";
    this.#animateExplo(node, 25);
  }

  #animateExplo(node, taille) {
    taille += 5;
    node.style.fontSize = `${taille}px`;
    if (taille < 45) {
      requestAnimationFrame(() => {
        this.#animateExplo(node, taille);
      });
    } else {
      node.style.fontSize = "35px";
      if (node.className == "x") {
        node.textContent = "🔥"; // portee
      } else if (node.className == "y") {
        node.textContent = "☘"; // many
      } else if (node.className == "z") {
        node.textContent = "🚀"; // speed
      } else {
        node.textContent = "";
      }
      node.className = "c";
    }
  }
}

export default new Bomb();
