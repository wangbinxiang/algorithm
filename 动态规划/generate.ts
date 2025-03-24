function generate(numRows: number): number[][] {
  const ans = [[1]]
  if (numRows > 1) {
    for (let i = 1; i < numRows; i++) {
      const prev = ans[i - 1];
      const current: number[] = [];
      for (let j = 0; j <= i; j++) {
        if (j === 0) {
          current.push(prev[0])
        } else if (j === i) {
          current.push(prev[j - 1])
        } else {
          current.push(prev[j - 1] + prev[j])
        }
      }
      ans.push(current)
    }
  }

  return ans
};


console.log(generate(5))

console.log(generate(1))