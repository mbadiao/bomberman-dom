import logo from "../atoms/logo.js";
import startBtn from "../atoms/startBtn.js";
import titre from "../atoms/titre.js";
import entry from "../atoms/entry.js";

const Home = () => {
    document.body.innerHTML = '';
    document.body.appendChild(entry.render())
    entry.elem.append(logo.render(), titre.render(), startBtn.render())
}

export default Home;