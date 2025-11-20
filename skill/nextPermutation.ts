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
  const n = nums.length;

  let max = 0
  let l = -1
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      max = i
      l = i - 1
    } else if (nums[i] > nums[l]) {
      max = i
    }
  }
  // console.log('l:', l)
  // console.log('max:', max)
  if (l === -1) {
    let i = 0;
    let j = n - 1;
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  } else {
    [nums[l], nums[max]] = [nums[max], nums[l]]
    let i = l + 1;
    let j = n - 1;
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  }
}
// 123 -> 132 -> 213 -> 231 -> 312 -> 321 -> 123

// 1234 -> 1243 -> 1324 -> 1342 -> 1423 -> 1432 -> 2134 -> 2314 -> 2413 -> 2431 -> 3124 -> 3214 -> 3241 -> 3412 -> 3421 -> 4123 -> 4213 -> 4231 -> 4312 -> 4321 -> 1234

function nextPermutation2(nums: number[]): void {
  let preMin = -1;
  let latest = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] < nums[i]) {
      preMin = i - 1;
      latest = i;
    } else if (nums[i] > nums[preMin]) {
      latest = i;
    }
  }
  console.log('preMin:', preMin);
  console.log('latest:', latest);
  if (preMin !== -1) {
    // preMin和 latest 交互位置
    [nums[preMin], nums[latest]] = [nums[latest], nums[preMin]];
    console.log(nums);
    let l = preMin + 1;
    let r = nums.length - 1;
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      console.log(nums);
      l++;
      r--;
    }
    // preMin + 1 和 nums.length - 1 循环交换位置
  } else {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }
};

function nextPermutation3(nums: number[]): void {
  let preMin = -1;
  const n = nums.length;
  let latest = n;
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      preMin = i - 1;
      latest = i
    } else if (preMin > -1 && nums[i] > nums[preMin]) {
      latest = i
    }
  }
  // console.log("preMin:", preMin);
  // console.log("latest:", latest);
  let l = 0;
  let r = n - 1;
  if (preMin !== - 1) {
    [nums[preMin], nums[latest]] = [nums[latest], nums[preMin]];
    l = preMin + 1;
  }
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
};


export const arr1 = [1, 2, 3]
nextPermutation3(arr1)
console.log(arr1) //[1,3,2]

const arr2 = [3, 2, 1]
nextPermutation3(arr2)
console.log(arr2) // [1, 2, 3]

const arr3 = [1, 1, 5];
nextPermutation3(arr3)
console.log(arr3) // [1, 5, 1]

const arr4 = [2, 3, 1]
nextPermutation3(arr4)
console.log(arr4) // [3, 1, 2]

const arr5 = [1, 3, 4, 2]
nextPermutation3(arr5)
console.log(arr5) // [1, 4, 2, 3]