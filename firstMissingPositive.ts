function firstMissingPositive(nums: number[]): number {
  const n = nums.length;
  let ans = 1;


  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[i] - 1 !== i && nums[i] !== nums[nums[i] - 1]) {
      const tmp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = tmp
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] === i + 1) {
      ans = i + 2;
    } else {
      return ans;
    }
  }

  return n + 1;
};


console.log(firstMissingPositive([1, 2, 0]));
console.log(firstMissingPositive([3, 4, -1, 1]));
console.log(firstMissingPositive([7, 8, 9, 11, 12]));
console.log(firstMissingPositive([2, 1]));