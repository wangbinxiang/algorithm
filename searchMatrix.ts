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

console.log(searchMatrix1([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3))

console.log(searchMatrix1([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13))