function maxProduct(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  let ans = -Infinity;
  let n = nums.length;
  const dp = Array(n);
  dp[0] = nums[0];
  for (let i = 1; i < n; i++) {
    // console.log(nums[i])
    dp[i] = Math.max(dp[i - 1] * nums[i], nums[i - 1] * nums[i], nums[i]);
    ans = Math.max(ans, dp[i])
  }
  // console.log(dp)
  return ans
};

function maxProduct1(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  let ans = nums[0];
  let n = nums.length;
  const dpMax = Array(n);
  const dpMin = Array(n);
  dpMax[0] = nums[0];
  dpMin[0] = nums[0];
  for (let i = 1; i < n; i++) {
    const val1 = dpMax[i - 1] * nums[i];
    const val2 = dpMin[i - 1] * nums[i];
    const max = Math.max(val1, val2, nums[i]);
    const min = Math.min(val1, val2, nums[i]);
    dpMax[i] = max;
    dpMin[i] = min;
    ans = Math.max(ans, max)
  }
  return ans
};

function maxProduct2(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  let ans = nums[0];
  let n = nums.length;
  let preMax = nums[0];
  let preMin = nums[0];
  for (let i = 1; i < n; i++) {
    const max = preMax * nums[i];
    const min = preMin * nums[i];
    preMax = Math.max(max, min, nums[i])
    preMin = Math.min(max, min, nums[i])
    ans = Math.max(ans, preMax)
  }
  return ans
};





console.log(maxProduct1([2, 3, -2, 4]))
console.log(maxProduct1([-2, 0, -1]))
console.log(maxProduct1([0, 2]))
console.log(maxProduct1([-2, 3, -4]))
console.log(maxProduct1([2, -1, 1, 1]))

