// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

// 对于给定的输入，保证和为 target 的不同组合数少于 150 个。



// 示例 1：

// 输入：candidates = [2,3,6,7], target = 7
// 输出：[[2,2,3],[7]]
// 解释：
// 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
// 7 也是一个候选， 7 = 7 。
// 仅有这两种组合。
// 示例 2：

// 输入: candidates = [2,3,5], target = 8
// 输出: [[2,2,2,2],[2,3,3],[3,5]]
// 示例 3：

// 输入: candidates = [2], target = 1
// 输出: []

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

function combinationSum2(candidates: number[], target: number): number[][] {
  const ans: number[][] = [];
  let sum = 0;
  let arr: number[] = [];
  const n = candidates.length;

  const dfs = (start: number) => {
    if (sum === target) {
      ans.push([...arr]);
      return;
    }

    for (let i = start; i < n; i++) {
      const c = candidates[i];
      if (sum + c <= target) {
        sum += c;
        arr.push(c);
        dfs(i);
        sum -= c;
        arr.pop();
      }
    }
  }
  dfs(0);


  return ans;
};


function combinationSum3(candidates: number[], target: number): number[][] {
  const ans: number[][] = [];
  const tmp: number[] = [];
  const n = candidates.length;

  const dfs = (count: number, start: number) => {
    if (count === target) {
      ans.push([...tmp])
      return;
    }
    if (count > target) {
      return;
    }
    for (let i = start; i < n; i++) {
      const num = candidates[i];
      tmp.push(num);
      dfs(count + num, i);
      tmp.pop();
    }
  }

  dfs(0, 0);


  return ans;
};



function combinationSum4(candidates: number[], target: number): number[][] {
  const ans: number[][] = [];
  const n = candidates.length;

  const tmp: number[] = [];
  const dfs = (start: number, count: number) => {
    if (count >= target) {
      if (count === target) {
        ans.push([...tmp]);
      }
      return;
    }
    for (let i = start; i < n; i++) {
      const num = candidates[i];
      tmp.push(num);
      dfs(i, count + num);
      tmp.pop();
    }
  }
  dfs(0, 0);

  return ans;
};

console.log(combinationSum3([2, 3, 6, 7], 7))
console.log(combinationSum3([2, 3, 5], 8))
console.log(combinationSum3([2], 1))