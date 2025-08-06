// 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

import { stat } from "fs";

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

// 动态规划处理该问题
function longestValidParentheses5(s: string): number {
  let ans = 0
  const n = s.length
  const dp = Array(n).fill(0)
  for (let i = 1; i < n; i++) {
    const char = s.charAt(i)
    if (char === ')') {
      const prevChar = s.charAt(i - 1)
      if (prevChar === ')') {
        if (dp[i - 1] > 0) {
          const ppIndex = i - 1 - dp[i - 1]
          const ppChar = s.charAt(ppIndex)
          if (ppChar === '(') {
            if (dp[ppIndex - 1] > 0) {
              dp[i] = dp[i - 1] + 2 + dp[ppIndex - 1]
            } else {
              dp[i] = dp[i - 1] + 2
            }
          }
        }
      } else {
        if (i - 2 >= 0 && dp[i - 2] > 0) {
          dp[i] = dp[i - 2] + 2
        } else {
          dp[i] = 2
        }
      }
      ans = Math.max(ans, dp[i])
    }
  }
  return ans
};

// 动态规划处理该问题
function longestValidParentheses6(s: string): number {
  const n = s.length
  let ans = 0
  const dp: number[] = Array(n).fill(0)
  for (let i = 1; i < n; i++) {
    const char = s.charAt(i)
    if (char === ')') {
      let current = 0
      if (s.charAt(i - 1) === '(') {
        current = 2 + (dp[i - 2] ?? 0)
      } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) === '(') {
        current = 2 + dp[i - 1] + (dp[i - dp[i - 1] - 2] ?? 0)
      }
      dp[i] = current
      ans = Math.max(ans, current)
    }
  }

  return ans
}

function longestValidParenthesesStack(s: string): number {
  let ans = 0
  const stack: number[] = [-1]// 初始化-1 防治前两个就是有效括号导致栈变空
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length === 0) {
        stack.push(i)
      } else {
        const current = i - stack[stack.length - 1]
        ans = Math.max(ans, current)
      }
    }
  }

  return ans
}

// 初始化一个栈，栈底填入 -1, 方便处理前两个括号就匹配的情况
// 当前字符是'('时，压入当前位置i
// 当前字符是')'是，先弹出栈顶元素
// 然后判断，如果栈为空则，压入当前位置i，
// 如果不为空，则用当前位置i减去栈顶值，则获得到当前位置i最长的连续数组
function longestValidParenthesesStack1(s: string): number {
  let ans = 0
  const stack: number[] = [-1]
  const n = s.length
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length === 0) {
        stack.push(i)
      } else {
        ans = Math.max(ans, i - stack[stack.length - 1])
      }
    }
  }


  return ans
}
// 双指针
// l = 0, r = 0
// 先从左向右判断
// 当 遇到'('时, l++, 当遇到 ')' 时r++
// 如果 l === r, 则满足括号匹配的条件，当前联系括号长度 l + r
// 如果 r > l，则说明左侧的括号已经不可能匹配，设置l = r = 0，开始重新匹配
// 再从右向左判断
// 照上述做法重新做一遍，就是括号左右判断换一下方向
function longestValidParenthesesPointer(s: string): number {
  let ans = 0
  const n = s.length
  let l = 0
  let r = 0
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      l++
    } else {
      r++
      if (l === r) {
        ans = Math.max(ans, l + r)
      } else if (r > l) {
        l = 0
        r = 0
      }
    }
  }
  l = 0
  r = 0

  for (let i = n - 1; i >= 0; i--) {
    const char = s.charAt(i)
    if (char === ')') {
      r++
    } else {
      l++
      // console.log('l:', l)
      // console.log('r:', r)
      if (l === r) {
        ans = Math.max(ans, l + r)
      } else if (l > r) {
        l = 0
        r = 0
      }
    }
  }


  return ans
}
console.log(longestValidParentheses6('(()(((()')) // 2

console.log(longestValidParentheses6('(()')) // "()" 2
console.log(longestValidParentheses6(')()())')) // "()()" 4
console.log(longestValidParentheses6('')) // 0
console.log(longestValidParentheses6('()(()')) // 2
console.log(longestValidParentheses6('()(())')) // 6
