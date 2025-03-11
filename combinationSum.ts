function combinationSum(candidates: number[], target: number): number[][] {
  const ret: number[][] = [];
  const ans: number[] = [];
  const n = candidates.length;

  const dfs = (i: number, start: number) => {
    if (i === target) {
      ret.push([...ans]);
      return;
    }
    for (let j = start; j < n; j++) {
      const val = candidates[j];
      if (i + val <= target) {
        ans.push(candidates[j])
        dfs(i + val, j)
        ans.pop()
      }
    }
  }

  dfs(0, 0);
  return ret;
};

console.log(combinationSum([2, 3, 6, 7], 7))
console.log(combinationSum([2], 1))