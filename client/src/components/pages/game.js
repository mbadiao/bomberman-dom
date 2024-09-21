import gameState from "../../core/state.js";
import { ws } from '../../app.js';
import { grid } from "../grid.js";

const Game = () => {
    if (gameState.current.nickname === "") {
        window.location.hash = "/";
        return
    }
    const actors = gameState.get('avatars')
    grid();
    actors.forEach(actor => {
        actor.addAvatarInGrid(actor.name);
    });
}

export default Game;