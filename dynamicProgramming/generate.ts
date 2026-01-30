function generate(numRows: number): number[][] {
  const ans = [[1]];
  if (numRows > 1) {
    for (let i = 1; i < numRows; i++) {
      const prev = ans[i - 1];
      const current: number[] = [];
      for (let j = 0; j <= i; j++) {
        if (j === 0) {
          current.push(prev[0]);
        } else if (j === i) {
          current.push(prev[j - 1]);
        } else {
          current.push(prev[j - 1] + prev[j]);
        }
      }
      ans.push(current);
    }
  }

  return ans;
}

function generate1(numRows: number): number[][] {
  const ans: number[][] = [[1]];

  for (let i = 1; i < numRows; i++) {
    const row: number[] = Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = ans[i - 1][j - 1] + ans[i - 1][j];
    }
    ans.push(row);
  }

  return ans;
}

function generate2(numRows: number): number[][] {
  const ans: number[][] = [[1]];
  for (let i = 1; i < numRows; i++) {
    const arr = Array(i + 1).fill(1);
    const prevArr = ans[ans.length - 1];
    for (let j = 1; j < i; j++) {
      const count = prevArr[j - 1] + prevArr[j];
      arr[j] = count;
    }
    ans.push(arr);
  }
  return ans;
}

console.table(generate(5));

console.table(generate(1));
