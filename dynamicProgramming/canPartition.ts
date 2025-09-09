// 分割等和子集

// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。



// 示例 1：

// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
// 示例 2：

// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。


// 提示：

// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100


// 获取总数后求一半数
// 如果组合后能得到一半数就为真
function canPartition(nums: number[]): boolean {
  let total = 0
  let max = 0

  for (let num of nums) {
    total += num
    max = Math.max(max, num)
  }

  if ((total & 1) === 1) { // 不能被2整除
    return false;
  }

  const target = total / 2;

  if (max > target) {
    return false
  }

  if (max === target) {
    return true
  }

  const n = nums.length;

  // console.log(target)
  const dp: boolean[][] = []
  for (let i = 0; i <= n; i++) {
    dp.push(Array(target + 1).fill(false))
  }

  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1]
    for (let j = 1; j <= target; j++) {
      if (j < num) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num]
      }
    }
    dp[i][num] = true
  }


  // let prevDp = Array(target + 1).fill(false)
  // prevDp[0] = true
  // for (let i = 0; i < n; i++) {
  //   const dp = Array(target + 1).fill(false)
  //   dp[0] = true
  //   const num = nums[i]
  //   dp[num] = true
  //   // console.log('num:', num)
  //   for (let j = 1; j <= target; j++) {
  //     if (j < num) {
  //       dp[j] = prevDp[j]
  //     } else {
  //       dp[j] = prevDp[j] || prevDp[j - num]
  //     }

  //   }
  //   prevDp = dp
  // }


  console.log(dp)

  return dp[n][target];
};

// 获取总数后求一半，如果是奇数不能分割
// 如果是偶数，该问题转变为满01背包问题,数组内的值是物品，看能不能正好装满容量是总数一半的背包
// 这种01背包问题，需要从后向前做dp
function canPartition1(nums: number[]): boolean {
  const n = nums.length
  let total = 0
  for (const num of nums) {
    total += num
  }
  if (total % 2 === 1) {
    return false
  }
  const half = total / 2
  const dp: boolean[] = Array(half + 1).fill(false)
  dp[0] = true
  for (let num of nums) {
    for (let i = half; i >= num; i--) {
      if (dp[i]) {
        continue
      }
      const p = i - num
      // console.log(num, p, dp[p])
      if (p >= 0 && dp[p]) {
        dp[i] = true
      }
    }
    // console.log(dp, num)
  }

  return dp[half];
}

console.log(canPartition1([1, 5, 11, 5])) // true
console.log(canPartition1([1, 2, 3, 5])) // false
console.log(canPartition1([3, 3, 3, 4, 5])) // true
console.log(canPartition1([2, 2, 3, 5])) // false
console.log(canPartition1([3, 3, 6, 8, 16, 16, 16, 18, 20])) // true

