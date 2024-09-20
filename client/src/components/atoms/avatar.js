import { originGrid } from "../grid.js";
import gameState from '../../core/state.js';
// import { updateLifeScore } from "../interface/barreScore.js"
import { domNombreBombe } from "../../interface/barreScore.js";
import VirtualNode from "../../core/node.js";
import { main } from "../orgarnisms/main.js";
import { ws } from "../../app.js";
// import { pause } from "../interface/menuPause.js"

export class Avatar {
  #blocSize = 40;
  constructor(x, y) {
    this.name = "player";
    this.representation = "👨";
    this.initX = x; // coordonnee de la case de depart genre (0, 1) ou (2...
    this.initY = y;
    this.posX = 0;
    this.posY = 0;
    this.life = 3;
    this.tag = null;
  }

  position() {
    return (
      ((this.initY * 40 + this.posY) / 40) * 16 +
      (this.initX * 40 + this.posX) / 40 -
      (this.initY * 40 + this.posY) / 40
    );
  }

  kill() {
    if (this.life == 0) {
      this.tag.remove();
      gameState.set({ playerCount: gameState.get("playerCount") - 1 });
      gameState.set({ avatars: gameState.get("avatars").filter((avatar) => avatar.name != this.name) });
      console.log("Game Over !!!");
      // ws.send(JSON.stringify({ type: "kill", name: this.name }));
      // Redirection vers la page de game over
      // window.location.hash = "/gameover";
    }
  }

  addAvatarInGrid(actorID) {
    // Recuperation de l'ancienne coordonnee de l'avatar avec coordinate
    const iconAvatar = new VirtualNode({
      tag: "p",
      attrs: {
        id: `avatar${actorID}`,
        class: "avatarGame",
        style: `transform: translate(${this.initX * this.#blocSize}px, ${this.initY * this.#blocSize}px)`,
      },
      children: [this.representation],
    })
    const div = main.elem.querySelector("div").appendChild(iconAvatar.render());
    this.tag = iconAvatar.elem;
    // const div = document.querySelector("main > div");
    div.appendChild(iconAvatar.render());
  }

  // canCall = true;
  move(avatar, key, bon = false) {
    let x0 = this.initX * this.#blocSize,
      y0 = this.initY * this.#blocSize;
    switch (key) {
      case "ArrowUp":
        // console.log("y: ", (y0+this.posY-this.#blocSize)/this.#blocSize, " x: ", (x0 + this.posX)/this.#blocSize)
        if (
          ['c'].includes(originGrid[(y0 + this.posY - this.#blocSize) / this.#blocSize][
            (x0 + this.posX) / this.#blocSize
          ])
        ) {
          avatar.style.transform = `translate(${x0 + this.posX}px, ${y0 + this.posY - this.#blocSize
            }px)`;
          this.posY -= this.#blocSize;
        }
        break;
      case "ArrowDown":
        // console.log("y: ", (y0+this.posY)/this.#blocSize, " x: ", (x0 + this.posX)/this.#blocSize)
        if (
          ['c'].includes(originGrid[(y0 + this.posY + this.#blocSize) / this.#blocSize][
            (x0 + this.posX) / this.#blocSize
          ])
        ) {
          avatar.style.transform = `translate(${x0 + this.posX}px, ${y0 + this.posY + this.#blocSize
            }px)`;
          this.posY += this.#blocSize;
        }
        break;
      case "ArrowRight":
        // console.log("y: ", (y0+this.posY)/this.#blocSize, " x: ", (x0 + this.posX+this.#blocSize)/this.#blocSize)
        if (
          ['c'].includes(originGrid[(y0 + this.posY) / this.#blocSize][
            (x0 + this.posX + this.#blocSize) / this.#blocSize
          ])
        ) {
          avatar.style.transform = `translate(${x0 + this.posX + this.#blocSize
            }px, ${y0 + this.posY}px)`;
          this.posX += this.#blocSize;
        }
        break;
      case "ArrowLeft":
        // console.log("y: ", (y0+this.posY)/this.#blocSize, " x: ", (x0 + this.posX-this.#blocSize)/this.#blocSize)
        if (
          ['c'].includes(originGrid[(y0 + this.posY) / this.#blocSize][
            (x0 + this.posX - this.#blocSize) / this.#blocSize
          ])
        ) {
          avatar.style.transform = `translate(${x0 + this.posX - this.#blocSize
            }px, ${y0 + this.posY}px)`;
          this.posX -= this.#blocSize;
        }
        break;
    }
  }

  takePowerUpBomb(divs, bomb) {
    if (divs[this.position()].className == "x") {
      bomb.max += 5;
      divs[this.position()].dataset.powerUp = "";
      divs[this.position()].textContent = "";
      domNombreBombe(bomb);
    }
  }
}

// export const arrayOfGhost = []
// export const intervalIDs = []
// let arrayEltGhost = []

// export function ennemies(actor, create = true) {
//     // Mis en place de la logique ennemi
//     if (create) {
//         for (let i = 0; i < arrayOfGhost.length; i++) {
//             arrayOfGhost[i].addAvatarInGrid(`Bad${i}`, `ennemi`)
//             arrayEltGhost.push(document.querySelector(`#avatarBad${i}`))
//         }
//     }

//     let direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
//     arrayOfGhost.map((ghost, index) => {
//         let counter = 0
//         intervalIDs[index] = requestAnimationFrame(() => {

//                 moveIt(ghost, index, counter)

//             })
//     });

//     function moveIt(ghost, index, counter) {
//         counter++
//         if (counter % 24 == 0 && !pause) {
//             ghost.move(arrayEltGhost[index], direction[Math.floor(Math.random() * 4)])
//             let posiActor = actor.position()
//             let posiGhost = ghost.position()
//             if (posiActor == posiGhost && arrayOfGhost[index].life != 0) {
//                 updateLifeScore(actor)
//             }
//         }
//         requestAnimationFrame(() => {
//             moveIt(ghost, index, counter)
//         })
//     }

// }
/* arrayOfGhost.map((ghost, index) => {
    intervalIDs[index] = setInterval(() => {
        ghost.move(arrayEltGhost[index], direction[Math.floor(Math.random() * 4)])
        let posiActor = actor.position()
        let posiGhost = ghost.position()
        
        if (posiActor == posiGhost ) {
            updateLifeScore(actor)
        }
    }, 400)
    
}) */

/* function test(counter) {
  counter++;
  if (counter % 24 == 0) console.log("bonjour");
  requestAnimationFrame(() => {
    test(counter);
  });
} */
