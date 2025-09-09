// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// 投票抵消

function majorityElement(nums: number[]): number {

  const n = nums.length;
  let ans = nums[0];
  let count = 0

  for (let i = 0; i < n; i++) {
    if (count === 0) {
      ans = nums[i]
    }
    if (ans === nums[i]) {
      count++
    } else {
      count--
    }
  }


  return ans
};

// 排序，位于1/2处的元素就是多数元素
function majorityElement1(nums: number[]): number {
  const n = nums.length;
  for (let i = Math.floor((n - 2) / 2); i >= 0; i--) {
    let p = i
    while (true) {
      const left = p * 2 + 1;
      const right = p * 2 + 2;
      let maxPost = p;
      if (left < n && nums[p] < nums[left]) {
        maxPost = left
      }
      if (right < n && nums[maxPost] < nums[right]) {
        maxPost = right;
      }
      if (p !== maxPost) {
        [nums[p], nums[maxPost]] = [nums[maxPost], nums[p]]
        p = maxPost
      } else {
        break;
      }
    }
  }
  const mid = Math.floor((n - 1) / 2)
  // console.log(nums);

  for (let i = n - 1; i >= 0; i--) {
    [nums[i], nums[0]] = [nums[0], nums[i]]
    let p = 0;
    while (true) {
      const left = p * 2 + 1;
      const right = p * 2 + 2;
      let maxPost = p;
      if (left < i && nums[maxPost] < nums[left]) {
        maxPost = left
      }
      if (right < i && nums[maxPost] < nums[right]) {
        maxPost = right
      }
      if (p !== maxPost) {
        [nums[p], nums[maxPost]] = [nums[maxPost], nums[p]]
        p = maxPost
      } else {
        break;
      }
    }
  }
  // console.log(nums);


  return nums[mid];
}


// 摩尔投票法
function majorityElement2(nums: number[]): number {
  let ans = nums[0]
  let count = 1
  const n = nums.length
  for (let i = 1; i < n; i++) {
    const num = nums[i]
    if (num === ans) {
      count++
    } else {
      if (count === 0) {
        ans = num
        count = 1
      } else {
        count--
      }
    }
  }


  return ans
}

function majorityElement3(nums: number[]): number {
  let ans = nums[0]
  let count = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === ans) {
      count++
    } else {
      if (count === 0) {
        ans = nums[i]
        count++
      } else {
        count--
      }
    }
  }
  return ans
}



console.log(majorityElement3([3, 2, 3, 4, 4, 4, 4]))
console.log(majorityElement3([2, 2, 1, 1, 1, 2, 2, 1, 1]))


// 投票抵消

// 提示：
// n == nums.length
// 1 <= n <= 5 * 104
// -109 <= nums[i] <= 109

// 尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。