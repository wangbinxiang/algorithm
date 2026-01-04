// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 请必须使用时间复杂度为 O(log n) 的算法。



// 示例 1:

// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 示例 2:

// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:

// 输入: nums = [1,3,5,6], target = 7
// 输出: 4


// 提示:

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums 为 无重复元素 的 升序 排列数组
// -104 <= target <= 104

function searchInsert(nums: number[], target: number): number {

  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    if (target > nums[0]) {
      return 1
    } else if (target === nums[0]) {
      return 0;
    } else {
      return 0;
    }
  }

  let start = 0;
  let end = n - 1;
  while (true) {
    const mid = (start + end) >> 1;
    // console.log('mid:', mid)
    // console.log('start:', start)
    // console.log('end:', end)
    const midVal = nums[mid];
    if (midVal === target) {
      return mid
    } else if (midVal < target) {




      if (mid === end) {
        // console.log('return end + 1')
        return end + 1
      } else if (end - start === 1) {
        if (target > nums[end]) {
          // console.log('return mid')
          return end + 1;
        } else if (target > nums[start]) {
          // console.log('return start + 1')
          return start + 1
        }
      }
      // else if (mid === start) {
      //   console.log('return mid + 1')
      //   return mid + 1
      // } 
      else {
        start = mid
      }
    } else {
      if (start === mid) {
        // console.log('return start')
        return start
      } else {
        end = mid
      }
    }
  }

};

function searchInsert1(nums: number[], target: number): number {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let start = 0;
  let end = n - 1;
  while (true) {
    const mid = ((end - start) >> 1) + start;
    const midVal = nums[mid];
    console.log('mid:', mid);
    console.log('start:', start);
    console.log('end:', end);
    if (midVal === target) {
      return mid
    } else if (start === end) {
      if (target > midVal) {
        return end + 1;
      } else {
        return end;
      }
    } else if (midVal > target) {
      end = mid;
    } else if (midVal < target) {
      start = mid + 1;
    }
  }
}


function searchInsert2(nums: number[], target: number): number {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let start = 0;
  let end = n - 1;
  while (start <= end) {
    const mid = ((end - start) >> 1) + start;
    const midVal = nums[mid];
    if (midVal === target) {
      return mid
    } else if (midVal < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return start
}


function searchInsert3(nums: number[], target: number): number {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    const m = Math.floor((l + r) / 2)
    const num = nums[m]
    if (num === target) {
      return m
    } else if (num < target) {
      l = m + 1
    } else {
      r = m - 1
    }
  }
  return l
}


function searchInsert4(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    // console.log('l:', l, '; r:', r);
    const mid = Math.floor((r - l) / 2) + l;
    const num = nums[mid];
    if (target === num) {
      return mid;
    } else if (num > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  // console.log('l:', l, '; r:', r);
  return l;
};

function searchInsert5(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  let ans = nums.length;
  while (l <= r) {
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    if (num === target) {
      return m;
    } else if (num > target) {
      r = m - 1;
      ans = m;
    } else {
      l = m + 1;
    }
  }


  return ans;
};


function searchInsert6(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  let ans = 0;
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num === target) {
      return m;
    } else if (num > target) {
      r = m - 1;
    } else {
      ans = m + 1;
      l = m + 1;
    }
  }


  return ans;
};


function searchInsert7(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    // console.log(l, r);
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num === target) {
      return m;
    } else if (num < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }

  return l;
};


function searchInsert8(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const val = nums[m];
    if (val === target) {
      return m;
    } else if (val > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }


  return l
};



function searchInsert9(nums: number[], target: number): number {
  let ans = 0;
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num === target) {
      return m;
    } else if (num < target) {
      l = m + 1
    } else {
      ans = m;
      r = m - 1;
    }
  }


  return ans;
};

console.log(searchInsert8([1, 3, 5, 6], 5)) // 2
console.log(searchInsert8([1, 3, 5, 6], 2)) // 1
console.log(searchInsert8([1, 3, 5, 6], 7)) // 4
console.log(searchInsert8([1, 3], 1)) // 0
console.log(searchInsert8([1, 3], 0)) // 0