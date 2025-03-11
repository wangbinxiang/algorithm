function permute(nums: number[]): number[][] {
  const ans: number[][] = [];

  const n = nums.length;
  const output: number[] = [...nums];


  const dfs = (first: number) => {
    if (first === n) {
      ans.push([...output])
    }

    for (let i = first; i < n; i++) {
      [output[i], output[first]] = [output[first], output[i]];
      dfs(first + 1);
      [output[i], output[first]] = [output[first], output[i]];
    }
  }

  dfs(0)

  return ans;
};


console.log(permute([1, 2, 3])); 