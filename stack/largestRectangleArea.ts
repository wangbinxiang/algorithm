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
  const stack: number[] = [0]
  // heights.push(0)
  heights.unshift(0)
  const len = heights.length

  let maxArea = heights[0]
  // 使用一个栈结构
  // 栈底放一个哨兵
  // 0 如果，正常数据都是大于0的
  // 
  for (let i = 1; i < len; i++) {
    // 获取当前数字， heights[i], 
    // 比较栈顶，
    // 如果大于栈顶则将该值压入栈
    // 如果等于栈顶 则不处理进入下次循环
    // 如果小于栈顶 则开始获取栈顶到当前值位置的宽度，然后乘以栈顶数据的高度，获取面积
    // 如此循环
    // 如果循环完成栈内还有数字，则进行下一步处理
    // 最小的数字会在最后进入栈
    let topVal: number = 0
    // console.log('i:', i)
    const currentVal = heights[i]
    // console.log('currentVal:', currentVal)
    while (stack.length > 1) {
      let top = stack[stack.length - 1]
      // console.log('top:', top)
      if (top >= 0) {
        topVal = heights[top]
        // console.log('topVal:', topVal)
        if (topVal === currentVal) {
          break
        }
        if (topVal > currentVal) {
          let width = i - 1
          // console.log('stack.length:', stack.length, stack)
          if (stack.length > 1) {
            width = i - stack[stack.length - 2] - 1
          }
          // console.log('width:', width)
          const area = topVal * width
          if (area > maxArea) {
            maxArea = area
          }
          stack.pop()
        } else {
          break;
        }
      }
    }
    stack.push(i)
  }
  // console.log(stack)
  if (stack.length > 0) {
    const head = stack[stack.length - 1]
    while (stack.length > 0) {
      const top = stack.pop()!
      const height = heights[top]
      let width = heights.length - 1
      if (stack.length > 0) {
        width = head - stack[stack.length - 1]
      }
      // console.log('top:', top)
      // console.log('width:', width)
      // console.log('height:', height)
      // console.log('height * width:', height * width)
      maxArea = Math.max(maxArea, height * width)
    }
  }

  return maxArea
}


function largestRectangleArea3(heights: number[]): number {
  const stack: number[] = [0]
  let ans = 0
  const n = heights.length
  for (let i = 1; i < n; i++) {
    while (stack.length > 0) {
      const top = stack[stack.length - 1]
      const topVal = heights[top]
      const currentHeight = heights[i]
      if (topVal > currentHeight) {
        let width = i
        if (stack.length > 1) {
          width = i - stack[stack.length - 2] - 1
        }
        // console.log('width:', width)
        // console.log('height:', topVal)
        const area = width * topVal
        ans = Math.max(area, ans)
        stack.pop()
      } else {
        break
      }
    }
    stack.push(i)
  }

  // console.log(stack)

  const top = stack[stack.length - 1]
  while (stack.length > 1) {
    const current = stack.pop()
    const width = top - stack[stack.length - 1]
    const area = width * heights[current]
    // console.log(area, width, heights[current])
    ans = Math.max(area, ans)
  }

  // console.log(stack)
  const area = heights.length * heights[stack[0]]
  ans = Math.max(area, ans)

  // console.log(stack)
  return ans
}


function largestRectangleArea4(heights: number[]): number {
  let ans = 0
  // 增加前后哨兵
  const copyHeight = [0, ...heights, 0]
  const stack: number[] = [0]
  const n = copyHeight.length
  for (let i = 0; i < n; i++) {
    if (stack.length > 0) {
      const currentHeight = copyHeight[i]
      while (currentHeight < copyHeight[stack[stack.length - 1]]) {
        const topHeight = copyHeight[stack.pop()!]
        let width = i
        if (stack.length > 0) {
          width = i - stack[stack.length - 1] - 1
        }
        ans = Math.max(ans, width * topHeight)
      }
    }
    stack.push(i)
  }
  return ans
}


