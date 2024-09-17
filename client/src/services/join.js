import { avatarsState, myAvatar } from "../app.js";
import { Avatar } from "../components/atoms/avatar.js";

export function joinRoomHandle(avatars, data) {
    avatars = [];
    if (data.playerCount <= 4) {
        let avatar;
        let names = (data.content).split("*");
        if (myAvatar.get('avatar') === null) {
            myAvatar.set({ avatar: names[data.playerCount - 1] });
        }
        names.map((name, i) => {
            if (name !== "") {
                switch (i) {
                    case 0:
                        avatar = new Avatar(1, 1)
                        avatar.representation = "💂🏿"
                        break;
                    case 1:
                        avatar = new Avatar(13, 1)
                        avatar.representation = "👷🏿"
                        break;
                    case 2:
                        avatar = new Avatar(1, 11)
                        avatar.representation = "🕵"
                        break;
                    case 3:
                        avatar = new Avatar(13, 11)
                        avatar.representation = "👮🏾"
                        break;
                    default:
                        console.log("error in joinRoomHandle")
                        break
                }
                avatar.name = name;
                avatars.push(avatar)
            }
        });
        avatarsState.set({ avatars: avatars });
    }
}