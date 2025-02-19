/**
 Do not return anything, modify matrix in-place instead.
 */
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

// 第一列用一个flag代替
// 剩下用每列第一行和每行第一列当作标记位
// 从最后一行开始向第一行遍历，行首或者列首为0时，则设置当前值为0

let arr1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
console.table(arr1);
setZeroes(arr1);
console.table(arr1);

let arr2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]];
console.table(arr2);
setZeroes(arr2);
console.table(arr2);