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


function longestValidParentheses7(s: string): number {
  let ans = 0;
  const n = s.length;
  // const dp = Array(n + 1).fill(0);
  let right = 0;
  let left = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      left++;
    } else {
      right++;

      if (right === left) {
        if (ans < right) {
          ans = right;
        }
      } else if (right > left) {
        right = 0;
        left = 0;
      }
    }
    // console.log('left:', left, ' right:', right, s[i - 1]);
  }
  right = left = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === ')') {
      right++;
    } else {
      left++;
      if (left === right) {
        if (ans < left) {
          ans = left;
        }
      } else if (left > right) {
        left = 0;
        right = 0;
      }
    }
  }


  return ans * 2;
};


function longestValidParentheses8(s: string): number {
  let ans = 0;
  const n = s.length;
  const dp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        dp[i] = 2 + dp[i - 2];
      } else if (dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        dp[i] = 2 + dp[i - 1] + dp[i - dp[i - 1] - 2];
      }
      if (ans < dp[i]) {
        ans = dp[i];
      }
    }
  }



  return ans;
};

// 动态规划
// 如果是 )
// 判断前一个
// 如果是( 长度+2 再判断 (之前的位置，如何dp[之前的位置] > 0，则加上该值为当前括号长度
// 如果是), 并且dp[)位置]的值 > 0,则判断减去该值的位置是不是')' 在判断dp[)位置]的值 之前的位置 如果dp也大于0，则也加上

// 栈
// 栈底先压入-1，适配前两个就是合格括号，
// 当前是 ( 压入位置到栈
// 当前是 )， 先弹出栈顶，
// 如果栈为空，则压入当前位置进栈
// 如果不为空，则用当前位置减去栈顶位置就是合法括号长度


// 双指针 双向遍历
// 初始化left = right = 0
// 从左先右遍历
// 当前是（ left++
// 当前是 ) right++
// 如果left === right 则合法括号长度是left + right
// 如果right > left,则左边已经无法形成合法括号，设置left = right = 0

// 从右先左遍历
// 当前是（ left++
// 当前是 ) right++
// 如果left === right 则合法括号长度是left + right
// 如果left > right,则左边已经无法形成合法括号，设置left = right = 0




// 动态规划
// 遇到 '(' 位置计0
// 遇到 ')'
// 如果前面位置是'(', 则位置值+2，再加上前面的前面的值

// 栈
// 栈底初始化-1，防止前两个就是有效括号的问题
// 遇到 '(' 压入
// 遇到 ')' 弹出
// 当前位置减去 栈顶就是有效长度
// 如果栈为空则压入当前位置

function longestValidParenthesesDp1(s: string): number {
  let ans = 0

  const n = s.length;
  const dp: number[] = Array(n).fill(0);

  for (let i = 1; i < n; i++) {
    const char = s.charAt(i)
    if (char === ')') {
      if (s.charAt(i - 1) === '(') {
        dp[i] = 2 + (i - 2 >= 0 ? dp[i - 2] : 0)
        ans = Math.max(ans, dp[i])
      } else if (dp[i - 1] > 0) {
        const c = s.charAt(i - dp[i - 1] - 1)
        if (c === '(') {
          dp[i] = 2 + dp[i - 1] + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0)
          ans = Math.max(ans, dp[i])
        }
      }
    }
  }
  console.log(dp)
  return ans
}


function longestValidParenthesesStack2(s: string): number {
  let ans = 0
  const stack: number[] = [-1]
  const n = s.length
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    if (char === ')') {
      const pop = stack.pop()
      const popChar = s.charAt(pop)
      if (popChar === '(') {
        ans = Math.max(ans, i - stack[stack.length - 1])
        continue
      }
    }
    stack.push(i)
  }
  return ans
}

function longestValidParenthesesPointer1(s: string): number {
  let ans = 0
  let left = 0
  let right = 0
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      left++
    } else {
      right++
      if (left === right) {
        ans = Math.max(ans, left + right)
      } else if (right > left) {
        left = right = 0
      }
    }
  }
  left = right = 0

  for (let i = n - 1; i >= 0; i--) {
    const char = s.charAt(i)
    if (char === ')') {
      right++
    } else {
      left++
      if (left === right) {
        ans = Math.max(ans, left + right)
      } else if (left > right) {
        left = right = 0
      }
    }
  }


  return ans
}


function longestValidParenthesesStack3(s: string): number {
  const stack: number[] = [-1];
  let ans = 0;

  const n = s.length;
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      console.log(stack);
      stack.pop();
      if (stack.length > 0) {
        const count = i - stack[stack.length - 1];
        if (count > ans) {
          ans = count;
        }
      } else {
        stack.push(i);
      }
    }
  }
  console.log(stack);

  return ans;
};


function longestValidParentheses9(s: string): number {
  let ans = 0;
  const n = s.length;
  const dp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        dp[i] = 2 + (dp[i - 2] ?? 0);
      } else if (dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        dp[i] = 2 + dp[i - 1] + (dp[i - dp[i - 1] - 2] ?? 0)
      }
      if (dp[i] > ans) {
        ans = dp[i];
      }
    }
  }

  return ans;
};

console.log(longestValidParentheses9('(()(((()')) // 2

console.log(longestValidParentheses9('(()')) // "()" 2
console.log(longestValidParentheses9(')()())')) // "()()" 4
console.log(longestValidParentheses9('')) // 0
console.log(longestValidParentheses9('()(()')) // 2
console.log(longestValidParentheses9('()(())')) // 6
console.log(longestValidParentheses9('(()())')) // 6
