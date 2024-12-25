function twoSum(nums: number[], target: number): number[] {
  const map: Record<string, number> = {};
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const key = target - value;
    if (map[key.toString()] !== undefined) {
      const findValue = map[key.toString()]
      return [i, findValue];
    }
    map[value.toString()] = i;
  }
  return [];
};
console.log(twoSum([2, 7, 11, 15], 9));