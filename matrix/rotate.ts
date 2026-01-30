// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

// n == matrix.length == matrix[i].length
// 1 <= n <= 20
// -1000 <= matrix[i][j] <= 1000


// 还可以用水平反转+主对角线反转
function rotate(matrix: number[][]): void {
  const n = matrix.length;
  const m = Math.floor(n / 2);

  // console.log('n:', n);
  // console.log('m:', m);

  for (let i = 0; i < m; i++) {
    for (let j = i; j < n - i - 1; j++) {
      let tmp1: number = matrix[j][n - 1 - i];
      // console.log('tmp1:', `matrix[${j}][${n} - 1 - ${i}]`, matrix[j][n - 1 - i])
      matrix[j][n - 1 - i] = matrix[i][j];
      let tmp2 = matrix[n - 1 - i][n - 1 - j];
      // console.log('tmp2:', `matrix[${n} - 1 - ${i}][${n} - 1 - ${j}]`, matrix[n - 1 - i][n - 1 - j])
      matrix[n - 1 - i][n - 1 - j] = tmp1;
      tmp1 = matrix[n - 1 - j][i];
      // console.log('tmp1:', `matrix[${n} - 1 - ${j}][${i}]`, matrix[n - 1 - j][i])
      matrix[n - 1 - j][i] = tmp2;
      matrix[i][j] = tmp1

      // console.table(matrix)

      // matrix[0][0] // matrix[i][j] // matrix[i][j]
      // matrix[0][n - 1] // matrix[j][n - 1]
      // matrix[n - 1][n - 1] // matrix[n - 1][n - 1 - j]
      // matrix[n - 1][0] // matrix[n - 1 - j][i]
      // matrix[0][0] // matrix[i][j]
    }
  }
};



function rotate2(matrix: number[][]): void {
  const n = matrix.length;
  let l = 0;
  let r = n - 1;

  while (l < r) {
    for (let i = 0; i < r - l; i++) {
      let tmp = matrix[l + i][r];
      matrix[l + i][r] = matrix[l][l + i];
      let tmp2 = matrix[r][r - i];
      matrix[r][r - i] = tmp;
      let tmp3 = matrix[r - i][l];
      matrix[r - i][l] = tmp2;
      matrix[l][l + i] = tmp3;
    }
    l++;
    r--;
  }
};


// const arr11 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// console.table(arr11)
// rotate(arr11)

// console.table(arr11)


const arr22 = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
console.table(arr22)
rotate2(arr22)
console.table(arr22)