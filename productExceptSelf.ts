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

function productExceptSelf2(nums: number[]): number[] {
  const n = nums.length;
  let ans: number[] = Array(n).fill(1);


  return ans;
};
// 双数组缓存
// 单数组+tmp


console.log(productExceptSelf([1, 2, 3, 4]));
console.log(productExceptSelf([-1, 1, 0, -3, 3]));


