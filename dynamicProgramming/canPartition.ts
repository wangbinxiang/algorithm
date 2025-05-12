
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

// console.log(canPartition([1, 5, 11, 5])) // true
// console.log(canPartition([1, 2, 3, 5])) // false
// console.log(canPartition([3, 3, 3, 4, 5])) // true
console.log(canPartition([2, 2, 3, 5])) // false
