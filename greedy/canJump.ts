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


function canJump2(nums: number[]): boolean {
  let maxPos = 0
  const n = nums.length

  for (let i = 0; i < n; i++) {
    if (i <= maxPos) {
      if (i + nums[i] > maxPos) {
        maxPos = i + nums[i]
      }
    } else {
      break
    }
  }


  return maxPos >= n - 1
}


function canJump3(nums: number[]): boolean {
  let maxPos = 0
  const n = nums.length
  for (let i = 0; i < n; i++) {
    if (maxPos >= i) {
      maxPos = Math.max(maxPos, i + nums[i])
    } else {
      break
    }
  }
  return maxPos >= n - 1
}


function canJump4(nums: number[]): boolean {
  let maxPosition = 0
  const n = nums.length
  for (let i = 0; i < n; i++) {
    if (i <= maxPosition) {
      maxPosition = Math.max(i + nums[i], maxPosition)
    } else {
      break
    }
  }

  return maxPosition >= n - 1
}


console.log(canJump4([2, 3, 1, 1, 4]))
console.log(canJump4([3, 2, 1, 0, 4]))
console.log(canJump4([0]))
