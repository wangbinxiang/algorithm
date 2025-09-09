// 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续 子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

// 测试用例的答案是一个 32-位 整数。



// 示例 1:

// 输入: nums = [2,3,-2,4]
// 输出: 6
// 解释: 子数组 [2,3] 有最大乘积 6。
// 示例 2:

// 输入: nums = [-2,0,-1]
// 输出: 0
// 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。


// 提示:

// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// nums 的任何子数组的乘积都 保证 是一个 32-位 整数

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


function maxProduct3(nums: number[]): number {
  const dp: number[][] = [[nums[0], nums[0]]]
  let max = nums[0]
  const n = nums.length
  let preMax = nums[0]
  let preMin = nums[0]
  for (let i = 1; i < n; i++) {
    const num = nums[i]

    const currentMax = preMax * num
    const currentMin = preMin * num



    preMax = Math.max(currentMax, currentMin, num)
    preMin = Math.min(currentMax, currentMin, num)

    max = Math.max(max, preMax)
  }
  // console.log(dp)

  return max
}



console.log(maxProduct3([2, 3, -2, 4])) // 6
console.log(maxProduct3([-2, 0, -1])) // 0
console.log(maxProduct3([0, 2]))
console.log(maxProduct3([-2, 3, -4]))
console.log(maxProduct3([2, -1, 1, 1]))

// console.log(maxProduct3([3, -1, 4]))
// console.log(maxProduct3([2, -5, -2, -4, 3]))

