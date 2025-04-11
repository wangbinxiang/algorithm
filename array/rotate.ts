// 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。



// 示例 1:

// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]
// 示例 2:

// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释: 
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]


// 提示：

// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105


// 进阶：

// 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
// 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  const n = nums.length;
  if (k === 0 || k === n || n === 1) {
    return;
  }
  let kt = k
  if (kt > n) {
    kt = kt % n;
  }

  let i = 0;
  let count = 0;
  let readTmp = nums[0];
  let saveTmp = 0;
  let start = 0;
  while (count < n) {
    // 求当前临时数据索引位
    let p = i + kt;
    if (p >= n) {
      p = p % n;
    }
    // console.log(`i:${i}, p:${p}`);
    saveTmp = nums[p];
    nums[p] = readTmp;
    readTmp = saveTmp;
    count++;
    if (p !== start) {
      i = p;
    } else {
      ++i;
      start = i;
      readTmp = nums[i];
    }
  }
};

function rotate2(nums: number[], k: number): void {
  // 利用队列 先进后出

  const n = nums.length;
  if (k === 0 || k === n || n === 1) {
    return;
  }
  const queue: number[] = [];
  let kt = k
  if (kt > n) {
    kt = kt % n;
  }
  // console.log("kt:", kt)
  for (let i = 0; i < n; i++) {
    let index = i - kt;
    if (index < 0) {
      index += n;
    }
    // console.log(index);
    const val = nums[index];
    queue.push(val);
  }
  // console.log(queue);
  queue.forEach((val, index,) => nums[index] = val);

}

const rotate3 = (nums: number[], k: number): void => {
  const n = nums.length;
  const arr: number[] = [];
  nums.forEach((val, index) => {
    arr[(index + k) % n] = val;
  })
  arr.forEach((val, index) => {
    nums[index] = val;
  })
}

const rotate4 = (nums: number[], k: number): void => {
  const n = nums.length;
  const nk = k % n;

  let start = 0;
  let position = 0;
  let current = nums[position];
  let prev = nums[position];
  for (let i = 0; i < n; i++) {
    const next = (position + k) % n;
    current = nums[next];
    nums[next] = prev;
    prev = current;
    position = next;
    if (next === start) {
      start = start + 1;
      position = start;
      prev = nums[position];
    }
  }
}

const rotate5 = (nums: number[], k: number): void => {
  const n = nums.length;
  const nk = k % n;
  const reverse = (start: number, end: number) => {
    while (start < end) {
      [nums[end], nums[start]] = [nums[start], nums[end]];
      start++;
      end--;
    }
  }
  reverse(0, n - 1);
  reverse(0, nk - 1);
  reverse(nk, n - 1);
}

let a = [1, 2, 3, 4, 5, 6, 7];
rotate5(a, 3)
console.log(a);
let b = [-1, -100, 3, 99];
rotate5(b, 2);
console.log(b);
let c = [1, 2];
rotate5(c, 3);
console.log(c);