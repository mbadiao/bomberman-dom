// import { originGrid } from "../grid.js";
import { originGrid } from "../../app.js";
import gameState from "../../core/state.js";
// import { updateLifeScore } from "../interface/barreScore.js"
import { domNombreBombe } from "../../interface/barreScore.js";
import VirtualNode from "../../core/node.js";
import { main } from "../orgarnisms/main.js";
import { ws } from "../../app.js";
import { divs } from "../../components/grid.js";
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
    this.speed = 1; // powerUp speed
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
      // this.window.location.hash = '/gameover'
     
       ws.send(JSON.stringify({ type: "GameOver", name: this.name , content: "kill"}));
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
        style: `transform: translate(${this.initX * this.#blocSize}px, ${
          this.initY * this.#blocSize
        }px)`,
      },
      children: [this.representation],
    });
    const div = main.elem.querySelector("div").appendChild(iconAvatar.render());
    this.tag = iconAvatar.elem;
    // const div = document.querySelector("main > div");
    div.appendChild(iconAvatar.render());
  }

  // canCall = true;
  move(avatar, key, bon = false) {
    let x0 = this.initX * this.#blocSize;
    let y0 = this.initY * this.#blocSize;
    let dx = 0,
      dy = 0;

    switch (key) {
      case "ArrowUp":
        dy = -this.#blocSize;
        break;
      case "ArrowDown":
        dy = this.#blocSize;
        break;
      case "ArrowRight":
        dx = this.#blocSize;
        break;
      case "ArrowLeft":
        dx = -this.#blocSize;
        break;
      default:
        return;
    }

    const nextPos = (dx, dy) => ({
      x: (x0 + this.posX + dx) / this.#blocSize,
      y: (y0 + this.posY + dy) / this.#blocSize,
    });

    const { x, y } = nextPos(dx, dy);
    if (originGrid[y][x] === "c") {
      avatar.style.transform = `translate(${x0 + this.posX + dx}px, ${
        y0 + this.posY + dy
      }px)`;
      this.posX += dx;
      this.posY += dy;
    }
  }

  takePowerUpSpeed() {
    console.log("powerUp speed");
    console.log('divs[this.position()] :>> ', divs[this.position()]);
    if (divs[this.position()].textContent === "🚀") {
      this.speed = 4;
      // ON enleve le powerUp speed apres 1 minute plus tard
      setTimeout(() => {
        this.speed = 1;
      }, 60*1000);
      divs[this.position()].textContent = "";
      // domNombreBombe(bomb);
    }
  }

  takePowerUpBomb(bomb) { // Elle prend l'objet de la classe bomb
    console.log("powerUp bomb");
    if (divs[this.position()].textContent === "🔥") {
      bomb.portee = 2;
      setTimeout(() => {
        bomb.portee = 1;
      }, 60*1000);
      divs[this.position()].textContent = "";
      // domNombreBombe(bomb);
    } else if (divs[this.position()].textContent === "☘") {
      bomb.minage = 2;
      setTimeout(() => {
        bomb.minage = 1;
      }, 60*1000);
      divs[this.position()].textContent = "";
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
