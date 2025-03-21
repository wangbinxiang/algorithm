// 先区分顺序区间和乱序区间
// 
function findMin(nums: number[]): number {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const m = ((right - left) >> 1) + left;
    const mVal = nums[m];
    console.log('left:', left, ' m:', m, ' right:', right)
    if (mVal > nums[right]) {
      left = m + 1;
    } else if (mVal < nums[left]) {
      right = m;
    } else {
      right = m - 1;
    }

  }
  return nums[left];
};

function findMin1(nums: number[]): number {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const m = ((right - left) >> 1) + left;
    const mVal = nums[m];
    console.log('left:', left, ' m:', m, ' right:', right)
    if (mVal > nums[right]) {
      left = m;
    } else {
      right = m - 1;
    }

  }
  return nums[left];
};


console.log(findMin([3, 4, 5, 1, 2]))
console.log(findMin([4, 5, 6, 7, 0, 1, 2]))
console.log(findMin([11, 13, 15, 17]))
console.log(findMin([5, 1, 2, 3, 4]))
