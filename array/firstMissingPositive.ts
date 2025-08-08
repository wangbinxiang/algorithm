// 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。


// 示例 1：

// 输入：nums = [1,2,0]
// 输出：3
// 解释：范围 [1,2] 中的数字都在数组中。
// 示例 2：

// 输入：nums = [3,4,-1,1]
// 输出：2
// 解释：1 在数组中，但 2 没有。
// 示例 3：

// 输入：nums = [7,8,9,11,12]
// 输出：1
// 解释：最小的正数 1 没有出现。


// 提示：

// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1

function firstMissingPositive(nums: number[]): number {
  const n = nums.length;
  let ans = 1;


  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[i] - 1 !== i && nums[i] !== nums[nums[i] - 1]) {
      const tmp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = tmp
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] === i + 1) {
      ans = i + 2;
    } else {
      return ans;
    }
  }

  return n + 1;
};


function firstMissingPositive1(nums: number[]): number {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let val = nums[i];
    while (val > 0 && val <= n && nums[val - 1] !== val) {
      const tmp = nums[val - 1]
      nums[val - 1] = val
      if (val === tmp) {
        break
      }
      val = tmp

    }
  }
  let ans = n + 1
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      ans = i + 1
      break;
    }
  }
  console.log(nums)
  return ans;
}

function firstMissingPositive2(nums: number[]): number {
  const n = nums.length;
  let ans = nums.length + 1;
  for (let i = 0; i < n; i++) {
    let val = nums[i];
    while (val > 0 && val <= n && val !== i + 1 && val !== nums[val - 1]) {
      [nums[i], nums[val - 1]] = [nums[val - 1], nums[i]]
      val = nums[i];
    }
  }
  for (let i = 0; i < n; i++) {
    const val = nums[i];
    if (val !== i + 1) {
      ans = i + 1;
      break;
    }
  }
  return ans;
}


function firstMissingPositive3(nums: number[]): number {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    while (nums[i] !== i + 1 && nums[i] > 0 && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
      const k = nums[i] - 1;
      [nums[i], nums[k]] = [nums[k], nums[i]]
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }
  return n + 1
}


console.log(firstMissingPositive3([1, 2, 0]));
console.log(firstMissingPositive3([3, 4, -1, 1]));
console.log(firstMissingPositive3([7, 8, 9, 11, 12]));
console.log(firstMissingPositive3([2, 1]));
console.log(firstMissingPositive3([2, 1]));