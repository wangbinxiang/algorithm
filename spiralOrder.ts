enum Direction {
  Right,
  Down,
  Left,
  Up
}
function spiralOrder(matrix: number[][]): number[] {
  // console.table(matrix);
  const m = matrix.length;
  const n = matrix[0].length;
  let top = 1;
  let bottom = m - 1;
  let left = 0;
  let right = n - 1;
  const count = m * n;
  let c = 0;
  let i = 0;
  let j = 0;
  const ans: number[] = [];
  let direction = Direction.Right;
  while (c < count) {
    ans.push(matrix[i][j]);
    if (direction === Direction.Right) {
      if (j < right) {
        j++
      } else if (j === right) {
        direction = Direction.Down;
        right--;
        i++;
      }
    } else if (direction === Direction.Down) {
      if (i < bottom) {
        i++;
      } else if (i === bottom) {
        direction = Direction.Left;
        j--;
        bottom--;
      }
    } else if (direction === Direction.Left) {
      if (j > left) {
        j--;
      } else if (j === left) {
        direction = Direction.Up;
        i--;
        left++;
      }
    } else if (direction === Direction.Up) {
      if (i > top) {
        i--;
      } else if (i === top) {
        direction = Direction.Right;
        j++;
        top++;
      }
    }

    c++;
  }
  return ans;
};


console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]));