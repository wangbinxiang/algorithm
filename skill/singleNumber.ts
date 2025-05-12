function singleNumber(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return nums[0]
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    // 异或两次还原
    ans = ans ^ nums[i]
  }
  return ans;
};

console.log(singleNumber([2, 2, 1]));
console.log(singleNumber([4, 1, 2, 1, 2]));
console.log(singleNumber([1]));
