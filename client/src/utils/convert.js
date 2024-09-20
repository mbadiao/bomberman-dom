export default function matrixToAscii(matrix) {
  let asciiMatrix = [];

  for (let row of matrix) {
    let asciiRow = []; 
    for (let col of row) {
      asciiRow.push(String.fromCharCode(col)); 
    }
    asciiMatrix.push(asciiRow);
  }

  return asciiMatrix;
}
