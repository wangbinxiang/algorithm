// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。



// 示例 1：

// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：

// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：

// 输入：nums = [], target = 0
// 输出：[-1,-1]


// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

function searchRange(nums: number[], target: number): number[] {
  const ans: number[] = [-1, -1];
  let left = 0;
  let right = nums.length - 1;
  let m = -1;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const midVal = nums[mid];
    if (midVal === target) {
      m = mid;
      break;
    } else if (midVal > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (m !== -1) {
    let l = left;
    let r = m;
    while (l <= r) {
      const mid = ((r - l) >> 1) + l;
      const mVal = nums[mid];
      if (target === mVal) {
        ans[0] = mid;
        r = mid - 1;
      } else if (target < mVal) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }


    l = m;
    r = right;
    while (l <= r) {
      const mid = ((r - l) >> 1) + l;
      const mVal = nums[mid];
      if (target === mVal) {
        ans[1] = mid;
        l = mid + 1;
      } else if (target < mVal) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
  }
  console.log(left, m, right);


  return ans;
};



function searchRange1(nums: number[], target: number): number[] {
  let l = 0
  let r = nums.length - 1
  let minL = +Infinity
  while (l <= r) {
    const m = Math.floor((l + r) / 2)
    const num = nums[m]
    if (num === target) {
      if (minL > m) {
        minL = m
      }
      r = m - 1
    } else if (num < target) {
      l = m + 1
    } else {
      r = m - 1
    }
  }
  console.log('minL:', minL, l)
  r = nums.length - 1
  let maxR = -1
  if (minL === +Infinity) {
    return [-1, -1]
  }

  while (l <= r) {
    const m = Math.floor((l + r) / 2)
    const num = nums[m]
    if (num === target) {
      if (m > maxR) {
        maxR = m
      }
      l = m + 1
    } else if (num < target) {
      l = m + 1
    } else {
      r = m - 1
    }
  }

  console.log('l:', l, r, maxR)


  return [minL, maxR]
};

console.log(searchRange1([5, 7, 7, 8, 8, 10], 8)) // [3, 4]
console.log(searchRange1([5, 7, 7, 8, 8, 10], 5)) // [-1, -1]
console.log(searchRange1([], 0))