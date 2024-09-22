[1mdiff --git a/client/src/components/molecules/avatar.js b/client/src/components/molecules/avatar.js[m
[1mindex b60dc1a..a9f0449 100644[m
[1m--- a/client/src/components/molecules/avatar.js[m
[1m+++ b/client/src/components/molecules/avatar.js[m
[36m@@ -18,7 +18,9 @@[m [mexport class Avatar {[m
     this.posX = 0;[m
     this.posY = 0;[m
     this.life = 3;[m
[31m-    this.nombreActualBomb = 0;[m
[32m+[m[32m    this.nombreActualBomb = 0; // nombre de bombe poser par le joueur[m
[32m+[m[32m    this.portee = 1; // powerUp pour augmenter la portée de la bombe de 2[m
[32m+[m[32m    this.minage = 1; // powerUp pour poser plusieurs bombes a la fois[m
     this.speed = 1; // powerUp speed[m
     this.tag = null;[m
   }[m
[36m@@ -61,7 +63,7 @@[m [mexport class Avatar {[m
   }[m
 [m
   // canCall = true;[m
[31m-  move(avatar, key, bon = false) {[m
[32m+[m[32m  move(key) {[m
     let x0 = this.initX * this.#blocSize;[m
     let y0 = this.initY * this.#blocSize;[m
     let dx = 0,[m
[36m@@ -91,7 +93,7 @@[m [mexport class Avatar {[m
 [m
     const { x, y } = nextPos(dx, dy);[m
     if (originGrid[y][x] === "c") {[m
[31m-      avatar.style.transform = `translate(${x0 + this.posX + dx}px, ${y0 + this.posY + dy[m
[32m+[m[32m      this.tag.style.transform = `translate(${x0 + this.posX + dx}px, ${y0 + this.posY + dy[m
         }px)`;[m
       this.posX += dx;[m
       this.posY += dy;[m
[36m@@ -111,20 +113,20 @@[m [mexport class Avatar {[m
     }[m
   }[m
 [m
[31m-  takePowerUpBomb(bomb) { // Elle prend l'objet de la classe bomb[m
[32m+[m[32m  takePowerUpBomb() { // Elle prend l'objet de la classe bomb[m
 [m
     if (divs[this.position()].textContent === "🔥") {[m
[31m-      bomb.portee = 2;[m
[32m+[m[32m      this.portee = 2;[m
       let timer = setTimeout(() => {[m
[31m-        bomb.portee = 1;[m
[32m+[m[32m        this.portee = 1;[m
         clearTimeout(timer);[m
       }, 60 * 1000);[m
       divs[this.position()].textContent = "";[m
 [m
     } else if (divs[this.position()].textContent === "☘") {[m
[31m-      bomb.minage = 2;[m
[32m+[m[32m      this.minage = 2;[m
       let timer = setTimeout(() => {[m
[31m-        bomb.minage = 1;[m
[32m+[m[32m        this.minage = 1;[m
         clearTimeout(timer);[m
       }, 60 * 1000);[m
       divs[this.position()].textContent = "";[m
[1mdiff --git a/client/src/components/molecules/bomb.js b/client/src/components/molecules/bomb.js[m
[1mindex 5ef8a2b..df7453c 100644[m
[1m--- a/client/src/components/molecules/bomb.js[m
[1m+++ b/client/src/components/molecules/bomb.js[m
[36m@@ -6,9 +6,6 @@[m [mimport VirtualNode from "../../core/node.js";[m
 // import { arrayOfGhost, intervalIDs } from "./avatar.js"[m
 // import { gameOver, winner } from "../interface/menuPause.js"[m
 import { playSound } from "../../interface/sound.js";[m
[31m-import timer from "./timer.js";[m
[31m-import Actor from "./actor.js";[m
[31m-import LifeAndActor from "./life.js";[m
 [m
 export let detonationID = 0;[m
 let deathCounter = 0;[m
[36m@@ -17,127 +14,142 @@[m [mexport class Bomb {[m
   constructor() {[m
     this.max = 100;[m
     this.delay = 2000; // en milliseconde[m
[31m-    this.portee = 1; // powerUp pour augmenter la portée de la bombe de 2[m
[31m-    this.minage = 1; // powerUp pour poser plusieurs bombes a la fois[m
   }[m
 [m
[31m-  canCall = true;[m
[32m+[m
   poserBomb(divs, position, actor) {[m
[31m-    if (!this.canCall) {[m
[31m-      return;[m
[31m-    }[m
 [m
[31m-    const iconBomb = new VirtualNode({[m
[31m-      tag: "p",[m
[31m-      attrs: {[m
[31m-        class: "bomb",[m
[31m-        style: `font-size: 30px;`,[m
[31m-      },[m
[31m-      children: ["💣"],[m
[31m-    });[m
[32m+[m[32m    if (actor.nombreActualBomb < actor.minage) {[m
[32m+[m[32m      const iconBomb = new VirtualNode({[m
[32m+[m[32m        tag: "p",[m
[32m+[m[32m        attrs: {[m
[32m+[m[32m          class: "bomb",[m
[32m+[m[32m          style: `font-size: 30px;`,[m
[32m+[m[32m        },[m
[32m+[m[32m        children: ["💣"],[m
[32m+[m[32m      });[m
 [m
[31m-    if (divs[position].innerHTML == "") {[m
[31m-      divs[position].appendChild(iconBomb.render());[m
[32m+[m[32m      if (divs[position].innerHTML == "") {[m
[32m+[m[32m        divs[position].appendChild(iconBomb.render());[m
[32m+[m[32m      }[m
[32m+[m[32m      let timerout = setTimeout(() => {[m
[32m+[m[32m        this.#exploserBomb(divs, position, actor);[m
[32m+[m[32m        actor.nombreActualBomb--;[m
[32m+[m[32m        clearTimeout(timerout);[m
[32m+[m[32m      }, this.delay);[m
[32m+[m[32m      actor.nombreActualBomb++;[m
     }[m
[31m-    setTimeout(() => {[m
[31m-      this.#exploserBomb(divs, position, actor);[m
[31m-    }, this.delay);[m
[31m-[m
[31m-    /* Logique Debounce : est une technique utilisée pour limiter la[m
[31m-         fréquence à laquelle une fonction peut être appelée  */[m
[31m-    this.canCall = false;[m
[31m-    setTimeout(() => {[m
[31m-      this.canCall = true;[m
[31m-    }, this.delay);[m
[32m+[m
   }[m
 [m
   #exploserBomb(nodes, position, actor) {[m
     // On enleve d'abord la bombe[m
[31m-    nodes[position].removeChild(nodes[position].firstChild);[m
[32m+[m[32m    nodes[position].textContent = "";[m
 [m
     // On recupere tous les avatars et leur position[m
[31m-    let avatarPos = [];[m
[31m-    gameState.get("avatars").forEach((avatar) => {[m
[32m+[m[32m    let avatars = gameState.get("avatars");[m
[32m+[m[32m    let avatarPos = avatars.map((avatar) => {[m
       let xyAvatar = avatar.tag.style.transform.match(/(-?\d+(?:\.\d+)?)/g);[m
       let xAvat = parseInt(xyAvatar[0]),[m
         yAvat = parseInt(xyAvatar[1]);[m
[31m-      avatarPos.push(((yAvat + 40) / 40) * 16 + xAvat / 40 - yAvat / 40 - 16);[m
[32m+[m[32m      return {[m
[32m+[m[32m        avatar: avatar,[m
[32m+[m[32m        pos: ((yAvat + 40) / 40) * 16 + xAvat / 40 - yAvat / 40 - 16[m
[32m+[m[32m      };[m
     });[m
 [m
[31m-    // jouer le son de l'exposion[m
[32m+[m[32m    // jouer le son de l'explosion[m
     playSound("sound_bomb.mp3");[m
 [m
[31m-    // Cassage des murs etc[m
[32m+[m[32m    // Explosion au centre[m
     this.#boom(nodes[position]);[m
 [m
[31m-    // console.log('actor.position() :>> ', actor.position());[m
[31m-    let actorPos = actor.position();[m
[31m-    if ([m
[31m-      actorPos == position + 1 ||[m
[31m-      actorPos == position - 1 ||[m
[31m-      actorPos == position + 15 ||[m
[31m-      actorPos == position - 15 ||[m
[31m-      actorPos == position[m
[31m-    ) {[m
[31m-[m
[31m-      updateLifeScore(actor);[m
[31m-      let lifeCpn = document.querySelectorAll('.avatars-representations')[m
[31m-      lifeCpn.forEach(element => element.remove());[m
[31m-      timer.elem.appendChild((new LifeAndActor(gameState.get("avatars").map(avatar => new Actor(avatar)))).render())[m
[31m-      [m
[32m+[m[32m    // Vérifier si un avatar est à la position de la bombe[m
[32m+[m[32m    avatarPos.forEach(({ avatar, pos }) => {[m
[32m+[m[32m      if (pos === position) {[m
[32m+[m[32m        updateLifeScore(avatar); // Réduire la vie de l'avatar si sa position est celle de la bombe[m
[32m+[m[32m      }[m
[32m+[m[32m    });[m
 [m
[31m-    }[m
[31m-    if (["c", "m", "x", "y", "z"].includes(nodes[position + 1].className)) {[m
[31m-      this.#boom(nodes[position + 1]);[m
[31m-      originGrid[Math.floor((position + 1) / 15)][(position + 1) % 15] = "c";[m
[31m-    }[m
[31m-    if (["c", "m", "x", "y", "z"].includes(nodes[position - 1].className)) {[m
[31m-      this.#boom(nodes[position - 1]);[m
[31m-      originGrid[Math.floor((position - 1) / 15)][(position - 1) % 15] = "c";[m
[31m-    }[m
[31m-    if (["c", "m", "x", "y", "z"].includes(nodes[position - 15].className)) {[m
[31m-      originGrid[Math.floor((position - 15) / 15)][(position - 15) % 15] = "c";[m
[31m-      this.#boom(nodes[position - 15]);[m
[31m-    }[m
[31m-    if (["c", "m", "x", "y", "z"].includes(nodes[position + 15].className)) {[m
[31m-      originGrid[Math.floor((position + 15) / 15)][(position + 15) % 15] = "c";[m
[31m-      this.#boom(nodes[position + 15]);[m
[31m-    }[m
[31m-    /*[m
[31m-        // On diminue la vie du joueur s'il se trouve dans le champ de porté[m
[31m-        let actorPos = avatarPos[0][m
[31m-        [m
[31m-    */[m
[31m-    // On kill l'ennemi s'il est dans les parages, à i=0 on a l'acteur[m
[31m-    // console.log('Avatar lenght', avatarPos);[m
[31m-    // for (let i = 1; i < avatarPos.length; i++) {[m
[31m-    //     if ((avatarPos[i] == position + 1 || avatarPos[i] == position - 1 || avatarPos[i] == position + 15 || avatarPos[i] == position - 15 || avatarPos[i] == position) && arrayOfGhost[i - 1].life != 0) {[m
[31m-    //         allAvatar[i].style.display = 'none'[m
[31m-    //         arrayOfGhost[i - 1].life = 0[m
[31m-    //         cancelAnimationFrame(intervalIDs[i - 1])[m
[31m-    //         deathCounter++[m
[31m-    //         console.log(deathCounter);[m
[31m-    //         if (deathCounter === arrayOfGhost.length ){[m
[31m-    //             winner()[m
[31m-    //         }[m
[31m-    //     }[m
[31m-    // }[m
[32m+[m[32m    // Détruire les blocs dans un rayon de 2 autour de la bombe[m
[32m+[m[32m    const directions = [1, -1, 15, -15]; // Droite, Gauche, Bas, Haut[m
[32m+[m[32m    directions.forEach((dir) => {[m
[32m+[m[32m      for (let i = 1; i <= actor.portee; i++) { // Parcourir de 1 à 2 blocs dans chaque direction[m
[32m+[m[32m        const currentPos = position + dir * i;[m
[32m+[m
[32m+[m[32m        // Explosion des blocs destructibles[m
[32m+[m[32m        if (["c", "m", "x", "y", "z"].includes(nodes[currentPos]?.className)) {[m
[32m+[m[32m          this.#boom(nodes[currentPos]);[m
[32m+[m[32m          originGrid[Math.floor(currentPos / 15)][currentPos % 15] = "c";[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        // Réduire la vie des avatars dans la zone d'explosion[m
[32m+[m[32m        avatarPos.forEach(({ avatar, pos }) => {[m
[32m+[m[32m          if (pos === currentPos) {[m
[32m+[m[32m            updateLifeScore(avatar); // Réduire la vie de l'avatar si sa position correspond à la zone d'explosion[m
[32m+[m[32m          }[m
[32m+[m[32m        });[m
[32m+[m[32m      }[m
[32m+[m[32m    });[m
   }[m
 [m
   #boom(node) {[m
[31m-    node.textContent = "💥";[m
[31m-    this.#animateExplo(node, 25);[m
[32m+[m[32m    if (node.textContent != '🔥' && node.textContent != '☘' && node.textContent != '🚀') {[m
[32m+[m[32m      node.textContent = "💥";[m
[32m+[m[32m      this.#animateExplo(node);[m
[32m+[m[32m     /*  if (node.className == "x") {[m
[32m+[m[32m        node.textContent = "🔥"; // portee[m
[32m+[m[32m      } else if (node.className == "y") {[m
[32m+[m[32m        node.textContent = "☘"; // many[m
[32m+[m[32m      } else if (node.className == "z") {[m
[32m+[m[32m        node.textContent = "🚀"; // speed[m
[32m+[m[32m      } else {[m
[32m+[m[32m        node.textContent = "";[m
[32m+[m[32m      }[m
[32m+[m[32m      node.className = "c"; */[m
[32m+[m[32m    }[m
   }[m
 [m
[31m-  #animateExplo(node, taille) {[m
[31m-    taille += 5;[m
[31m-    node.style.fontSize = `${taille}px`;[m
[31m-    if (taille < 45) {[m
[31m-      requestAnimationFrame(() => {[m
[31m-        this.#animateExplo(node, taille);[m
[31m-      });[m
[31m-    } else {[m
[31m-      node.style.fontSize = "35px";[m
[32m+[m[32m  /*  #animateExplo(node) {[m
[32m+[m[32m     // Ajouter une transition CSS pour lisser l'animation de la taille[m
[32m+[m[32m     node.style.transition = 'font-size 0.05s ease-out'; // Transition fluide en 0.3s[m
[32m+[m[32m     node.style.fontSize = '45px'; // Taille finale après explosion[m
[32m+[m[41m   [m
[32m+[m[32m     // Attendre la fin de la transition[m
[32m+[m[32m     let timerout = setTimeout(() => {[m
[32m+[m[32m       node.style.fontSize = "35px"; // Taille normale après l'animation[m
[32m+[m[32m       node.style.transition = 'none'; // Réinitialiser la transition[m
[32m+[m[32m       // Gérer les changements de contenu selon la classe de l'élément[m
[32m+[m[32m       if (node.className == "x") {[m
[32m+[m[32m         node.textContent = "🔥"; // portee[m
[32m+[m[32m       } else if (node.className == "y") {[m
[32m+[m[32m         node.textContent = "☘"; // many[m
[32m+[m[32m       } else if (node.className == "z") {[m
[32m+[m[32m         node.textContent = "🚀"; // speed[m
[32m+[m[32m       } else {[m
[32m+[m[32m         node.textContent = "";[m
[32m+[m[32m       }[m
[32m+[m[32m       node.className = "c"; // Reset de la classe[m
[32m+[m[41m [m
[32m+[m[32m       clearTimeout(timerout); // Arrêter le timer[m
[32m+[m[32m     }, 50); // Durée correspondant à la transition CSS[m
[32m+[m[32m   } */[m
[32m+[m
[32m+[m[32m  #animateExplo(node) {[m
[32m+[m[32m    // Préparer le DOM à la modification de font-size pour améliorer les performances[m
[32m+[m[32m    // node.style.willChange = 'font-size';[m
[32m+[m
[32m+[m[32m    // Ajouter une transition CSS pour lisser l'animation de la taille[m
[32m+[m[32m    // node.style.transition = 'font-size 50ms ease-out'; // Transition fluide en 0.1s[m
[32m+[m[32m    // node.style.fontSize = '45px'; // Taille finale après explosion[m
[32m+[m
[32m+[m[32m    // Attendre la fin de la transition[m
[32m+[m[32m    let timeout = setTimeout(() => {[m
[32m+[m[32m      /* node.style.fontSize = "35px"; // Taille normale après l'animation[m
[32m+[m[32m      node.style.transition = 'none'; // Réinitialiser la transition après l'animation[m
[32m+[m[32m      node.style.willChange = 'auto'; // Réinitialiser will-change après l'animation */[m
[32m+[m
[32m+[m[32m      // Gérer les changements de contenu selon la classe de l'élément[m
       if (node.className == "x") {[m
         node.textContent = "🔥"; // portee[m
       } else if (node.className == "y") {[m
[36m@@ -147,9 +159,13 @@[m [mexport class Bomb {[m
       } else {[m
         node.textContent = "";[m
       }[m
[31m-      node.className = "c";[m
[31m-    }[m
[32m+[m[32m      node.className = "c"; // Reset de la classe[m
[32m+[m
[32m+[m[32m      clearTimeout(timeout); // Nettoyer le timeout[m
[32m+[m[32m    }, 50); // Durée correspondant à la transition CSS (en ligne avec transition)[m
   }[m
[32m+[m
[32m+[m
 }[m
 [m
 export default new Bomb();[m
[1mdiff --git a/client/src/interface/barreScore.js b/client/src/interface/barreScore.js[m
[1mindex 3f4ed2f..b6ef39e 100644[m
[1m--- a/client/src/interface/barreScore.js[m
[1m+++ b/client/src/interface/barreScore.js[m
[36m@@ -5,6 +5,7 @@[m
 import Actor from "../components/molecules/actor.js";[m
 import LifeAndActor from "../components/molecules/life.js";[m
 import timer from "../components/molecules/timer.js";[m
[32m+[m[32mimport gameState from "../core/state.js";[m
 [m
 // import { gameOver } from "./menuPause.js"[m
 [m
[1mdiff --git a/client/src/services/action.js b/client/src/services/action.js[m
[1mindex 4806c01..94e6698 100644[m
[1m--- a/client/src/services/action.js[m
[1m+++ b/client/src/services/action.js[m
[36m@@ -7,13 +7,10 @@[m [mconst actionOnAvatar = (data) => {[m
     const actionnedActor = players.find([m
         (player) => player.name === data.name[m
     );[m
[31m-    const avatarElement = document.querySelector([m
[31m-        `#avatar${actionnedActor.name ?? ""}`[m
[31m-    );[m
     if (data.content == " ") {[m
         boom.poserBomb(divs, actionnedActor.position(), actionnedActor);[m
     } else if ((data.content).includes("Arrow")) {[m
[31m-        actionnedActor.move(avatarElement, data.content, true);[m
[32m+[m[32m        actionnedActor.move(data.content);[m
         actionnedActor.takePowerUpSpeed();[m
         actionnedActor.takePowerUpBomb(boom);[m
     }[m
[1mdiff --git a/client/src/services/join.js b/client/src/services/join.js[m
[1mindex 3dd9a39..49fd42b 100644[m
[1m--- a/client/src/services/join.js[m
[1m+++ b/client/src/services/join.js[m
[36m@@ -67,7 +67,7 @@[m [mexport function joinRoomHandle(data) {[m
 [m
   // Affichage des avatars dans le waiting room[m
 [m
[31m-  let timer = setTimeout(() => {[m
[32m+[m[32m  let timerout = setTimeout(() => {[m
     main.elem.innerHTML = "";[m
 [m
     avatars.forEach((avatar) =>[m
[36m@@ -76,6 +76,6 @@[m [mexport function joinRoomHandle(data) {[m
     let lifeCpn = document.querySelectorAll('.avatars-representations')[m
     lifeCpn.forEach(element => element.remove());[m
     timer.elem.appendChild((new LifeAndActor(gameState.get("avatars").map(avatar => new Actor(avatar)))).render())[m
[31m-    clearTimeout(timer);[m
[32m+[m[32m    clearTimeout(timerout);[m
   }, 500);[m
 }[m
