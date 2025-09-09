// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。


// 示例 1：

// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 示例 2：

// 输入：nums = [0,1,0,3,2,3]
// 输出：4
// 示例 3：

// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1


// 提示：

// 1 <= nums.length <= 2500
// -104 <= nums[i] <= 104


// 进阶：

// 你能将算法的时间复杂度降低到 O(n log(n)) 吗?

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


function lengthOfLIS3(nums: number[]): number {
  let ans = 1;
  const n = nums.length
  const dp: number[] = Array(n).fill(1)
  dp[0] = 1
  for (let i = 1; i < n; i++) {
    let max = 1
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        max = Math.max(max, dp[j] + 1)
      } else if (nums[j] === nums[i]) {
        max = Math.max(max, dp[j])
      }
    }
    dp[i] = max
    ans = Math.max(ans, max)
  }
  // console.log(dp)
  return ans;
}



function lengthOfLISBinary(nums: number[]): number {
  let arr: number[] = [nums[0]]
  const n = nums.length

  for (let i = 1; i < n; i++) {
    const num = nums[i]
    if (arr[arr.length - 1] < num) {
      arr.push(num)
    } else if (arr[arr.length - 1] > num) {
      const k = arr.length
      let l = 0
      let r = k - 1
      while (l <= r) {
        const m = Math.floor((l + r) / 2)
        // console.log('l + r:', l, r)
        // console.log('m:', m)
        // console.log('num:', num)
        if (arr[m] > num) {
          if (m === 0) {
            arr[m] = num
            break
          } else if (arr[m - 1] < num) {
            arr[m] = num
            break
          } else {
            // console.log('r = m - 1:', m - 1, l)
            r = m - 1
          }
        } else {
          // console.log('l = m + 1:', m + 1, r)
          l = m + 1
        }
      }
    }
    // console.log(arr)
  }

  // console.log(arr)

  return arr.length
}


function lengthOfLISBinary1(nums: number[]): number {
  let ans: number[] = [nums[0]];
  const n = nums.length

  for (let i = 1; i < n; i++) {
    const num = nums[i]
    if (num > ans[ans.length - 1]) {
      ans.push(num)
    } else if (num < ans[ans.length - 1]) {
      let l = 0
      let r = ans.length - 1
      while (l < r) {
        const m = Math.floor((l + r) / 2)
        if (num > ans[m]) {
          l = m + 1
        } else {
          r = m
        }
      }
      ans[l] = num
    }
    console.log(ans)
  }
  console.log(ans)
  return ans.length
}

console.log(lengthOfLISBinary1([4, 10, 4, 3, 8, 9])) // 3
// console.log(lengthOfLISBinary1([10, 9, 2, 5, 3, 7, 101, 18])) // 4
// console.log(lengthOfLISBinary1([0, 1, 0, 3, 2, 3])) // 4
// console.log(lengthOfLISBinary1([7, 7, 7, 7, 7, 7, 7])) // 1

// console.log(lengthOfLISBinary([1, 3, 6, 7, 9, 4, 10, 5, 6])) // 6
