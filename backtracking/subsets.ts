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

// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]


console.log(subsets([1, 2, 3]));

