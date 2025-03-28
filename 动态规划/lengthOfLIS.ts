function lengthOfLIS(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    } else {
      for (let j = i - 2; j >= 0; j--) {
        if (nums[i] > nums[j]) {
          dp[i] = dp[j] + 1
        } else if (nums[i] === nums[j]) {
          dp[i] = dp[j]
        }
      }
    }
  }
  console.log(dp)
  return dp[n - 1]
};


function lengthOfLIS1(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    } else {
      for (let j = i - 2; j >= 0; j--) {
        if (nums[i] > nums[j]) {
          dp[i] = dp[j] + 1
        } else if (nums[i] === nums[j]) {
          dp[i] = dp[j]
        }
      }
    }
  }
  console.log(dp)
  return dp[n - 1]
};

function lengthOfLIS2(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(1);
  let ans = 1;
  for (let i = 1; i < n; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        max = Math.max(max, dp[j] + 1)
      } else if (nums[i] === nums[j]) {
        max = Math.max(max, dp[j])
      } else {
        max = Math.max(max, 1)
      }
    }
    dp[i] = max
    ans = Math.max(ans, max)
  }
  console.log(nums)
  console.log(dp)
  return ans
};

// console.log(lengthOfLIS2([4, 10, 4, 3, 8, 9]))
// console.log(lengthOfLIS2([10, 9, 2, 5, 3, 7, 101, 18])) // 4
// console.log(lengthOfLIS2([0, 1, 0, 3, 2, 3])) // 4
// console.log(lengthOfLIS2([7, 7, 7, 7, 7, 7, 7]))

console.log(lengthOfLIS2([1, 3, 6, 7, 9, 4, 10, 5, 6])) // 6
