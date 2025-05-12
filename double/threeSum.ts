// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  let i = 0;
  let j = nums.length - 1;
  const result: number[][] = [];
  while (i !== j) {
    let count = nums[i] + nums[j];
    if (count < 0) {
      for (let k = j - 1; k > i; k--) {
        while (nums[k] === nums[k + 1]) {
          break;
        }
        if (count + nums[k] === 0) {
          result.push([nums[i], nums[k], nums[j]]);
        }
        if (count + nums[k] > 0) {
          break;
        }
      }
      i++;
      // while(nums[i - 1] === nums[i] && i !== j) {
      //   i++;
      // }
    } else {
      for (let k = i + 1; k < j; k++) {
        while (nums[k] === nums[k - 1]) {
          break;
        }
        if (count + nums[k] === 0) {
          result.push([nums[i], nums[k], nums[j]]);
        }
        if (count + nums[k] > 0) {
          break;
        }
      }
      j--;
      // while(nums[j+1] === nums[j] && i !== j) {
      //   j--;
      // }
    }
  }


  return result;
};

function threeSum1(nums: number[]): number[][] {
  const result: number[][] = [];
  let n = nums.length - 1;
  nums.sort((a, b) => a - b);
  console.log(nums);
  for (let first = 0; first < n; ++first) {
    if (nums[first - 1] === nums[first]) {
      continue;
    }
    let third = n;
    const target = -nums[first];
    for (let second = first + 1; second < third;) {
      const tmpTarget = nums[second] + nums[third];
      if (tmpTarget === target) {
        result.push([nums[first], nums[second], nums[third]]);
        second++;
        while (nums[second - 1] === nums[second]) {
          second++;
        }
      } else if (tmpTarget > target) {
        third--;
        while (nums[third + 1] === nums[third]) {
          third--;
        }
      } else {
        second++;
        while (nums[second - 1] === nums[second]) {
          second++;
        }
      }
    }
  }


  return result;
}

function threeSum3(nums: number[]): number[][] {
  const result: number[][] = [];
  let n = nums.length - 1;
  nums.sort((a, b) => a - b);
  for (let first = 0; first <= n; ++first) {
    if (nums[first - 1] === nums[first]) {
      continue;
    }
    let third = n;
    const target = -nums[first];
    for (let second = first + 1; second <= n; second++) {
      if (second > first + 1 && nums[second] === nums[second - 1]) {
        continue;
      }

      while (second < third && nums[second] + nums[third] > target) {
        third--;
      }

      if (second === third) {
        break;
      }

      if (nums[second] + nums[third] === target) {
        result.push([nums[first], nums[second], nums[third]]);
      }
    }
  }


  return result;
}



// 首先排序， 
function threeSum4(nums: number[]): number[][] {
  const ans: number[][] = [];
  const n = nums.length;
  if (n < 3) {
    return ans
  }

  nums.sort((a, b) => a - b)

  // console.log(nums);

  for (let i = 0; i < n - 2; i++) {
    let target = - nums[i];
    let l = i + 1;
    let r = n - 1
    while (l < r) {
      const res = nums[l] + nums[r];
      if (res === target) {
        // console.log(i, l, r)
        ans.push([nums[i], nums[l], nums[r]])
        do {
          l++
        } while (nums[l - 1] === nums[l] && l < r)
      } else if (res < target) {
        do {
          l++
        } while (nums[l - 1] === nums[l] && l < r)
      } else if (res > target) {

        do {
          r--
        } while (nums[r + 1] === nums[r] && l < r)
      }
    }
    while (nums[i] === nums[i + 1]) {
      i++;
    }
  }
  return ans;
}

console.log(threeSum4([-1, 0, 1, 2, -1, -4])); //[[-1, -1, 2], [-1, 0, 1]]
console.log(threeSum4([0, 1, 1]));
console.log(threeSum4([0, 0, 0, 0]));
console.log(threeSum4([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));

