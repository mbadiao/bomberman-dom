import { Avatar } from "../components/avatar.js";

export function joinRoomHandle(avatars, data) {
    if (data.playerCount <= 4) {
        let avatar;
        let names = (data.content).split("*");

        switch (avatars.length) {
            case 0:
                avatar = new Avatar(1, 1)
                console.log('data **** :>> ', name);
                avatar.name = name;
                avatar.addAvatarInGrid(name, "actor");
                break;
            case 1:
                avatar = new Avatar(13, 1)
                break;
            case 2:
                avatar = new Avatar(1, 11)
                break;
            case 3:
                avatar = new Avatar(13, 13)
                break;
            default:
                console.log("error in joinRoomHandle")
                break
        }

        avatars.push(avatar)

        return avatar
    }
}