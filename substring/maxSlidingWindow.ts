

/**
 * 
 * @param nums 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回 滑动窗口中的最大值 。
示例 1：

输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
示例 2：

输入：nums = [1], k = 1
输出：[1]
 

提示：

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
 * @param k 
 * @returns 
 */

// 单调栈，
function maxSlidingWindow(nums: number[], k: number): number[] {
  const ans: number[] = [];
  const q: number[] = [];
  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] > nums[q[q.length - 1]]) {
      q.pop()
    }
    q.push(i)
  }
  ans.push(nums[q[0]])
  const n = nums.length;
  for (let i = k; i < n; i++) {
    while (q.length && nums[i] > nums[q[q.length - 1]]) {
      q.pop()
    }
    q.push(i)
    while (q[0] <= i - k) {
      q.shift()
    }
    ans.push(nums[q[0]])
  }

  return ans;
};

console.log(maxSlidingWindow2([1, 3, -1, -3, 5, 3, 6, 7], 3))

// console.log(maxSlidingWindow([1], 1))

// console.log(maxSlidingWindow([1, -1], 1))


function maxSlidingWindow1(nums: number[], k: number): number[] {
  const ans: number[] = [];
  // 单调队列
  const queue: number[] = [];

  for (let i = 0; i < k; i++) {
    const val = nums[i]
    if (queue.length > 0) {
      while (nums[queue[queue.length - 1]] <= val) {
        queue.pop()
      }
    }
    queue.push(i)
  }
  console.log(queue)
  ans.push(nums[queue[0]])
  const n = nums.length;
  for (let i = k; i < n; i++) {
    if (queue[0] <= i - k) {
      queue.shift()
    }
    const val = nums[i]
    if (queue.length > 0) {
      while (nums[queue[queue.length - 1]] <= val) {
        queue.pop()
      }
    }
    queue.push(i)
    ans.push(nums[queue[0]])
  }

  return ans;
}


// 单独队列
// 新的数字如果是最大的，则删除队列中比该数字小的项目
// 如果
function maxSlidingWindow2(nums: number[], k: number): number[] {
  const ans: number[] = []
  const queue: number[] = [0]
  for (let i = 1; i < k; i++) {
    while (queue.length > 0 && nums[i] > nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i)
  }
  ans.push(nums[queue[0]])
  for (let i = k; i < nums.length; i++) {
    if (i - queue[0] > k - 1) {
      queue.shift()
    }
    while (queue.length > 0 && nums[i] > nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i)
    ans.push(nums[queue[0]])
  }



  return ans
}