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




console.log(maxSubArray4([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
console.log(maxSubArray4([1]));
console.log(maxSubArray4([5, 4, -1, 7, 8]))
console.log(maxSubArray4([0]))
console.log(maxSubArray4([-2, -1]))

