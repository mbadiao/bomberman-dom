import titre from "../atoms/titre.js";
import entry from "../atoms/entry.js";
import end from "../atoms/end.js";
import logo from "../atoms/logo.js";




const EndGame = () => {

    let ok = false
    document.body.innerHTML = '';
    document.body.appendChild(entry.render())
    entry.elem.append(ok ? logo.render() : logo.render(), ok ? end.render() : end.render())
}

export default EndGame;