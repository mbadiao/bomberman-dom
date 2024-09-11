const worldElem = document.getElementById("world");

//-> Set Default Ratio
const WIDTH = 100;
const HEIGHT = 30;

export const scale = () => {
  let index;

  /* -> Set Scale Index based on Difference
    between Window Ratio & Default Ratio */
  innerWidth / innerHeight < WIDTH / HEIGHT
    ? (index = window.innerWidth / WIDTH)
    : (index = widow.innerHeight / HEIGHT);

  //-> Scale Window using resulting Index
  worldElem.style.width = `${WIDTH * index}px`;
  worldElem.style.height = `${HEIGHT * index}px`;
};
