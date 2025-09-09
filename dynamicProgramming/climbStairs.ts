function climbStairs(n: number): number {
  if (n <= 2) {
    return n;
  }
  let ans = 2;
  let prev = 1;
  let tmp = 0;
  for (let i = 2; i < n; i++) {
    tmp = ans;
    ans = prev + ans
    prev = tmp
  }

  return ans;
};


function climbStairs1(n: number): number {
  if (n <= 1) {
    return n
  }
  let prev = 1
  let current = 2
  for (let i = 2; i < n; i++) {
    const tmp = current
    current += prev
    prev = tmp
  }
  return current
}

console.log(climbStairs1(2))
console.log(climbStairs1(3))
console.log(climbStairs1(4))
console.log(climbStairs1(5))