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

console.log(climbStairs(2))
console.log(climbStairs(3))
console.log(climbStairs(4))
console.log(climbStairs(5))