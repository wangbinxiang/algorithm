// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

function subsets(nums: number[]): number[][] {
  const ans: number[][] = []
  const output: number[] = [];
  const n = nums.length;


  const dfs = (start: number) => {
    ans.push([...output]);
    for (let i = start; i < n; i++) {
      output.push(nums[i])
      dfs(i + 1)
      output.pop();
    }
  }

  dfs(0);
  return ans;
};


function subsets1(nums: number[]): number[][] {
  const ans: number[][] = []
  const n = nums.length;
  const help = (first: number, result: number[]) => {
    ans.push(result)

    for (let i = first; i < n; i++) {
      help(i + 1, [...result, nums[i]])
    }
  }

  help(0, [])

  return ans;
}


function subsets2(nums: number[]): number[][] {
  const ans: number[][] = [];
  const n = nums.length;
  const arr: number[] = [];

  const dfs = (start: number) => {
    ans.push([...arr])
    for (let i = start; i < n; i++) {
      arr.push(nums[i]);
      dfs(i + 1);
      arr.pop();
    }
  }

  dfs(0);
  return ans;
};


function subsets3(nums: number[]): number[][] {
  const ans: number[][] = [];
  const tmp: number[] = [];
  const n = nums.length;


  const dfs = (start: number) => {

    ans.push([...tmp]);
    if (start === n) {
      return;
    }

    for (let i = start; i < n; i++) {
      tmp.push(nums[i]);
      dfs(i + 1)
      tmp.pop();
    }
  }

  dfs(0);
  return ans;
};


function subsets4(nums: number[]): number[][] {
  const ans: number[][] = [];
  const tmp: number[] = [];
  const n = nums.length;

  const dfs = (start: number) => {
    ans.push([...tmp]);
    if (start === n) {
      return;
    }
    for (let i = start; i < n; i++) {
      tmp.push(nums[i]);
      dfs(i + 1);
      tmp.pop();
    }
  }

  dfs(0);

  return ans;
};


// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]


console.log(subsets2([1, 2, 3]));

