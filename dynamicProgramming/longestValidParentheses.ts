// 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

function longestValidParentheses(s: string): number {
  let ans = 0;
  const n = s.length;
  const stack: string[] = [];
  let prev = 0;
  let current = 0
  let prevLen = 0
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      stack.push(char)
    } else {
      const popChar = stack.pop()
      if (popChar === '(') {
        current += 2
        if (stack.length === prevLen) {
          // 连接prev current
          ans = Math.max(ans, current + prev);
          prev = current
          current = 0
          prevLen = stack.length
        } else {
          ans = Math.max(ans, current);
          stack.length === prevLen
        }
      } else {
        // ans = Math.max(ans, current);
        current = 0
        prev = 0
      }
    }
  }
  return Math.max(ans, current);
};

function longestValidParentheses1(s: string): number {
  let max = 0;
  const n = s.length;
  const stack: number[] = [-1];

  for (let i = 0; i < n; i++) {
    const char = s.charAt(i);
    if (char === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length === 0) {
        // 新基座
        stack.push(i)
      } else {
        max = Math.max(max, i - stack[stack.length - 1])
      }
    }
  }

  return max;
}


function longestValidParentheses2(s: string): number {
  let max = 0;
  const n = s.length;

  const dp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (s.charAt(i) === ')') {
      if (s.charAt(i - 1) === '(') {
        dp[i] = 2 + (i - 2 >= 0 ? dp[i - 2] : 0);
      } else if (dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) === '(') {
        dp[i] = dp[i - 1] + 2 + ((i - dp[i - 1] - 2) >= 0 ? dp[i - dp[i - 1] - 2] : 0)
      }
      max = Math.max(max, dp[i])
    }
  }
  return max
}

function longestValidParentheses3(s: string): number {
  let max = 0;
  const stack: number[] = [-1];
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (s.charAt(i) === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length === 0) {
        stack.push(i)
      } else {
        const val = i - stack[stack.length - 1];
        max = Math.max(max, val)
      }
    }
  }
  return max;
}


function longestValidParentheses4(s: string): number {
  let max = 0;
  let left = 0;
  let right = 0
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (s.charAt(i) === '(') {
      left++;
    } else {
      right++;
    }
    if (right > left) {
      left = 0;
      right = 0
    } else if (right === left) {
      max = Math.max(max, left + right)
    }
  }

  left = 0
  right = 0

  for (let i = n - 1; i >= 0; i--) {
    if (s.charAt(i) === '(') {
      left++;
    } else {
      right++;
    }
    if (left > right) {
      left = 0;
      right = 0
    } else if (right === left) {
      max = Math.max(max, left + right)
    }
  }




  return max;
}

console.log(longestValidParentheses4('(()(((()')) // 2

console.log(longestValidParentheses4('(()')) // "()"
console.log(longestValidParentheses4(')()())')) // "()()"
console.log(longestValidParentheses4('')) // 0
console.log(longestValidParentheses4('()(()')) // 2