function largestRectangleArea7(heights: number[]): number {
  const stack: number[] = [-1];
  let ans = -Infinity;
  for (let i = 0; i < heights.length; i++) {
    const num = heights[i];
    while (stack.length > 1) {
      const top = stack[stack.length - 1];
      if (heights[top] > num) {
        // 弹出top
        stack.pop();
        const width = i - stack[stack.length - 1] - 1;
        const height = heights[top];
        const area = width * height;
        if (area > ans) {
          ans = area;
        }
      } else {
        break;
      }
    }
    stack.push(i);
  }
  const latest = stack[stack.length - 1];
  for (let i = 1; i < stack.length; i++) {
    const width = latest - stack[i - 1];
    const height = heights[stack[i]]
    const area = width * height;
    if (area > ans) {
      ans = area;
    }
  }

  return ans;
};


function largestRectangleArea8(heights: number[]): number {
  const stack: number[] = [-1];
  let ans = -Infinity;

  for (let i = 0; i < heights.length; i++) {
    // console.log('i:', i);
    while (stack.length > 1) {
      const top = stack[stack.length - 1];
      const num = heights[top];
      if (num > heights[i]) {
        stack.pop();
        const height = num;
        const width = i - stack[stack.length - 1] - 1;
        const area = width * height;
        // console.log('area:', area, width, height, top);
        if (area > ans) {
          ans = area;
        }
      } else {
        break;
      }
    }
    stack.push(i);
  }

  // console.log(stack);
  const latest = stack[stack.length - 1];
  for (let i = stack.length - 1; i > 0; i--) {
    const height = heights[stack[i]];
    const width = latest - stack[i - 1];
    const area = width * height;

    console.log('area:', area, width, height, stack[i], stack[i - 1]);
    if (area > ans) {
      ans = area;
    }
  }

  return ans;
};


function largestRectangleArea9(heights: number[]): number {
  // 哨兵
  let maxArea = 0;
  const stack: number[] = [-1];
  const n = heights.length;
  for (let i = 0; i < n; i++) {
    const val = heights[i];
    while (stack.length > 1) {
      const top = stack[stack.length - 1];
      const topVal = heights[top];
      if (topVal > val) {
        stack.pop();
        const width = i - stack[stack.length - 1] - 1;
        const height = topVal;
        const area = width * height;
        if (area > maxArea) {
          maxArea = area;
        }
      } else {
        break;
      }
    }
    stack.push(i);
  }

  console.log(stack);
  const latest = stack[stack.length - 1];
  while (stack.length > 1) {
    const top = stack.pop();
    const height = heights[top];
    console.log("height:", height);
    const width = latest - stack[stack.length - 1];
    console.log("width:", width);
    const area = width * height;
    if (area > maxArea) {
      maxArea = area;
    }
  }


  return maxArea;
};


function largestRectangleArea10(heights: number[]): number {
  // 哨兵
  let maxArea = 0;
  const stack: number[] = [-1];
  heights.push(0);
  const n = heights.length;
  for (let i = 0; i < n; i++) {
    const val = heights[i];
    while (stack.length > 1) {
      const top = stack[stack.length - 1];
      const topVal = heights[top];
      if (topVal > val) {
        stack.pop();
        const width = i - stack[stack.length - 1] - 1;
        const height = topVal;
        const area = width * height;
        if (area > maxArea) {
          maxArea = area;
        }
      } else {
        break;
      }
    }
    stack.push(i);
  }
  return maxArea;
};

// console.log(largestRectangleArea9([2, 1, 5, 6, 2, 3])) // 10
// console.log(largestRectangleArea7([2, 4]))
// console.log(largestRectangleArea7([2, 0, 2]))
// console.log(largestRectangleArea8([2, 1, 2]))
// console.log(largestRectangleArea9([4, 2, 0, 3, 2, 5])) // 6
// console.log(largestRectangleArea7([0, 9]))
// console.log(largestRectangleArea7([0]))
// console.log(largestRectangleArea8([999, 999, 999, 999])) // 3996
// console.log(largestRectangleArea8([1, 2, 3, 4, 5])) // 9

console.log(largestRectangleArea9([5, 4, 1, 2])) // 8
// console.log(largestRectangleArea8([0])) // 0

