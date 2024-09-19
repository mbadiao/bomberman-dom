import gameState from "../core/state.js";
import { Avatar } from "../components/atoms/avatar.js";
import { main } from "../components/orgarnisms/main.js";
import avartarCard from "../components/atoms/avatarCard.js";

export function joinRoomHandle(data) {
  const avatars = [];
  if (data.playerCount <= 4) {
    let avatar;
    let names = data.content.split("*");
    if (gameState.get("ownerName") === "") {
      gameState.set({ ownerName: names[data.playerCount - 1] });
    }
    names.map((name, i) => {
      if (name !== "") {
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
            console.log("error in joinRoomHandle");
            break;
        }
        avatar.name = name;
        avatars.push(avatar);
      }
    });

    gameState.set({ avatars: avatars });

    // Affichage des avatars dans le waiting room
    main.elem.innerHTML = "";
    avatars.forEach((avatar) =>
      main.elem.appendChild(new avartarCard(avatar.representation).render())
    );
  }
}
