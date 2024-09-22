// import { originGrid } from "../grid.js";
import { originGrid } from "../../app.js";
import gameState from "../../core/state.js";
import { updateLifeScore, updateScore } from "../../interface/barreScore.js";
import VirtualNode from "../../core/node.js";
// import { arrayOfGhost, intervalIDs } from "./avatar.js"
// import { gameOver, winner } from "../interface/menuPause.js"
import { playSound } from "../../interface/sound.js";

export let detonationID = 0;
let deathCounter = 0;

export class Bomb {
  constructor() {
    this.max = 100;
    this.delay = 2000; // en milliseconde
  }


  poserBomb(divs, position, actor) {

    if (actor.nombreActualBomb < actor.minage) {
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
      let timerout = setTimeout(() => {
        this.#exploserBomb(divs, position, actor);
        actor.nombreActualBomb--;
        clearTimeout(timerout);
      }, this.delay);
      actor.nombreActualBomb++;
    }

  }

  #exploserBomb(nodes, position, actor) {
    // On enleve d'abord la bombe
    nodes[position].textContent = "";

    // On recupere tous les avatars et leur position
    let avatars = gameState.get("avatars");
    let avatarPos = avatars.map((avatar) => {
      let xyAvatar = avatar.tag.style.transform.match(/(-?\d+(?:\.\d+)?)/g);
      let xAvat = parseInt(xyAvatar[0]),
        yAvat = parseInt(xyAvatar[1]);
      return {
        avatar: avatar,
        pos: ((yAvat + 40) / 40) * 16 + xAvat / 40 - yAvat / 40 - 16
      };
    });

    // jouer le son de l'explosion
    playSound("sound_bomb.mp3");

    // Explosion au centre
    this.#boom(nodes[position]);

    // Vérifier si un avatar est à la position de la bombe
    avatarPos.forEach(({ avatar, pos }) => {
      if (pos === position) {
        updateLifeScore(avatar); // Réduire la vie de l'avatar si sa position est celle de la bombe
      }
    });

    // Détruire les blocs dans un rayon de 2 autour de la bombe
    const directions = [1, -1, 15, -15]; // Droite, Gauche, Bas, Haut
    directions.forEach((dir) => {
      for (let i = 1; i <= actor.portee; i++) { // Parcourir de 1 à 2 blocs dans chaque direction
        const currentPos = position + dir * i;

        // Explosion des blocs destructibles
        if (["c", "m", "x", "y", "z"].includes(nodes[currentPos]?.className)) {
          this.#boom(nodes[currentPos]);
          originGrid[Math.floor(currentPos / 15)][currentPos % 15] = "c";
        }

        // Réduire la vie des avatars dans la zone d'explosion
        avatarPos.forEach(({ avatar, pos }) => {
          if (pos === currentPos) {
            updateLifeScore(avatar); // Réduire la vie de l'avatar si sa position correspond à la zone d'explosion
          }
        });
      }
    });
  }

  #boom(node) {
    if (node.textContent != '🔥' && node.textContent != '☘' && node.textContent != '🚀') {
      node.textContent = "💥";
      this.#animateExplo(node);
     /*  if (node.className == "x") {
        node.textContent = "🔥"; // portee
      } else if (node.className == "y") {
        node.textContent = "☘"; // many
      } else if (node.className == "z") {
        node.textContent = "🚀"; // speed
      } else {
        node.textContent = "";
      }
      node.className = "c"; */
    }
  }

  /*  #animateExplo(node) {
     // Ajouter une transition CSS pour lisser l'animation de la taille
     node.style.transition = 'font-size 0.05s ease-out'; // Transition fluide en 0.3s
     node.style.fontSize = '45px'; // Taille finale après explosion
   
     // Attendre la fin de la transition
     let timerout = setTimeout(() => {
       node.style.fontSize = "35px"; // Taille normale après l'animation
       node.style.transition = 'none'; // Réinitialiser la transition
       // Gérer les changements de contenu selon la classe de l'élément
       if (node.className == "x") {
         node.textContent = "🔥"; // portee
       } else if (node.className == "y") {
         node.textContent = "☘"; // many
       } else if (node.className == "z") {
         node.textContent = "🚀"; // speed
       } else {
         node.textContent = "";
       }
       node.className = "c"; // Reset de la classe
 
       clearTimeout(timerout); // Arrêter le timer
     }, 50); // Durée correspondant à la transition CSS
   } */

  #animateExplo(node) {
    // Préparer le DOM à la modification de font-size pour améliorer les performances
    // node.style.willChange = 'font-size';

    // Ajouter une transition CSS pour lisser l'animation de la taille
    // node.style.transition = 'font-size 50ms ease-out'; // Transition fluide en 0.1s
    // node.style.fontSize = '45px'; // Taille finale après explosion

    // Attendre la fin de la transition
    let timeout = setTimeout(() => {
      /* node.style.fontSize = "35px"; // Taille normale après l'animation
      node.style.transition = 'none'; // Réinitialiser la transition après l'animation
      node.style.willChange = 'auto'; // Réinitialiser will-change après l'animation */

      // Gérer les changements de contenu selon la classe de l'élément
      if (node.className == "x") {
        node.textContent = "🔥"; // portee
      } else if (node.className == "y") {
        node.textContent = "☘"; // many
      } else if (node.className == "z") {
        node.textContent = "🚀"; // speed
      } else {
        node.textContent = "";
      }
      node.className = "c"; // Reset de la classe

      clearTimeout(timeout); // Nettoyer le timeout
    }, 50); // Durée correspondant à la transition CSS (en ligne avec transition)
  }


}

export default new Bomb();
