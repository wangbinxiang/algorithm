function longestConsecutive(nums: number[]): number {
  const set: Set<number> = new Set();
  let totalMaxLength = 0;
  nums.forEach((num, index) => {
    set.add(num);
  })

  for (const num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentMaxLength = 1;
      while (set.has(currentNum + 1)) {
        currentMaxLength++
        currentNum++;
      }
      if (currentMaxLength > totalMaxLength) {
        totalMaxLength = currentMaxLength;
      }
    }
  }
  return totalMaxLength;
};

console.log(longestConsecutive([1, 0, -1]));