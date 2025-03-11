function searchInsert(nums: number[], target: number): number {

  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    if (target > nums[0]) {
      return 1
    } else if (target === nums[0]) {
      return 0;
    } else {
      return 0;
    }
  }

  let start = 0;
  let end = n - 1;
  while (true) {
    const mid = (start + end) >> 1;
    // console.log('mid:', mid)
    // console.log('start:', start)
    // console.log('end:', end)
    const midVal = nums[mid];
    if (midVal === target) {
      return mid
    } else if (midVal < target) {




      if (mid === end) {
        // console.log('return end + 1')
        return end + 1
      } else if (end - start === 1) {
        if (target > nums[end]) {
          // console.log('return mid')
          return end + 1;
        } else if (target > nums[start]) {
          // console.log('return start + 1')
          return start + 1
        }
      }
      // else if (mid === start) {
      //   console.log('return mid + 1')
      //   return mid + 1
      // } 
      else {
        start = mid
      }
    } else {
      if (start === mid) {
        // console.log('return start')
        return start
      } else {
        end = mid
      }
    }
  }

};

function searchInsert1(nums: number[], target: number): number {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let start = 0;
  let end = n - 1;
  while (true) {
    const mid = ((end - start) >> 1) + start;
    const midVal = nums[mid];
    console.log('mid:', mid);
    console.log('start:', start);
    console.log('end:', end);
    if (midVal === target) {
      return mid
    } else if (start === end) {
      if (target > midVal) {
        return end + 1;
      } else {
        return end;
      }
    } else if (midVal > target) {
      end = mid;
    } else if (midVal < target) {
      start = mid + 1;
    }
  }
}


function searchInsert2(nums: number[], target: number): number {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let start = 0;
  let end = n - 1;
  while (start <= end) {
    const mid = ((end - start) >> 1) + start;
    const midVal = nums[mid];
    if (midVal === target) {
      return mid
    } else if (midVal < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return start
}

console.log(searchInsert2([1, 3, 5, 6], 5))
console.log(searchInsert2([1, 3, 5, 6], 2))
console.log(searchInsert2([1, 3, 5, 6], 7))
console.log(searchInsert2([1, 3], 1))
console.log(searchInsert2([1, 3], 0))