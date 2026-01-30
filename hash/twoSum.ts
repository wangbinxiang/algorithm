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


function twoSum1(nums: number[], target: number): number[] {
  const hash = new Map<number, number>()
  hash.set(nums[0], 0)
  for (let i = 1; i < nums.length; i++) {
    const findKey = target - nums[i]
    if (hash.has(findKey)) {
      return [i, hash.get(findKey)!]
    }
    hash.set(nums[i], i)
  }

  return []
}


function twoSum2(nums: number[], target: number): number[] {
  const ans: number[] = [];

  const map: Map<number, number> = new Map();
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    const t = target - num;
    if (map.has(t)) {
      return [i, map.get(t)]
    }
    map.set(num, i);
  }
};


console.log(twoSum1([2, 7, 11, 15], 9));