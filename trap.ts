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


console.log(trap2Point([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log(trap2Point([4, 2, 0, 3, 2, 5]));
console.log(trap2Point([4, 2, 3]));


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