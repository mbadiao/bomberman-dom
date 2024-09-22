// import { originGrid } from "../grid.js";
import { originGrid } from "../../app.js";
import gameState from "../../core/state.js";
import { domNombreBombe } from "../../interface/barreScore.js";
import VirtualNode from "../../core/node.js";
import { main } from "../orgarnisms/main.js";
import { ws } from "../../app.js";
import { divs } from "../grid.js";
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
    this.nombreActualBomb = 0; // nombre de bombe poser par le joueur
    this.portee = 1; // powerUp pour augmenter la portée de la bombe de 2
    this.minage = 1; // powerUp pour poser plusieurs bombes a la fois
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
 
      // Si le joueur perd tout vie
      ws.send(JSON.stringify({ type: "GameOver", name: this.name, content: "kill" }));
    }
  }

  addAvatarInGrid(actorID) {
    // Recuperation de l'ancienne coordonnee de l'avatar avec coordinate
    const iconAvatar = new VirtualNode({
      tag: "p",
      attrs: {
        id: `avatar${actorID}`,
        class: "avatarGame",
        style: `transform: translate(${this.initX * this.#blocSize}px, ${this.initY * this.#blocSize
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
  move(key) {
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
      this.tag.style.transform = `translate(${x0 + this.posX + dx}px, ${y0 + this.posY + dy
        }px)`;
      this.posX += dx;
      this.posY += dy;
    }
  }

  takePowerUpSpeed() {
    if (divs[this.position()].textContent === "🚀") {
      this.speed = 4;
      // ON enleve le powerUp speed apres 1 minute plus tard
      let timer = setTimeout(() => {
        this.speed = 1;
        clearTimeout(timer);
      }, 60 * 1000);
      divs[this.position()].textContent = "";
      // domNombreBombe(bomb);
    }
  }

  takePowerUpBomb() { // Elle prend l'objet de la classe bomb

    if (divs[this.position()].textContent === "🔥") {
      this.portee = 2;
      let timer = setTimeout(() => {
        this.portee = 1;
        clearTimeout(timer);
      }, 60 * 1000);
      divs[this.position()].textContent = "";

    } else if (divs[this.position()].textContent === "☘") {
      this.minage = 2;
      let timer = setTimeout(() => {
        this.minage = 1;
        clearTimeout(timer);
      }, 60 * 1000);
      divs[this.position()].textContent = "";
    }
  }
}
