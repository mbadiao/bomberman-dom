import gameState from "../core/state.js";
import { Avatar } from "../components/molecules/avatar.js";
import { main } from "../components/orgarnisms/main.js";
import avartarCard from "../components/molecules/avatarCard.js";
import timer from "../components/molecules/timer.js";
import LifeAndActor from "../components/molecules/life.js";
import Actor from "../components/molecules/actor.js";

export function joinRoomHandle(data) {
  const avatars = []; // OPTIMIZE: Already in game state...
  if (data.playerCount > 4) {
    return
  }

  let avatar;
  let names = data.content.split("*");
  
  
  if (gameState.get("nickname") === "") {
    gameState.set({nickname: data.name});
    console.log('data.name :>> ', data.name);
  }

  names.map((name, i) => {
    if (name === "") {
      return
    }

    switch (i) {
      case 0:
        avatar = new Avatar(1, 1);
        avatar.representation = "💂🏿";
        break;
      case 1:
        avatar = new Avatar(13, 1);
        avatar.representation = "👷🏿";
        break;
      case 2:
        avatar = new Avatar(1, 11);
        avatar.representation = "🕵";
        break;
      case 3:
        avatar = new Avatar(13, 11);
        avatar.representation = "👮🏾";
        break;
      default:
        console.error("Error: Too many players");
        break;
    }

    avatar.name = name; // REVIEW: Use game state in one line instead...
    avatars.push(avatar);
  });

  let me = avatars.find((avatar) => avatar.name === gameState.get("nickname"));

  gameState.set({
    avatars: avatars,
    playerCount: avatars.length,
    error: '',
    avatar: me,
  });

  if (gameState.get('error') === '') {
    window.location.hash = "/room";
  }

  // Affichage des avatars dans le waiting room

  let timer = setTimeout(() => {
    main.elem.innerHTML = "";

    avatars.forEach((avatar) =>
      main.elem.appendChild(new avartarCard(avatar.representation).render())
    );
    let lifeCpn = document.querySelectorAll('.avatars-representations')
    lifeCpn.forEach(element => element.remove());
    timer.elem.appendChild((new LifeAndActor(gameState.get("avatars").map(avatar => new Actor(avatar)))).render())
    clearTimeout(timer);
  }, 500);
}
