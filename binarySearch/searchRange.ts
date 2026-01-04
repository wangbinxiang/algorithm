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

function searchRange2(nums: number[], target: number): number[] {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  let minL = +Infinity;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const num = nums[mid];
    if (num === target) {
      if (mid < minL) {
        minL = mid;
      }
      right = mid - 1;
    } else if (num > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  if (minL === +Infinity) {
    return [-1, -1];
  }

  right = n - 1;
  let maxR = -Infinity;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const num = nums[mid];
    if (num === target) {
      if (mid > maxR) {
        maxR = mid;
      }
      left = mid + 1;
    } else if (num > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return [minL, maxR];
};

function searchRange3(nums: number[], target: number): number[] {
  let l = 0;
  let r = nums.length - 1;

  let minL = +Infinity;

  while (l <= r) {
    const mid = Math.floor((r - l) >> 1) + l;
    const num = nums[mid];
    if (num === target) {
      minL = mid;
      r = mid - 1;
    } else if (num < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  if (minL === +Infinity) {
    return [-1, -1];
  }

  r = nums.length - 1;

  let maxR = minL;
  while (l <= r) {
    const mid = Math.floor((r - l) >> 1) + l;
    const num = nums[mid];
    if (num === target) {
      maxR = mid;
      l = mid + 1;
    } else if (num < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return [minL, maxR];
};


function searchRange4(nums: number[], target: number): number[] {
  let l = 0;
  let r = nums.length - 1;
  let min = -1;
  while (l <= r) {
    // console.log(l, r);
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    if (num === target) {
      min = m;
      r = m - 1;
    } else if (num > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  if (min === -1) {
    return [-1, -1];
  }
  // console.log(min);

  r = nums.length - 1;
  let max = -1
  while (l <= r) {
    // console.log(l, r);
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    // console.log(num)
    if (num === target) {
      max = m;
      l = m + 1;
    } else if (num > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }


  return [min, max];
};


function searchRange5(nums: number[], target: number): number[] {
  const ans: number[] = [];
  const n = nums.length;

  let l = 0;
  let r = n - 1;
  let left = n;
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num === target) {
      if (m < left) {
        left = m;
      }
      r = m - 1;
    }
    else if (num > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  if (left === n) {
    return [-1, -1];
  }
  r = n - 1;
  let right = -1;
  while (l <= r) {
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    if (num === target) {
      if (m > right) {
        right = m;
      }
      l = m + 1;
    } else if (num > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }



  return [left, right];
};


function searchRange6(nums: number[], target: number): number[] {
  let l = 0;
  let r = nums.length - 1;
  let leftPos = nums.length;

  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const val = nums[m];

    if (val === target) {
      leftPos = m;
      r = m - 1;
    } else if (val > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  };

  if (leftPos === nums.length) {
    return [-1, -1];
  }

  r = nums.length - 1;

  let rightPos = -1;
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const val = nums[m];

    if (val === target) {
      rightPos = m;
      l = m + 1;
    } else if (val > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  };


  return [leftPos, rightPos];
};


function searchRange7(nums: number[], target: number): number[] {

  let l = 0;
  let r = nums.length - 1;
  let left = -1;
  while (l <= r) {
    const m = Math.floor((r - l) >> 1) + l;
    const val = nums[m];
    if (val === target) {
      r = m - 1;
      left = m;
    } else if (val > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }

  if (left === -1) {
    return [-1, -1];
  }
  r = nums.length - 1;
  let right = -1;
  while (l <= r) {
    const m = Math.floor((r - l) >> 1) + l;
    const val = nums[m];
    if (val === target) {
      l = m + 1;
      right = m;
    } else if (val > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }



  return [left, right];
};

console.log(searchRange6([5, 7, 7, 8, 8, 10], 8)) // [3, 4]
console.log(searchRange6([5, 7, 7, 8, 8, 10], 5)) // [-1, -1]
console.log(searchRange6([], 0))