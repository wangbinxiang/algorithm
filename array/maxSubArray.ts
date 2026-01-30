// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 子数组是数组中的一个连续部分。

function maxSubArray(nums: number[]): number {
  let ansMax = nums[0];
  let pre = 0;
  nums.forEach(item => {
    pre = Math.max(pre + item, item);
    if (pre > ansMax) {
      ansMax = pre;
    }
  })


  return ansMax;
};


function maxSubArray2(nums: number[]): number {
  const n = nums.length;
  const f = Array(n);
  f[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    f[i] = Math.max(f[i - 1], 0) + nums[i]
  }

  return Math.max(...f);
};

function maxSubArray3(nums: number[]): number {
  const n = nums.length;
  let f = nums[0];
  let ans = nums[0];
  for (let i = 1; i < nums.length; i++) {
    f = Math.max(f, 0) + nums[i];
    ans = Math.max(ans, f);
  }

  return ans;
};


function maxSubArray4(nums: number[]): number {
  // 二分法递归分割
  // iSum, lSum, rSum, mSum

  class Status {
    lSum: number;
    rSum: number;
    mSum: number;
    iSum: number;

    constructor(l: number, r: number, m: number, i: number) {
      this.lSum = l;
      this.rSum = r;
      this.mSum = m;
      this.iSum = i;
    }
  }

  function getInfo(l: number, r: number): Status {
    if (l === r) {
      return new Status(nums[l], nums[l], nums[l], nums[l]);
    }
    const m = (l + r) >> 1;
    const lSub = getInfo(l, m);
    const rSub = getInfo(m + 1, r);
    const lSum = Math.max(lSub.lSum, lSub.iSum + rSub.lSum);
    const rSum = Math.max(rSub.rSum, rSub.iSum + lSub.rSum);
    const mSum = Math.max(lSub.mSum, rSub.mSum, lSub.rSum + rSub.lSum);
    const iSum = lSub.iSum + rSub.iSum;
    return new Status(lSum, rSum, mSum, iSum);
  }

  return getInfo(0, nums.length - 1).mSum;
};


// 示例 1：

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：

// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23


// 提示：

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104


// 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。

// 动态规划
function maxSubArray5(nums: number[]): number {
  const n = nums.length;
  let prev = nums[0]
  let ans = nums[0];
  for (let i = 1; i < n; i++) {
    const num = nums[i]
    const res = prev + num;
    if (res > num) {
      prev = res;
    } else {
      prev = num
    }
    if (prev > ans) {
      ans = prev
    }
  }

  return ans
}



function maxSubArray6(nums: number[]): number {
  let ans = nums[0];
  let prevCount = nums[0];
  let l = 0;
  const n = nums.length;
  for (let i = 1; i < n; i++) {
    const num = nums[i]
    if (prevCount <= 0) {
      prevCount = num;
      l = i;
    } else {
      prevCount += num
    }
    if (prevCount > ans) {
      ans = prevCount;
    }
  }
  // return ans === -Infinity ? prevCount : ans;
  return ans;
};

console.log(maxSubArray6([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
console.log(maxSubArray6([1]));
console.log(maxSubArray6([5, 4, -1, 7, 8]))
console.log(maxSubArray6([0]))
console.log(maxSubArray6([-2, -1]))

