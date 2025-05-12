function searchRange(nums: number[], target: number): number[] {
  const ans: number[] = [-1, -1];
  let left = 0;
  let right = nums.length - 1;
  let m = -1;
  while (left <= right) {
    const mid = ((right - left) >> 1) + left;
    const midVal = nums[mid];
    if (midVal === target) {
      m = mid;
      break;
    } else if (midVal > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (m !== -1) {
    let l = left;
    let r = m;
    while (l <= r) {
      const mid = ((r - l) >> 1) + l;
      const mVal = nums[mid];
      if (target === mVal) {
        ans[0] = mid;
        r = mid - 1;
      } else if (target < mVal) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }


    l = m;
    r = right;
    while (l <= r) {
      const mid = ((r - l) >> 1) + l;
      const mVal = nums[mid];
      if (target === mVal) {
        ans[1] = mid;
        l = mid + 1;
      } else if (target < mVal) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
  }
  console.log(left, m, right);


  return ans;
};


console.log(searchRange([5, 7, 7, 8, 8, 10], 8)) // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)) // [-1, -1]
console.log(searchRange([], 0))