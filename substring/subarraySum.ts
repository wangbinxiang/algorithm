// 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

// 子数组是数组中元素的连续非空序列。

function subarraySum(nums: number[], k: number): number {
  const result: number[] = [];
  let ans = 0;
  nums.sort((a, b) => a - b);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const target = k - i;
    if (target < 0) {
      break;
    } else if (target === 0) {
      ++ans;
    } else {

    }
  }
  // 排序
  // 

  return ans;
};


function subarraySum2(nums: number[], k: number): number {
  let ans = 0;
  const map = new Map<number, number>();
  map.set(0, 1);
  let pre = 0;
  for (let val of nums) {
    pre += val;
    if (map.has(pre - k)) {
      ans += map.get(pre - k) as number;
    }
    if (map.has(pre)) {
      map.set(pre, map.get(pre) as number + 1);
    } else {
      map.set(pre, 1);
    }
  }
  return ans;
}

function subarraySum3(nums: number[], k: number): number {
  let ans = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j >= 0; j--) {
      sum += nums[j];
      if (sum === k) {
        ans++;
      }
    }
  }
  return ans;
}


function subarraySum4(nums: number[], k: number): number {
  let ans = 0;

  let target = k;

  const n = nums.length;
  let start = 0;
  for (let i = 0; i < n; i++) {
    target -= nums[i]
    if (target === 0) {
      ans++;
    } else if (target < 0) {
      do {
        target += nums[start]
        start++
      } while (target < 0)
    }
  }


  return ans;
}


// 前缀和加hash表，
// 数组内每个值连续相加，将每次相加的结果记录到hash，用每次相加的值-k，如果结果存在于hash中，则说明可以从之前某个位置进行联系相加得到现在的位置，相加结果为k
function subarrayNext(nums: number[], k: number): number {
  const n = nums.length;

  const map = new Map()
  map.set(0, 1)
  let count = 0;
  let pre = 0;
  for (let num of nums) {
    pre += num;

    const ret = pre - k;
    if (map.has(ret)) {
      count += map.get(ret)
    }

    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    } else {
      map.set(pre, 1)
    }
    console.log(map, pre, num)
  }
  return count;
}
function subarrayNext1(nums: number[], k: number): number {
  let count = 0;

  // 枚举所有可能的子数组
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }
  return count;
}


function subarrayNext2(nums: number[], k: number): number {
  let count = 0;
  const n = nums.length;
  const map = new Map()
  map.set(0, 1)
  let pre = 0;
  for (let num of nums) {
    pre += num;

    const ret = pre - k
    if (map.has(ret)) {
      count += map.get(ret)
    }

    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    } else {
      map.set(pre, 1)
    }
  }

  return count;
}

// 提示：

// 1 <= nums.length <= 2 * 104
// -1000 <= nums[i] <= 1000
// -107 <= k <= 107

console.log(subarrayNext3([1, 1, 1], 2)); // 2
console.log(subarrayNext3([1, 2, 3], 3)); // 2
console.log(subarrayNext3([1, -1, 0], 0)); // 3
console.log(subarrayNext3([1], 0)); // 0
console.log(subarrayNext3([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0)) // 55


function subarrayNext3(nums: number[], k: number): number {
  let ans = 0
  const map = new Map<number, number>()
  map.set(0, 1)
  let current = 0;
  for (let num of nums) {
    current += num
    if (map.has(current - k)) {
      ans += map.get(current - k)
    }
    if (!map.has(current)) {
      map.set(current, 1)
    } else {
      map.set(current, map.get(current) + 1)
    }
  }

  return ans;
}




function subarraySum5(nums: number[], k: number): number {
  let ans = 0;

  const map = new Map<number, number>();
  map.set(0, 1);

  let prevCount = 0;
  for (const num of nums) {
    prevCount += num;
    if (map.has(prevCount - k)) {
      ans += map.get(prevCount - k)
    }
    let count = 1;
    if (map.has(prevCount)) {
      count += map.get(prevCount)
    }
    map.set(prevCount, count);
  }

  return ans;
};