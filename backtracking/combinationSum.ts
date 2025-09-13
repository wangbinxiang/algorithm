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

function combinationSum1(candidates: number[], target: number): number[][] {
  const n = candidates.length
  // 找到所有满01背包问题的可能
  const ans: number[][] = []
  const res: number[] = []
  const h = (first: number, num: number) => {
    // console.log(num)
    if (num === target) {
      ans.push([...res])
      return
    }
    if (num > target) {
      return
    }

    for (let i = first; i < n; i++) {
      const candidate = candidates[i]
      if (num + candidate <= target) {
        res.push(candidate)
        h(i, num + candidate)
        res.pop()
      }
    }
  }
  h(0, 0)


  return ans
}

console.log(combinationSum1([2, 3, 6, 7], 7))
console.log(combinationSum1([2, 3, 5], 8))
console.log(combinationSum1([2], 1))