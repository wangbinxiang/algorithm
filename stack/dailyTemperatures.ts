function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = []
  const n = temperatures.length;
  const ans: number[] = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let latest = stack[stack.length - 1];
    while (stack.length > 0 && temperatures[latest] < temperatures[i]) {
      ans[latest] = i - latest;
      stack.pop()
      latest = stack[stack.length - 1];
    }
    stack.push(i)
  }

  return ans;
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
console.log(dailyTemperatures([30, 40, 50, 60]))
console.log(dailyTemperatures([30, 60, 90]))

