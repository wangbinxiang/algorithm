// 给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。

// 每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处：

// 0 <= j <= nums[i] 且
// i + j < n
// 返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。



// 示例 1:

// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
// 示例 2:

// 输入: nums = [2,3,0,1,4]
// 输出: 2


// 提示:

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// 题目保证可以到达 n - 1

function jump(nums: number[]): number {
  let minStep = 0;
  const n = nums.length - 1;
  let i = 0;
  while (true) {

    const next = i + nums[i]
    minStep++;
    if (next >= n) {
      return minStep
    }

    let maxNext = 0;
    for (let j = i + 1; j <= next; j++) {
      if (j + nums[j] > maxNext) {
        maxNext = j + nums[j];
        i = j
      }
    }

  }
};


function jump1(nums: number[]): number {
  if (nums.length === 1) {
    return 0
  }
  let maxPos = 0
  let step = 0
  let i = 0
  const n = nums.length
  while (true) {
    maxPos = i + nums[i]
    step++
    if (maxPos >= n - 1) {
      break
    }
    let pos = maxPos;
    for (let j = i + 1; j <= maxPos; j++) {
      if (j + nums[j] > pos) {
        pos = j + nums[j]
        i = j
      }
    }
  }
  return step
}

function jump2(nums: number[]): number {
  let maxPos = 0
  let step = 0
  let end = 0
  for (let i = 0; i < nums.length - 1; i++) {
    if (i + nums[i] > maxPos) {
      maxPos = i + nums[i]
    }
    if (end === i) {
      end = maxPos
      step++
    }
  }

  return step;
}

function jump3(nums: number[]): number {
  let step = 0
  let maxPos = 0
  const n = nums.length
  let i = 0;
  while (maxPos < n - 1) {
    maxPos = i + nums[i]
    step++
    if (maxPos >= n - 1) {
      break
    }
    let pos = maxPos
    for (let j = i + 1; j <= maxPos; j++) {
      if (pos < j + nums[j]) {
        pos = j + nums[j]
        i = j
      }
    }
  }




  return step
}


function jump4(nums: number[]): number {
  let step = 0
  let maxPos = 0
  let i = 0
  let end = 0
  const n = nums.length
  while (maxPos < n - 1) {
    for (let j = i; j <= end; j++) {
      maxPos = Math.max(j + nums[j], maxPos)
    }
    // console.log('maxPos:', maxPos)
    step++
    i = end + 1
    end = maxPos
  }

  return step
}

function jump5(nums: number[]): number {
  const n = nums.length
  if (n === 1) {
    return 0
  }
  let step = 0
  let end = 0
  let maxPos = 0
  for (let i = 0; i < n; i++) {
    maxPos = Math.max(i + nums[i], maxPos)
    if (i === end) {
      step++
      end = maxPos
      if (end >= n - 1) {
        break
      }
    }
  }

  return step
}


function jump6(nums: number[]): number {
  const n = nums.length
  let step = 0
  let end = 0
  let maxPos = 0
  for (let i = 0; end < n - 1; i++) {
    const num = nums[i]
    maxPos = Math.max(maxPos, i + num)
    if (i === end) {
      step++
      end = maxPos
    }
    // console.log(end)
  }
  return step
}

console.log(jump6([2, 3, 1, 1, 4]))
console.log(jump6([2, 3, 0, 1, 4]))
console.log(jump6([1, 3, 2]))
console.log(jump6([1, 2, 1, 1, 1]))
console.log(jump6([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]))
console.log(jump6([1, 2]))
console.log(jump6([3, 2, 1]))
console.log(jump6([0]))
