import gameState, {  avatarsState, ws } from "../../app.js";
import { grid } from "../grid.js";

const Game = () => {
    if (gameState.current.nickname === "") {
        window.location.hash = "/";
        return
    }

    console.log('actors :>> ', avatarsState.get('avatars'));
    const actors = avatarsState.get('avatars')
    grid();
    actors.forEach(actor => {
        actor.addAvatarInGrid(actor.name);
    });
}

export default Game;