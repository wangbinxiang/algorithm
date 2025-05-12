function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  let ans: number[] = Array(n).fill(1);
  let lAns = 1
  let rAns = 1;
  for (let i = 0; i < n; i++) {
    ans[i] = lAns * ans[i];
    ans[n - i - 1] = rAns * ans[n - i - 1];
    lAns *= nums[i];
    rAns *= nums[n - i - 1];
  }

  return ans;
};

// 双指针

// 从左向右乘，从右向左乘
function productExceptSelf2(nums: number[]): number[] {
  const n = nums.length;
  const m = n - 1;
  let ans: number[] = Array(n).fill(1);
  let lTmp = 1;
  let rTmp = 1;
  for (let i = 0; i < n; i++) {
    ans[i] *= lTmp;
    ans[m - i] *= rTmp;

    lTmp *= nums[i];
    rTmp *= nums[m - i];
  }


  return ans;
};
// 双数组缓存
// 单数组+tmp


console.log(productExceptSelf2([1, 2, 3, 4]));
console.log(productExceptSelf2([-1, 1, 0, -3, 3]));


