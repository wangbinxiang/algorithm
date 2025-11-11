// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。



// 示例 1：

// 输入：nums = [2,3,1,1,4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
// 示例 2：

// 输入：nums = [3,2,1,0,4]
// 输出：false
// 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。


// 提示：

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105
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


function canJump5(nums: number[]): boolean {
  const n = nums.length - 1;
  let maxPox = nums[0];
  for (let i = 1; i <= maxPox; i++) {
    const pos = nums[i] + i;
    if (pos > maxPox) {
      maxPox = pos;
      if (maxPox >= n) {
        return true;
      }
    }
  }


  return maxPox >= n;
};

console.log(canJump5([2, 3, 1, 1, 4]))
console.log(canJump5([3, 2, 1, 0, 4]))
console.log(canJump5([0]))
