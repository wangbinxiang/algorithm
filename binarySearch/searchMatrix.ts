// 给你一个满足下述两条属性的 m x n 整数矩阵：

// 每行中的整数从左到右按非严格递增顺序排列。
// 每行的第一个整数大于前一行的最后一个整数。
// 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。


export function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length
  const n = matrix[0].length

  let t = 0
  let b = m - 1
  while (t <= b) {
    const mid = Math.floor((t + b) / 2)
    const num = matrix[mid][n - 1]
    console.log('num:', num)
    if (num === target) {
      return true
    } else if (num < target) {
      t = mid + 1
    } else {
      b = mid - 1
    }
  }

  console.log(t)
  if (t >= m) {
    return false
  }

  let l = 0
  let r = n - 1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    const num = matrix[t][mid]
    console.log('mid num:', num)
    if (num === target) {
      return true
    } else if (num < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }

  console.log(t, b)

  return false
};

function searchMatrix1(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  let l = 0;
  let r = m - 1;

  let index = -1;
  while (l <= r) {
    const mid = Math.floor((r - l) / 2) + l;
    const num = matrix[mid][n - 1];
    if (num === target) {
      return true;
    } else if (num < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  if (l >= m) {
    return false;
  }

  let i = 0;
  let j = n - 1;
  while (i <= j) {
    const mid = Math.floor((j - i) / 2) + i;
    const num = matrix[l][mid];
    if (target === num) {
      return true;
    } else if (num > target) {
      j = mid - 1;
    } else {
      i = mid + 1
    }
  }



  // console.log('l: ', l)
  // console.log('r: ', r)
  // console.log('index: ', index)

  return false;
};

// 因为严格的递增性，所以可以看出一维数组
function searchMatrix2(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  let l = 0;
  let r = m * n - 1;

  while (l <= r) {
    const mid = Math.floor((r - l) / 2) + l;
    const num = matrix[Math.floor(mid / n)][mid % n];
    // console.log("num:", num, mid);
    if (num === target) {
      return true;
    } else if (num > target) {
      r = mid - 1;

    } else {
      l = mid + 1;
    }
  }

  return false;
};


function searchMatrix3(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  const total = m * n;
  let l = 0;
  let r = total - 1;
  while (l <= r) {
    const mid = Math.floor((r - l) >> 1) + l;
    const num = matrix[Math.floor(mid / n)][mid % n];
    if (num === target) {
      return true;
    } else if (num < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return false;
};

console.log(searchMatrix4([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)) // true


console.log(searchMatrix4([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13)) // false


console.log(searchMatrix4([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 1)) // true


function searchMatrix4(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  const total = m * n;

  let l = 0;
  let r = total - 1;
  while (l <= r) {
    const mid = Math.floor((r - l) >> 1) + l;
    // console.log('Math.floor(total / mid):', Math.floor(mid / n), total, mid, m, matrix[Math.floor(mid / m)]);
    const num = matrix[Math.floor(mid / n)][Math.floor(mid % n)];
    if (num === target) {
      return true;
    } else if (num > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return false;
};

console.log(searchMatrix4([[1]], 2)) // false

console.log(searchMatrix4([[1, 1]], 2)) // false