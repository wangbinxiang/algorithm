function trap(height: number[]): number {
  let i = 0;
  let n = height.length;
  let totalArea = 0;
  while (i < n) {
    if (height[i] === 0) {
      ++i;
      continue;
    }
    let j = i + 1;
    const innerHeight: number[] = [];
    while (j < n) {
      if (height[j] < height[i]) {
        innerHeight.push(height[j]);
        ++j;
        if (j === n) {

        }
      } else {
        const width = j - i - 1;
        let count = 0;
        innerHeight.forEach(item => count += item);
        console.log('innerHeight:', innerHeight);
        console.log('j:', j, ', i:', i);
        console.log('height[i]:', height[i]);
        let area = width * height[i] - count;
        console.log('area:', area);
        totalArea += area;
        i = j;
        break;
      }
    }
    if (j === n) {
      ++i;
    }
    // ++i;
    // console.log('j:', j, ', i:', i);
  }
  return totalArea;
};




function trap1(height: number[]): number {
  let i = 0;
  let n = height.length;
  let totalArea = 0;
  while (i < n) {
    if (height[i] === 0) {
      ++i;
      continue;
    }
    let j = i + 1;
    let maxHeight = -1;
    while (j < n) {
      if (maxHeight === -1) {
        maxHeight = j;
      } else if (height[j] >= height[maxHeight]) {
        maxHeight = j
      }

      if (height[j] >= height[i] || j + 1 === n) {
        const width = maxHeight - i - 1;
        console.log('height[maxHeight]:', height[maxHeight], ', i:', i);
        console.log('width:', width);
        let count = 0;
        for (let k = i + 1; k < maxHeight; k++) {
          count += height[k];
        }
        console.log('count:', count);
        const h = Math.min(height[i], height[maxHeight]);
        console.log('h:', h);
        const area = width * h - count;
        console.log('area:', area);
        totalArea += area;
        i = maxHeight;
        break;
      }
      j++;
    }
    if (j === n) {
      ++i;
    }
    // ++i;
    // console.log('j:', j, ', i:', i);
  }
  return totalArea;
};



function trap2(height: number[]): number {
  const n = height.length;
  if (n === 0) {
    return 0;
  }
  const leftMax: number[] = Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }
  const rightMax: number[] = Array(n).fill(0);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }
  console.log(leftMax);
  console.log(rightMax);
  let ans = 0;
  for (let i = 0; i < n; ++i) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return ans;
};

function trap3(height: number[]) {
  const n = height.length;
  if (n == 0) {
    return 0;
  }

  const leftMax = new Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; ++i) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; --i) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }
  let ans = 0;
  for (let i = 0; i < n; ++i) {
    const a = Math.min(leftMax[i], rightMax[i]) - height[i];
    console.log(i, a);
    ans += a;
  }
  return ans;
};


function trap4(height: number[]): number {
  let ans = 0;
  const stack: number[] = [];
  const n = height.length;
  for (let i = 0; i < n; i++) {
    if (stack.length === 0) {
    } else {
      if (height[i] <= height[stack[stack.length - 1]]) {

      } else {
        while (height[i] > height[stack[stack.length - 1]]) {
          if (stack.length > 1) {
            const l = stack.length;
            const top = stack[l - 1];
            const left = stack[l - 2];
            const width = i - left - 1;
            const h = Math.min(height[left], height[i]) - height[top];
            const area = h * width;
            ans += area;
          }
          stack.pop()
        }
      }
    }
    stack.push(i);
  }


  return ans;
}

function trap5(height: number[]): number {
  let ans = 0;
  const n = height.length;
  const stack: number[] = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop() as number;
      if (stack.length === 0) {
        break;
      }
      const left = stack[stack.length - 1];
      const w = i - left - 1;
      const h = Math.min(height[left], height[i]) - height[top];
      const area = w * h;
      console.log(`${w} * ${h} = ${area}`)
      ans += area;
    }
    stack.push(i);
  }

  return ans;
}


function trapStack(height: number[]): number {
  let ans = 0;
  const n = height.length;
  const stack: number[] = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop() as number;
      if (stack.length === 0) {
        break;
      }
      const left = stack[stack.length - 1];
      const w = i - left - 1;
      const h = Math.min(height[left], height[i]) - height[top];
      const area = w * h;
      ans += area;
    }
    stack.push(i);
  }

  return ans;
}

function trap2Point(height: number[]): number {
  let ans = 0;
  const n = height.length;
  let left = 0;
  let right = n - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  while (left < right) {
    leftMax = Math.max(height[left], leftMax);
    rightMax = Math.max(height[right], rightMax);
    if (height[left] < height[right]) {
      const a = leftMax - height[left];
      ans += a;
      ++left;
    } else {
      const a = rightMax - height[right];
      ans += a;
      --right;
    }
  }
  return ans
}

function trap2Point2(height: number[]): number {
  let ans = 0;
  const n = height.length;
  let left = 0;
  let right = n - 1;
  let leftMax = height[0];
  let rightMax = height[right];
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);
    if (height[left] < height[right]) {
      ans += leftMax - height[left];
      ++left;
    } else {
      ans += rightMax - height[right];
      --right;
    }
  }


  return ans;
}

function trapNext(height: number[]): number {
  let ans = 0;
  const n = height.length;
  let lMax = 0;
  let rMax = n - 1;
  let l = lMax + 1;
  let r = rMax - 1;
  while (l <= r && lMax < rMax) {
    l = lMax + 1;
    r = rMax - 1;
    // console.log('lMax:', lMax)
    // console.log('rMax:', rMax)
    // console.log('l:', l)
    // console.log('r:', r)
    if (height[lMax] < height[rMax]) {
      const max = height[lMax];
      while (l <= r) {
        const res = max - height[l];
        if (res > 0) {
          ans += res;
          l++
        } else if (res === 0) {
          l++
        } else {
          lMax = l;
          break;
        }
      }
    } else {
      const max = height[rMax];
      while (l <= r) {
        const res = max - height[r];
        if (res > 0) {
          ans += res;
          r--
        } else if (res === 0) {
          r--
        } else {
          rMax = r;
          break;
        }
      }
    }
  }

  return ans;
}

