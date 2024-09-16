export function ajoutPowersUp() { // REVIEW: Has nothing to do in `components/`.
    const murs = document.querySelectorAll('.m')
    murs[0].dataset.powerUp = 'bombe'
    for (let i = 0; i < 5; i++) {
        murs[Math.floor(Math.random()*(murs.length-1))+1].dataset.powerUp = 'bombe'
    }
}