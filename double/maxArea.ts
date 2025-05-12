function maxArea(height: number[]): number {
  let i = 0;
  let j = height.length - 1;
  let maxArea = 0;
  let area;
  while (i !== j) {
    area = Math.min(height[j], height[i]) * (j - i);

    if (height[i] > height[j]) {

    }

    if (area > maxArea) {
      maxArea = area
    }
    if (height[i] > height[j]) {
      j--;
    } else {
      i++
    }
  }
  return maxArea;
};


function maxArea1(height: number[]): number {
  const n = height.length;
  let ans = 0;
  let l = 0;
  let r = n - 1;

  // console.log('n', n)
  while (l < r) {
    const heightL = height[l];
    const heightR = height[r];
    // console.log('l', l, heightL)
    // console.log('r', r, heightR)
    const area = Math.min(heightL, heightR) * (r - l);
    // console.log('area:', area);
    ans = Math.max(ans, area);
    if (heightL < heightR) {
      l++;
    } else {
      r--;
    }
  }

  return ans
}

console.log(maxArea1([1, 8, 6, 2, 5, 4, 8, 3, 7]))
console.log(maxArea1([1, 1]))