// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。



// 示例 1：

// 输入：nums = [2,3,2]
// 输出：3
// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
// 示例 2：

// 输入：nums = [1,2,3,1]
// 输出：4
// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
//      偷窃到的最高金额 = 1 + 3 = 4 。
// 示例 3：

// 输入：nums = [1,2,3]
// 输出：3


// 提示：

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 1000


function rob2(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0]
  }
  if (nums.length === 2) {
    return Math.max(nums[0], nums[1])
  }
  if (nums.length === 3) {
    return Math.max(nums[0], nums[1], nums[2])
  }

  let p1 = nums[0] + nums[2]
  let pp1 = Math.max(nums[1], nums[0])
  let p2 = nums[2]
  let pp2 = nums[1]
  console.log(p1, pp1, p2, pp2)
  const n = nums.length
  for (let i = 3; i < n - 1; i++) {
    const tmp1 = Math.max(p1, pp1)
    p1 = pp1 + nums[i]
    pp1 = tmp1
    const tmp2 = Math.max(p2, pp2)
    p2 = pp2 + nums[i]
    pp2 = tmp2
    console.log(p1, pp1, p2, pp2, i)
  }



  const tmp2 = Math.max(p2, pp2)
  p2 = pp2 + nums[n - 1]
  pp2 = tmp2


  console.log(p1, pp1, p2, pp2)


  return Math.max(p1, pp1, p2, pp2)
};


// console.log(rob2([2, 3, 2])) // 3
// console.log(rob2([1, 2, 3, 1])) // 4
// console.log(rob2([1, 2, 3])) // 3
// console.log(rob2([1, 2, 1, 1])) // 3
// console.log(rob2([1, 3, 1, 3, 100])) // 103
console.log(rob2([4, 1, 2, 7, 5, 3, 1])) // 14