// import { originGrid } from "../grid.js";
import { originGrid } from "../../app.js";
import gameState from "../../core/state.js";
import { updateLifeScore, updateScore } from "../../interface/barreScore.js";
import VirtualNode from "../../core/node.js";
// import { arrayOfGhost, intervalIDs } from "./avatar.js"
// import { gameOver, winner } from "../interface/menuPause.js"
import { playSound } from "../../interface/sound.js";

export let detonationID = 0;

export class Bomb {
  constructor() {
    this.max = 1000;
    this.delay = 2000; // en milliseconde
    this.portee = 1; // powerUp pour augmenter la portée de la bombe de 2
    this.minage = 1; // powerUp pour poser plusieurs bombes a la fois
  }

  poserBomb(divs, position, actor) {
    if (actor.nombreActualBomb < this.minage) {

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
        actor.nombreActualBomb--;
      }, this.delay);
      actor.nombreActualBomb++;
    }

  }

  /*   #exploserBomb(nodes, position, actor) {
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
  
      
      let actorPos = actor.position();
      if (
        actorPos == position + 1 ||
        actorPos == position - 1 ||
        actorPos == position + 15 ||
        actorPos == position - 15 ||
        actorPos == position
      ) {
        updateLifeScore(actor);
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
  
    } */

  #exploserBomb(nodes, position, actor) {
    // On enleve d'abord la bombe
    nodes[position].textContent = "";

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

    let actorPos = actor.position();
    if (
      actorPos == position + 1 ||
      actorPos == position - 1 ||
      actorPos == position + 15 ||
      actorPos == position - 15 ||
      actorPos == position
    ) {
      updateLifeScore(actor);
    }

    // Détruire les blocs dans un rayon de 2 autour de la bombe
    const directions = [1, -1, 15, -15]; // Droite, Gauche, Bas, Haut
    directions.forEach((dir) => {
      for (let i = 1; i <= this.portee; i++) { // Parcourir de 1 à 2 blocs dans chaque direction
        const currentPos = position + dir * i;
        if (["c", "m", "x", "y", "z"].includes(nodes[currentPos]?.className)) {
          this.#boom(nodes[currentPos]);
          originGrid[Math.floor(currentPos / 15)][currentPos % 15] = "c";
        }
      }
    });
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
