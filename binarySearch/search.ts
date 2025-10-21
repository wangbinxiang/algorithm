// 整数数组 nums 按升序排列，数组中的值 互不相同 。

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

function search(nums: number[], target: number): number {
  let ans = -1;

  const dfs = (l: number, r: number) => {
    // console.log('l:', l, ' r:', r);
    if (l > r) {
      return;
    }
    const m = ((r - l) >> 1) + l;
    const mVal = nums[m];
    // console.log(m, mVal);
    if (target === mVal) {
      ans = m;
      return;
    }
    dfs(l, m - 1)
    dfs(m + 1, r)
  }
  dfs(0, nums.length - 1)
  return ans;
};

function search1(nums: number[], target: number): number {
  let ans = -1;

  const queue: { l: number, r: number }[] = [{ l: 0, r: nums.length - 1 }];
  while (queue.length > 0) {
    const range = queue.shift()!;
    if (range.l > range.r) {
      continue;
    }
    const m = ((range.r - range.l) >> 1) + range.l;
    const mVal = nums[m];
    if (mVal === target) {
      ans = m;
      break;
    }
    queue.push({ l: range.l, r: m - 1 })
    queue.push({ l: m + 1, r: range.r })
  }
  return ans;
};
function search2(nums: number[], target: number): number {
  let l = 0
  let r = nums.length - 1
  // const endVal = nums[r]
  while (l <= r) {
    const m = Math.floor((l + r) / 2)
    const num = nums[m]
    if (num === target) {
      return m
    } else if (num < target) {
      if (num > nums[r] || target <= nums[r]) {
        l = m + 1
      } else {
        r = m - 1
      }
    } else {
      if (num > nums[r] && target <= nums[r]) {
        l = m + 1
      } else {
        r = m - 1
      }
    }
  }

  return -1
}


function search3(nums: number[], target: number): number {
  const n = nums.length;
  let l = 0;
  let r = n - 1;

  while (l <= r) {
    const mid = Math.floor((r - l) / 2) + l;
    const num = nums[mid];
    // console.log(num, mid, l, r);
    if (target === num) {
      return mid
    } else if (num > target) {
      if (num <= nums[r] || target > nums[r]) {
        r = mid - 1;
      } else {
        l = mid + 1; // ->
      }
    } else { // num < target
      if (num >= nums[l] || target <= nums[r]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
};


function search4(nums: number[], target: number): number {
  const n = nums.length;
  let l = 0;
  let r = n - 1;
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num === target) {
      return m;
    } else if (num > target) {
      if (num <= nums[r] || target > nums[r]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    } else { // num < target
      if (num >= nums[l] || target <= nums[r]) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    // console.log('l:', l);
    // console.log('r:', r);
  }

  return -1;
}


function search5(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    // console.log('m:', m);
    if (num === target) {
      return m;
    } else if (num < target) {
      if (target > nums[r] && num < nums[r]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    } else {
      if (target > nums[r] || num < nums[r]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
    // console.log('l:', l);
    // console.log('r:', r);
  }
  return -1;
};

function search6(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    if (num === target) {
      return m;
    } else if (num > target) {
      if (target > nums[r] || num < nums[r]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    } else { // num < target
      if (target <= nums[r] || num > nums[r]) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    // console.log('l:', l);
    // console.log('r:', r);
  }

  return -1;
};

console.log(search6([4, 5, 6, 7, 0, 1, 2], 0)) // 4
console.log(search5([4, 5, 6, 7, 0, 1, 2], 3)) // -1
console.log(search5([1], 0)) // -1
console.log(search5([1, 3], 3)) // 1
console.log(search5([3, 1], 1)) // 1
console.log(search5([5, 1, 3], 3)) // 2
console.log(search5([5, 1, 3], 5)) // 0

console.log(search5([4, 5, 6, 7, 0, 1, 2], 6)) // 2
console.log(search5([4, 5, 6, 7, 8, 1, 2, 3], 8)) // 4
