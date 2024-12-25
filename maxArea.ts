function maxArea(height: number[]): number {
  let i = 0;
  let j = height.length - 1;
  let maxArea = 0;
  let area;
  while( i !== j) {
    area = Math.min(height[j] , height[i]) * (j - i);

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

// console.log(maxArea([1,8,6,2,5,4,8,3,7]))
console.log(maxArea([1,1]))