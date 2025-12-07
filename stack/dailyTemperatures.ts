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

function dailyTemperatures1(temperatures: number[]): number[] {
  const n = temperatures.length;
  const ans: number[] = Array(n).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    const tmp = temperatures[i];
    while (stack.length) {
      const top = stack[stack.length - 1];
      if (temperatures[top] < tmp) {
        stack.pop();
        ans[top] = (i - top)
      } else {
        break;
      }
    }
    stack.push(i);
  }
  return ans;
};

function dailyTemperatures2(temperatures: number[]): number[] {

  const n = temperatures.length;
  const ans: number[] = Array(n).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < n; i++) {
    const temp = temperatures[i];
    while (stack.length) {
      const top = stack[stack.length - 1];
      const preTemp = temperatures[top];
      if (temp > preTemp) {
        ans[top] = i - top;
      } else {
        break;
      }
      stack.pop();
    }
    stack.push(i);
  }


  return ans;
};

function dailyTemperatures3(temperatures: number[]): number[] {
  const n = temperatures.length;
  const ans: number[] = Array(n).fill(0);
  const stack: number[] = [0];

  for (let i = 1; i < n; i++) {
    const temperature = temperatures[i];
    while (stack.length) {
      const top = stack[stack.length - 1];
      const topTemp = temperatures[top];
      if (topTemp < temperature) {
        const day = i - top;
        ans[top] = day;
        stack.pop()
      } else {
        break;
      }
    }
    stack.push(i);
  }
  // console.log(stack);


  return ans;
};

console.log(dailyTemperatures2([73, 74, 75, 71, 69, 72, 76, 73]))
console.log(dailyTemperatures2([30, 40, 50, 60]))
console.log(dailyTemperatures2([30, 60, 90]))

