// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。

// 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。

// 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

// 二分查找，多一个数的区间大
// 环形链表
// 二进制处理，多一个数的位数1多
function findDuplicate(nums: number[]): number {
  const n = nums.length;

  let l = 1;
  let r = n - 1;
  let ans = -1;
  while (l < r) {
    const mid = l + ((r - l) >> 1) //(l + r) >> 1
    let count = 0
    for (let num of nums) {
      if (num <= mid) {
        count++
      }
    }
    // console.log(l, r, mid, count)
    if (count > mid) {
      r = mid - 1
      ans = mid
    } else {
      l = mid + 1
    }
  }

  return ans
};


// 转换成环形链表问题

function findDuplicate1(nums: number[]): number {
  let slow = 0;
  let fast = 0;

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
  while (slow !== fast)
  // console.log('slow', slow)
  // console.log('fast', fast)
  slow = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  // console.log('slow', slow)
  // console.log('fast', fast)


  return slow;
}


function findDuplicate2(nums: number[]): number {
  let slow = 0
  let fast = 0
  do {
    fast = nums[nums[fast]]
    slow = nums[slow]
  } while (slow !== fast)

  slow = 0
  while (slow !== fast) {
    fast = nums[fast]
    slow = nums[slow]
  }



  return slow
}


// 看出环形链表
function findDuplicate3(nums: number[]): number {
  let slow = 0
  let fast = 0

  do {
    slow = nums[slow]
    fast = nums[nums[fast]]
  } while (slow !== fast)

  slow = 0
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[fast]
  }

  return slow
}


console.log(findDuplicate2([1, 3, 4, 2, 2]))
console.log(findDuplicate2([3, 1, 3, 4, 2]))
console.log(findDuplicate2([3, 3, 3, 3, 3]))