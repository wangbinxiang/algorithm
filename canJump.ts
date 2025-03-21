function canJump(nums: number[]): boolean {
  let ans = false;

  const n = nums.length - 1;
  if (n === 0) {
    return true;
  }
  const help = (k: number) => {
    for (let i = 1; i <= nums[k]; i++) {
      const next = k + i;
      if (next < n) {
        help(next)
      } else if (next === n) {
        ans = true
        return;
      } else {
        break;
      }
    }
  }
  help(0)
  return ans;
};

function canJump1(nums: number[]): boolean {
  let maxPosition = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i <= maxPosition) {
      maxPosition = Math.max(maxPosition, i + nums[i])
      if (maxPosition >= n - 1) {
        return true;
      }
    }
  }

  return false;
};


console.log(canJump1([2, 3, 1, 1, 4]))
console.log(canJump1([3, 2, 1, 0, 4]))
console.log(canJump1([0]))
