function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0]
  } else if (n === 2) {
    return Math.max(nums[0], nums[1])
  }
  const arr: number[] = []
  for (let i = 0; i < n; i++) {
    if (i < 2) {
      arr[i] = nums[i]
    } else if (i === 2) {
      arr[i] = arr[0] + nums[i]
    } else {
      arr[i] = Math.max(arr[i - 3], arr[i - 2]) + nums[i]
    }
  }
  return Math.max(arr[n - 2], arr[n - 1]);
};

function rob1(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0]
  } else if (n === 2) {
    return Math.max(nums[0], nums[1])
  }
  const arr: number[] = []
  arr[0] = nums[0]
  arr[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    arr[i] = Math.max(arr[i - 2] + nums[i], arr[i - 1])
  }
  return arr[n - 1];
};


function rob2(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0]
  } else if (n === 2) {
    return Math.max(nums[0], nums[1])
  }
  const arr: number[] = []
  arr[0] = nums[0]
  arr[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    const max = Math.max(arr[0] + nums[i], arr[1])
    arr[0] = arr[1]
    arr[1] = max;
  }
  return arr[1];
};

console.log(rob2([1, 2, 3, 1]))
console.log(rob2([2, 7, 9, 3, 1]))