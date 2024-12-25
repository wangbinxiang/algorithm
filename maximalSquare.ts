function maximalSquare(matrix: string[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;
  let maximalSquare = 0;

  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === '1') {
      maximalSquare = 1;
      break;
    }
  }

  if (maximalSquare === 0) {
    for (let i = 0; i < n; i++) {
      if (matrix[0][i] === '1') {
        maximalSquare = 1;
        break;
      }
    }
  }


  for (let j = 1; j < n; j++) {
    for (let i = 1; i < m; i++) {
      if (matrix[i][j] === '1') {
        if (matrix[i - 1][j - 1] !== '0' && matrix[i - 1][j] !== '0' && matrix[i][j - 1] !== '0') {
          if (+matrix[i - 1][j - 1] >= 1 && +matrix[i - 1][j] >= 1 && +matrix[i][j - 1] >= 1) {
            if (matrix[i - 1][j - 1] === '1') {
              matrix[i][j] = '4';
              if (maximalSquare < 4) {
                maximalSquare = 4;
              }
            } else {
              const min = Math.min(+matrix[i - 1][j - 1], +matrix[i - 1][j], +matrix[i][j - 1])
              const sqrt = Math.sqrt(min) + 1;
              const sqrt2 = sqrt * sqrt;
              if (maximalSquare < sqrt2) {
                maximalSquare = sqrt2;
              }
              matrix[i][j] = sqrt2.toString();
            }
          } else {
            matrix[i][j] = '4';
            if (maximalSquare < 4) {
              maximalSquare = 4;
            }
          }
        } else if (maximalSquare === 0) {
          maximalSquare = 1;
        }
      }
    }
  }
  console.log(matrix);
  return maximalSquare;
};


function maximalSquare1(matrix: string[][]): number {
  let maxSideLength = 0
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        if (j === 0 || i === 0) {
          if (maxSideLength < 1) {
            maxSideLength = 1;
          }
        } else {
          const side = Math.min(+matrix[i - 1][j - 1], +matrix[i][j - 1], +matrix[i - 1][j]) + 1;
          matrix[i][j] = side.toString();
          if (side > maxSideLength) {
            maxSideLength = side;
          }
        }
      }
    }
  }
  console.log(matrix);



  return maxSideLength * maxSideLength;
}


const matrix = [["0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0"], ["0", "0", "0", "0", "1"], ["0", "0", "0", "0", "0"]];

console.log(maximalSquare1(matrix));