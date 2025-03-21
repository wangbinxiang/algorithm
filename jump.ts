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


console.log(jump([2, 3, 1, 1, 4]))
console.log(jump([2, 3, 0, 1, 4]))
console.log(jump([1, 3, 2]))
console.log(jump([1, 2, 1, 1, 1]))
console.log(jump([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]))
console.log(jump([1, 2]))
console.log(jump([3, 2, 1]))
