
//  给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

// 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

// 必须在不使用库内置的 sort 函数的情况下解决这个问题。

/**
 Do not return anything, modify nums in-place instead.
 */

function sortColors(nums: number[]): void {
  const n = nums.length;
  let left = 0;
  let right = n -1;
  while (nums[left] === 0) {
    left++
  }
  while (nums[right] === 2) {
    right--
  }

  let i = left;
  while (i <= right) {
   const iVal = nums[i];
   if (iVal === 1) {
    i++
   } else if (iVal === 0) {
    [nums[i], nums[left]] = [nums[left], nums[i]]
    left++
    i++
   } else if (iVal === 2) {
    [nums[i], nums[right]] = [nums[right], nums[i]]
    right--
    while (nums[right] === 2) {
      right--
    }
   }
  }
};

function sortColors1(nums: number[]): void {
  const n = nums.length;
  let p0 = 0;
  let p1 = 0;

  for (let i = 0; i < n; i++) {
    const val = nums[i];
    if (val === 1) {
      [nums[i], nums[p1]] = [nums[p1], nums[i]]
      p1++
    } else if (val === 0) {
      [nums[i], nums[p0]] = [nums[p0], nums[i]]
      // 可能会把1交换出去，所以需要在p0 < p1的情况下，将p1与i交换
      if (p0 < p1) {
        [nums[i], nums[p1]] = [nums[p1], nums[i]]
      }
      p0++
      p1++
    }
  }

}

const arr1 = [2, 0, 2, 1, 1, 0]
sortColors1(arr1)
console.log(arr1)
const arr2 = [2, 0, 1]
sortColors1(arr2)
console.log(arr2)

const arr3 = [1,2,2,2,2,0,0,0,1,1];
sortColors1(arr3)
console.log(arr3)


// 提示：

// n == nums.length
// 1 <= n <= 300
// nums[i] 为 0、1 或 2
 

// 进阶：

// 你能想出一个仅使用常数空间的一趟扫描算法吗？
