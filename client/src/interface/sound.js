
function launch() {
    window.location.href = 'game.html';
}
function showHelp() {
    alert("Contrôles : Utilisez les touches directionnelles (haut, bas, gauche, droite) pour déplacer le personnage Bomberman à travers le niveau.\n Appuyez sur la touche espace pour placer une bombe à l'emplacement actuel de Bomberman.\n Utilisez la touche eschape pour une pause");
}


export function soundHome() {
    playSound("title-screen.mp3");

}
export function playSound(titleSound) {
    const audio = new Audio('../../../assets/soundEffect/' + titleSound);
    audio.play();

}

