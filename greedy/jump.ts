function jump(nums: number[]): number {
  let minStep = 0;
  const n = nums.length - 1;
  let i = 0;
  while (true) {

    const next = i + nums[i]
    minStep++;
    if (next >= n) {
      return minStep
    }

    let maxNext = 0;
    for (let j = i + 1; j <= next; j++) {
      if (j + nums[j] > maxNext) {
        maxNext = j + nums[j];
        i = j
      }
    }

  }
};


function jump1(nums: number[]): number {
  if (nums.length === 1) {
    return 0
  }
  let maxPos = 0
  let step = 0
  let i = 0
  const n = nums.length
  while (true) {
    maxPos = i + nums[i]
    step++
    if (maxPos >= n - 1) {
      break
    }
    let pos = maxPos;
    for (let j = i + 1; j <= maxPos; j++) {
      if (j + nums[j] > pos) {
        pos = j + nums[j]
        i = j
      }
    }
  }
  return step
}

function jump2(nums: number[]): number {
  let maxPos = 0
  let step = 0
  let end = 0
  for (let i = 0; i < nums.length - 1; i++) {
    if (i + nums[i] > maxPos) {
      maxPos = i + nums[i]
    }
    if (end === i) {
      end = maxPos
      step++
    }
  }

  return step;
}

function jump3(nums: number[]): number {
  let step = 0
  let maxPos = 0
  const n = nums.length
  let i = 0;
  while (maxPos < n - 1) {
    maxPos = i + nums[i]
    step++
    if (maxPos >= n - 1) {
      break
    }
    let pos = maxPos
    for (let j = i + 1; j <= maxPos; j++) {
      if (pos < j + nums[j]) {
        pos = j + nums[j]
        i = j
      }
    }
  }




  return step
}

console.log(jump3([2, 3, 1, 1, 4]))
console.log(jump3([2, 3, 0, 1, 4]))
console.log(jump3([1, 3, 2]))
console.log(jump3([1, 2, 1, 1, 1]))
console.log(jump3([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]))
console.log(jump3([1, 2]))
console.log(jump3([3, 2, 1]))
console.log(jump3([0]))
