/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
  // 从后向前寻找第一个降序数
  const n = nums.length;
  let left = -1;
  for (let i = n - 1; i >= 0; i--) {
    if (nums[i] > nums[i - 1]) {
      left = i - 1;
      break;
    }
  }

  if (left !== -1) {
    let right = -1;
    for (let i = n - 1; i >= 0; i--) {
      if (nums[i] > nums[left]) {
        right = i;
        break;
      }
    }
    console.log('left:', left);
    console.log('right:', right);
    // 交换left right
    [nums[left], nums[right]] = [nums[right], nums[left]]
    // left 右边数字反转
    let l = left + 1;
    let r = n - 1;
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]]
      l++;
      r--
    }
  } else {
    // 没有找到降序数字，直接反转整个数组
    let l = 0;
    let r = n - 1
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]]
      l++;
      r--
    }
  }
};

// 

function nextPermutation1(nums: number[]): void {



}
// 123 -> 132 -> 213 -> 231 -> 312 -> 321 -> 123

// 1234 -> 1243 -> 1324 -> 1342 -> 1423 -> 1432 -> 2134 -> 2314 -> 2413 -> 2431 -> 3124 -> 3214 -> 3241 -> 3412 -> 3421 -> 4123 -> 4213 -> 4231 -> 4312 -> 4321 -> 1234

// const arr1 = [1, 2, 3]
// nextPermutation(arr1)
// console.log(arr1) //[1,3,2]

// const arr2 = [3, 2, 1]
// nextPermutation(arr2)
// console.log(arr2) // [1, 2, 3]

// const arr3 = [1, 1, 5]
// nextPermutation(arr3)
// console.log(arr3) // [1, 5, 1]