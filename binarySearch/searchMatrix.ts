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

// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3))


// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13))


// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 1))

console.log(searchMatrix([[1]], 2))