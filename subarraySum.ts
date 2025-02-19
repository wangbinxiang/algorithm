function subarraySum(nums: number[], k: number): number {
  const result: number[] = [];
  let ans = 0;
  nums.sort((a, b) => a - b);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const target = k - i;
    if (target < 0) {
      break;
    } else if (target === 0) {
      ++ans;
    } else {

    }
  }
  // 排序
  // 

  return ans;
};


function subarraySum2(nums: number[], k: number): number {
  let ans = 0;
  const map = new Map<number, number>();
  map.set(0, 1);
  let pre = 0;
  for (let val of nums) {
    pre += val;
    if (map.has(pre - k)) {
      ans += map.get(pre - k) as number;
    }
    if (map.has(pre)) {
      map.set(pre, map.get(pre) as number + 1);
    } else {
      map.set(pre, 1);
    }
  }
  return ans;
}

function subarraySum3(nums: number[], k: number): number {
  let ans = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j >= 0; j--) {
      sum += nums[j];
      if (sum === k) {
        ans++;
      }
    }
  }
  return ans;
}


console.log(subarraySum3([1, 1, 1], 2)); // 2
console.log(subarraySum3([1, 2, 3], 3)); // 2