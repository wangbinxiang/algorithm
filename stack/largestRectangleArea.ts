function largestRectangleArea(heights: number[]): number {
  let ans = 0;
  const stack: number[] = [];
  const n = heights.length;

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      const currentHeight = heights[stack.pop()!];
      while (stack.length > 0 && heights[stack[stack.length - 1]] === currentHeight) {
        stack.pop();
      }
      let currentWidth
      if (stack.length === 0) {
        currentWidth = i
      } else {
        currentWidth = i - stack[stack.length - 1] - 1;
      }
      ans = Math.max(ans, currentHeight * currentWidth)
    }
    stack.push(i)
  }
  while (stack.length > 0) {
    const currentHeight = heights[stack.pop()!]
    while (stack.length > 0 && currentHeight === heights[stack[stack.length - 1]]) {
      stack.pop()
    }
    let currentWidth
    if (stack.length === 0) {
      currentWidth = n
    } else {
      currentWidth = n - stack[stack.length - 1] - 1
    }
    console.log('currentHeight:', currentHeight)
    console.log('currentWidth:', currentWidth)
    ans = Math.max(ans, currentHeight * currentWidth)
  }

  return ans;
};

function largestRectangleArea1(heights: number[]): number {
  let ans = 0;
  const stack: number[] = [];
  const copyHeights = [0, ...heights, 0];
  const n = copyHeights.length
  stack.push(0);
  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && copyHeights[i] < copyHeights[stack[stack.length - 1]]) {
      const currentHeight = copyHeights[stack.pop()!]
      while (stack.length > 0 && currentHeight === copyHeights[stack[stack.length - 1]]) {
        stack.pop()
      }
      let currentWidth = i;
      if (stack.length > 0) {
        currentWidth = i - stack[stack.length - 1] - 1
      }
      // console.log(stack)
      // console.log('currentHeight:', currentHeight)
      // console.log('currentWidth:', currentWidth)
      ans = Math.max(ans, currentHeight * currentWidth);
    }
    stack.push(i)
  }

  return ans;
}

// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
function largestRectangleArea2(heights: number[]): number {
  let ans = 0
  let minHeight = heights[0]
  const stack: number[] = [0]
  const len = heights.length
  let left = 0
  let right = 0
  let maxArea = heights[0]

  for (let i = 1; i < len; i++) {






  }

  return ans
}

console.log(largestRectangleArea1([2, 1, 5, 6, 2, 3]))
console.log(largestRectangleArea1([2, 4]))
console.log(largestRectangleArea1([2, 0, 2]))

