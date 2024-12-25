function dailyTemperatures(temperatures: number[]): number[] {
  const res = Array(temperatures.length).fill(0);
  const tmpArr: { val: number, key: number[] }[] = [];
  const tmpMap: Map<number, number[]> = new Map;

  const tmpObj: Record<string, number[]> = {};
  for (let i = 0; i < temperatures.length; i++) {
    for (let key in tmpObj) {
      if (+key < temperatures[i]) {
        for (let v of tmpObj[key]) {
          res[v] = i - v;
        }
        delete tmpObj[key];
      }
    }

    if (tmpObj[temperatures[i]]) {
      tmpObj[temperatures[i]].push(i);
    } else {
      tmpObj[temperatures[i]] = [i];
    }
  }
  return res;
};

// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));



function dailyTemperatures1(temperatures: number[]): number[] {
  const len = temperatures.length;
  const res = Array(len).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < len; i++) {
    for (let j = stack.length - 1; j >= 0; j--) {
      if (temperatures[i] > temperatures[stack[j]]) {
        res[stack[j]] = i - stack[j];
        stack.pop();
      } else {
        break;
      }
    }
    stack.push(i);
  }


  return res;
}

console.log(dailyTemperatures1([73, 74, 75, 71, 69, 72, 76, 73]));