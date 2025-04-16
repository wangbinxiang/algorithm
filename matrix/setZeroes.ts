/**
 Do not return anything, modify matrix in-place instead.
 */

//  给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

// m == matrix.length
// n == matrix[0].length
// 1 <= m, n <= 200
// -231 <= matrix[i][j] <= 231 - 1

function setZeroes(matrix: number[][]): void {
  const n = matrix[0].length;
  const m = matrix.length;


  let flagCol0 = false;


  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      flagCol0 = true;
    }
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
    if (flagCol0) {
      matrix[i][0] = 0;
    }
  }
};

function setZeroes1(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;
  console.log('m: ', m)
  console.log('n: ', n)
  let leftOne = false;
  if (matrix[0][0] === 0) {
    leftOne = true;
  } else {
    for (let i = 0; i < n; i++) {
      if (matrix[0][i] === 0) {
        leftOne = true;
        break;
      }
    }
  }

  // console.log('leftOne:', leftOne)

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`matrix[${i}][${j}]`)
      if (matrix[i][j] === 0) {

        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = 0
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (matrix[0][i] === 0) {
      for (let j = 1; j < m; j++) {
        matrix[j][i] = 0
      }
    }
  }

  if (leftOne) {
    for (let i = 0; i < n; i++) {
      matrix[0][i] = 0
    }
  }
}


function setZeroes2(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;

  let flagClo0 = false;
  let flagRow0 = false;

  for (let i = 0; i < n; i++) {
    if (matrix[0][i] === 0) {
      flagClo0 = true;
      break;
    }
  }

  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      flagRow0 = true;
      break;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0
      }
    }
  }


  if (flagClo0) {
    for (let i = 0; i < n; i++) {
      matrix[0][i] = 0
    }
  }

  if (flagRow0) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0
    }
  }
}

// 第一列用一个flag代替
// 剩下用每列第一行和每行第一列当作标记位
// 从最后一行开始向第一行遍历，行首或者列首为0时，则设置当前值为0

let arr1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
console.table(arr1);
setZeroes2(arr1);
console.table(arr1);

let arr2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]];
console.table(arr2);
setZeroes2(arr2);
console.table(arr2);


const arr3 = [[1], [0]];
console.table(arr3);
setZeroes2(arr3);
console.table(arr3);