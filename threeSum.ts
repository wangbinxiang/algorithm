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


// console.log(threeSum([0,0,0,0]));
console.log(threeSum3([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));