function trap6(height: number[]): number {
  const n = height.length;
  let ans = 0

  let l = 0;
  let r = n - 1;
  while (l < r) {
    if (height[l] > height[r]) {
      let t = r - 1;
      while (height[t] <= height[r]) {
        if (height[t] < height[r]) {
          ans += height[r] - height[t];
        }
        t--
      }
      r = t
    } else {
      let t = l + 1;
      while (height[t] <= height[l]) {
        if (height[t] < height[l]) {
          ans += height[l] - height[t];
        }
        t++
      }
      l = t;
    }
  }

  return ans
}

function trap7(height: number[]): number {
  let ans = 0
  // 双指针，最左和最右
  let left = 0
  let right = height.length - 1
  while (left < right) {
    if (height[left] <= height[right]) {
      let i = left + 1
      for (; i < right; i++) {
        if (height[i] < height[left]) {
          ans += height[left] - height[i]
        } else if (height[i] === height[left]) {
          continue
        } else {
          break
        }
      }
      left = i
    } else {
      let i = right - 1
      for (; i > left; i--) {
        if (height[i] < height[right]) {
          ans += height[right] - height[i]
        } else if (height[i] === height[right]) {
          continue
        } else {
          break
        }
      }
      right = i
    }
  }
  return ans
}

function trapStack1(height: number[]): number {
  let ans = 0
  const n = height.length
  const stack: number[] = [0]
  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop()
      if (stack.length === 0) {
        break
      }

      const left = stack[stack.length - 1]

      const currentWidth = i - left - 1
      const currentHeight = Math.min(height[i], height[left]) - height[top]
      ans += currentHeight * currentWidth
    }
    stack.push(i)
  }


  return ans
}


function trapDP(height: number[]): number {
  let ans = 0
  const n = height.length
  const leftMax: number[] = [height[0]]
  const rightMax: number[] = []
  rightMax[n - 1] = height[n - 1]
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1])
  }

  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1])
  }

  for (let i = 1; i < n - 1; i++) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i]
  }



  return ans
}


// dp模式

// 找个每个位置 左边最高位置和右边最高位置
// 左右两边最低的点减去当前点就是当前点接水量

function trapDP1(height: number[]): number {
  let ans = 0
  const n = height.length
  const leftMax: number[] = [height[0]]
  const rightMax: number[] = Array(n).fill(0)
  rightMax[n - 1] = height[n - 1]

  for (let i = 1; i < n - 1; i++) {
    if (leftMax[i - 1] > height[i]) {
      leftMax[i] = leftMax[i - 1]
    } else {
      leftMax[i] = height[i]
    }
  }

  for (let i = n - 2; i > 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }

  for (let i = 1; i < n - 1; i++) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i]
  }


  return ans;
}

// stack模式
// 单调栈模式，栈顶比当前值小时，弹出栈顶，栈顶可接水高度是当前值和栈顶左边值大最小值，长度是当前值位置减去栈顶左边值位置再减1

function trapStack2(height: number[]): number {
  let ans = 0;
  const n = height.length
  const stack: number[] = [0]
  for (let i = 1; i < n; i++) {
    const current = height[i]
    while (stack.length > 0 && current > height[stack[stack.length - 1]]) {
      const top = stack.pop()
      if (stack.length === 0) {
        break
      }
      const left = stack[stack.length - 1]
      const currentHeight = Math.min(height[left], current) - height[top]
      const currentWidth = i - left - 1
      ans += currentHeight * currentWidth
    }
    stack.push(i)
  }



  return ans;
}





// 双指针模式
// 左右两边各放一个指针
function trap8(height: number[]): number {
  let ans = 0;
  const n = height.length
  let l = 0
  let r = n - 1
  while (l < r) {
    if (height[l] < height[r]) {
      let i = l + 1
      while (i < r) {
        if (height[i] > height[l]) {
          break
        } else {
          ans += height[l] - height[i]
        }
        i++
      }
      l = i
    } else {
      let i = r - 1
      while (l < i) {
        if (height[i] > height[r]) {
          break;
        } else {
          ans += height[r] - height[i]
        }
        i--;
      }
      r = i
    }
  }



  return ans;
}

function trap9(height: number[]): number {
  let ans = 0
  let l = 0
  let r = height.length - 1
  while (l < r) {
    if (height[l] < height[r]) {
      let i = l + 1
      while (height[i] < height[l]) {
        ans += height[l] - height[i]
        i++
      }
      l = i
    } else {
      let i = r - 1
      while (height[i] < height[r]) {
        ans += height[r] - height[i]
        i--
      }
      r = i
    }
  }
  return ans
}

function trapStack3(height: number[]): number {
  let ans = 0
  let stack: number[] = [0]
  const n = height.length;
  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && height[stack[stack.length - 1]] < height[i]) {
      const top = stack.pop()
      if (stack.length === 0) {
        break
      }
      const left = stack[stack.length - 1]
      const currentWidth = i - left - 1
      const currentHeight = Math.min(height[i], height[left]) - height[top]
      ans += currentHeight * currentWidth
    }
    stack.push(i)
  }

  return ans
}

console.log(trapStack3([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log(trapStack3([4, 2, 0, 3, 2, 5]));
console.log(trapStack3([4, 2, 3]));
