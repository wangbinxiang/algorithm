// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

// 示例 1：

// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。
// 示例 2：

// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。

// 提示：

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400

function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  } else if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    if (i < 2) {
      arr[i] = nums[i];
    } else if (i === 2) {
      arr[i] = arr[0] + nums[i];
    } else {
      arr[i] = Math.max(arr[i - 3], arr[i - 2]) + nums[i];
    }
  }
  return Math.max(arr[n - 2], arr[n - 1]);
}

function rob1(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  } else if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const arr: number[] = [];
  arr[0] = nums[0];
  arr[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    arr[i] = Math.max(arr[i - 2] + nums[i], arr[i - 1]);
  }
  return arr[n - 1];
}

function rob21(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  } else if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const arr: number[] = [];
  arr[0] = nums[0];
  arr[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    const max = Math.max(arr[0] + nums[i], arr[1]);
    arr[0] = arr[1];
    arr[1] = max;
  }
  return arr[1];
}

function rob3(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0];
  }
  let prev = nums[1];
  let prevPrev = nums[0];
  const n = nums.length;
  for (let i = 2; i < n; i++) {
    const num = nums[i];
    let tmp = Math.max(prev, prevPrev);
    prev = prevPrev + num;
    prevPrev = tmp;
  }

  return Math.max(prev, prevPrev);
}

function rob4(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0];
  }
  const n = nums.length;
  const dp = Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = nums[1];
  for (let i = 2; i < n; i++) {
    const prev = dp[i - 1];
    const prevPrev = dp[i - 2];
    dp[i - 1] = Math.max(prev, prevPrev);
    dp[i] = prevPrev + nums[i];
  }
  return Math.max(dp[n - 1], dp[n - 2]);
}

function rob5(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  }
  if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const dp = Array(n + 1).fill(0);
  dp[1] = nums[0];
  dp[2] = nums[1];
  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(dp[i - 3], dp[i - 2]) + nums[i - 1];
  }
  // console.log(dp)
  return Math.max(dp[n], dp[n - 1]);
}

function rob6(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(0);

  dp[0] = nums[0];

  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] ?? 0, dp[i - 3] ?? 0) + nums[i];
  }

  return Math.max(dp[n - 1] ?? 0, dp[n - 2] ?? 0);
}


function rob7(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  }

  const dp = Array(n).fill(0);
  dp[0] = nums[0];

  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(i - 2 >= 0 ? dp[i - 2] : 0, i - 3 >= 0 ? dp[i - 3] : 0) + nums[i];
  }
  console.log(dp);
  return Math.max(dp[n - 1] ?? 0, dp[n - 2] ?? 0);
};

console.log(rob7([1, 2, 3, 1]));
console.log(rob7([2, 7, 9, 3, 1]));
console.log(rob7([2, 1, 1, 2]));
