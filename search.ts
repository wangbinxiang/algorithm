// 整数数组 nums 按升序排列，数组中的值 互不相同 。

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

function search(nums: number[], target: number): number {
  let ans = -1;

  const dfs = (l: number, r: number) => {
    // console.log('l:', l, ' r:', r);
    if (l > r) {
      return;
    }
    const m = ((r - l) >> 1) + l;
    const mVal = nums[m];
    // console.log(m, mVal);
    if (target === mVal) {
      ans = m;
      return;
    }
    dfs(l, m - 1)
    dfs(m + 1, r)
  }
  dfs(0, nums.length - 1)
  return ans;
};

function search1(nums: number[], target: number): number {
  let ans = -1;

  const queue: { l: number, r: number }[] = [{ l: 0, r: nums.length - 1 }];
  while (queue.length > 0) {
    const range = queue.shift()!;
    if (range.l > range.r) {
      continue;
    }
    const m = ((range.r - range.l) >> 1) + range.l;
    const mVal = nums[m];
    if (mVal === target) {
      ans = m;
      break;
    }
    queue.push({ l: range.l, r: m - 1 })
    queue.push({ l: m + 1, r: range.r })
  }
  return ans;
};



console.log(search1([4, 5, 6, 7, 0, 1, 2], 0))
console.log(search1([4, 5, 6, 7, 0, 1, 2], 3))
console.log(search1([1], 0))
