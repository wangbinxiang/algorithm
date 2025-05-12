// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

// 每行的元素从左到右升序排列。
// 每列的元素从上到下升序排列。

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= n, m <= 300
// -109 <= matrix[i][j] <= 109
// 每行的所有元素从左到右升序排列
// 每列的所有元素从上到下升序排列
// -109 <= target <= 109


function searchMatrix(matrix: number[][], target: number): boolean {


  let top = 0;
  let bottom = matrix.length - 1;

  while (top <= bottom) {
    // console.log('top:', top);
    // console.log('bottom:', bottom);
    const mid = ((bottom - top) >>> 1) + top
    // console.log('mid:', mid);
    const midVal = matrix[mid][0];
    if (target === midVal) {
      return true;
    } else if (target > midVal) {
      top = mid + 1;
    } else {
      bottom = mid - 1;
    }
  }

  console.log(top);
  if (top === 0) {
    return false
  }
  let left = 0;
  let right = matrix[0].length - 1;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const midVal = matrix[top - 1][mid];
    if (midVal === target) {
      return true;
    } else if (midVal < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }



  return false;
};


function searchMatrix1(matrix: number[][], target: number): boolean {
  let m = matrix.length;
  let n = matrix[0].length;
  let left = 0;
  let right = m * n - 1
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const midVal = matrix[Math.floor(mid / n)][mid % n];
    if (midVal === target) {
      return true;
    } else if (midVal > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }


  return false;
}

function searchMatrix2(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length
  let x = 0;
  let y = n - 1;
  while (x < m && y >= 0) {
    const val = matrix[x][y];
    if (val === target) {
      return true;
    }
    if (val > target) {
      y--;
    } else {
      x++;
    }
  }

  return false;
}


function searchMatrix3(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length
  let x = 0;
  let y = n - 1;
  //
  while (x < m && y >= 0) {
    const val = matrix[x][y];
    // console.log(`matrix[${x}][${y}]: ${matrix[x][y]}`)
    if (val === target) {
      return true;
    }
    if (val > target) {
      // y--;
      let start = 0;
      let end = y - 1;
      while (start <= end) {
        const half = Math.floor((start + end + 1) / 2);
        // console.log('half y:', half);
        // console.log('start y:', start);
        // console.log('end y:', end);
        if (matrix[x][half] === target) {
          return true;
        }
        if (matrix[x][half] > target) {
          if (matrix[x][half - 1] <= target) {
            y = half;
            break;
          } else {
            end = half - 1;
          }
        }

        if (matrix[x][half] < target) {
          start = half + 1;
        }
      }
      // console.log('y--')
      y--;
    } else {
      // x++;
      let start = x + 1;
      let end = m - 1;
      while (start <= end) {
        const half = Math.floor((start + end + 1) / 2);
        // console.log('half x:', half);
        // console.log('start x:', start);
        // console.log('end x:', end);
        // console.log('matrix[half][y]:', matrix[half][y]);
        if (matrix[half][y] === target) {
          return true;
        }
        if (matrix[half][y] <= target) {
          if (matrix[half - 1][y] > target) {
            x = half;
            break;
          } else {
            start = half + 1;
          }
        }

        if (matrix[half][y] > target) {
          end = half - 1;
        }
        // console.log('start---:', start);
        // console.log('end---:', end);
      }
      // start = x + 1
      // end = m - 1
      // console.log('x++')
      x++;
    }
  }

  return false;
}

console.log(searchMatrix3([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 5))

console.log(searchMatrix3([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 20))

console.log(searchMatrix3([[1, 4], [2, 5]], 2));