// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
// 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
// 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

// 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。



// 示例 1：

// 输入：nums = [3,4,5,1,2]
// 输出：1
// 解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
// 示例 2：

// 输入：nums = [4,5,6,7,0,1,2]
// 输出：0
// 解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
// 示例 3：

// 输入：nums = [11,13,15,17]
// 输出：11
// 解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。


// 提示：

// n == nums.length
// 1 <= n <= 5000
// -5000 <= nums[i] <= 5000
// nums 中的所有整数 互不相同
// nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转
// 先区分顺序区间和乱序区间
// 
function findMin(nums: number[]): number {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const m = ((right - left) >> 1) + left;
    const mVal = nums[m];
    console.log('left:', left, ' m:', m, ' right:', right)
    if (mVal > nums[right]) {
      left = m + 1;
    } else if (mVal < nums[left]) {
      right = m;
    } else {
      right = m - 1;
    }

  }
  return nums[left];
};

function findMin1(nums: number[]): number {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const m = ((right - left) >> 1) + left;
    const mVal = nums[m];
    console.log('left:', left, ' m:', m, ' right:', right)
    if (mVal > nums[right]) {
      left = m;
    } else {
      right = m - 1;
    }

  }
  return nums[left];
};


function findMin2(nums: number[]): number {
  let l = 0
  let r = nums.length - 1
  while (l < r) {
    const m = Math.floor((l + r) / 2)
    const num = nums[m]
    // console.log('l:', l, 'r:', r)
    if (nums[m] > nums[r]) {
      // 说明最小值在右边
      l = m + 1
    } else if (nums[m] < nums[l]) {
      // 说明最小值在左边
      r = m
    } else {
      r = m - 1
    }
  }
  // console.log(l)

  return nums[l]
}

function findMin3(nums: number[]): number {
  const n = nums.length;
  let l = 0;
  let r = n - 1;
  let min = +Infinity;
  while (l <= r) {
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num > min) {
      if (num < num[r]) {
        r = m - 1;
      } else {
        l = m + 1;
      }

    } else {
      min = num;
      if (num < nums[r]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
  }


  return min;
};

function findMin4(nums: number[]): number {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((r - l) / 2) + l;
    const num = nums[mid];
    if (num <= nums[r]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  console.log('l:', l, '; r:', r)
  return nums[l]
}


function findMin5(nums: number[]): number {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((r - l) / 2) + l;
    const num = nums[m];
    if (num < nums[r]) { // num比右边界小，自己可能是最小值 所以是 r = m
      r = m;
    } else { // num > nums[r], num 比右边界大，自己不可能是最小值所以是 l = m + 1;
      l = m + 1;
    }
    // console.log('l:', l);
    // console.log('r:', r);
  }
  return nums[l];
};


function findMin6(nums: number[]): number {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((r - l) >> 1) + l;
    const num = nums[m];
    // console.log(m, nums[m], nums[r]);
    if (num > nums[r]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return nums[l];
};


console.log(findMin6([3, 4, 5, 1, 2])) // 1
console.log(findMin6([4, 5, 6, 7, 0, 1, 2])) // 0
console.log(findMin6([11, 13, 15, 17])) // 11
console.log(findMin6([5, 1, 2, 3, 4])) // 1

console.log(findMin6([3, 1, 2])) // 1
