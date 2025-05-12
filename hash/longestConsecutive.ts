// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

function longestConsecutive(nums: number[]): number {
  const set: Set<number> = new Set();
  let totalMaxLength = 0;
  nums.forEach((num, index) => {
    set.add(num);
  })

  for (const num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentMaxLength = 1;
      while (set.has(currentNum + 1)) {
        currentMaxLength++
        currentNum++;
      }
      if (currentMaxLength > totalMaxLength) {
        totalMaxLength = currentMaxLength;
      }
    }
  }
  return totalMaxLength;
};

function longestConsecutive1(nums: number[]): number {
  let ans = 0;

  const set = new Set<number>()

  for (let num of nums) {
    set.add(num)
  }

  for (let num of set) {
    if (set.has(num - 1)) {
      continue
    }
    let count = 1;
    let curr = num;
    while (set.has(curr + 1)) {
      count++;
      curr++
    }
    if (ans < count) {
      ans = count;
    }
  }



  return ans;
}

function longestConsecutive2(nums: number[]): number {
  let ans = 0;

  const set = new Set<number>()

  for (let num of nums) {
    set.add(num)
  }

  for (let num of set) {
    if (set.has(num - 1)) {
      continue
    }
    let start = num;
    let curr = num;
    while (set.has(curr + 1)) {
      curr++
    }
    let count = curr - start + 1
    if (ans < count) {
      ans = count;
    }
  }



  return ans;
}

console.log(longestConsecutive1([1, 0, -1]));  //3

console.log(longestConsecutive1([1, 0, 0, 2])); // 3

console.log(longestConsecutive1([100, 4, 200, 1, 3, 2])); // 4

console.log(longestConsecutive1([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9



// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109