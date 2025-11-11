// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。


// 示例 1：

// 输入：s = "()"

// 输出：true

// 示例 2：

// 输入：s = "()[]{}"

// 输出：true

// 示例 3：

// 输入：s = "(]"

// 输出：false

// 示例 4：

// 输入：s = "([])"

// 输出：true

// 示例 5：

// 输入：s = "([)]"

// 输出：false

const mapping: Record<string, string> = {
  '(': ')',
  '{': '}',
  '[': ']'
};

function isValid(s: string): boolean {
  const stack: string[] = [];

  for (const c of s) {
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else {
      if (c !== mapping[stack.pop()]) {
        return false;
      }
    }
  }



  return stack.length === 0;
};



function isValid1(s: string): boolean {
  const stack: string[] = [];
  for (const c of s) {
    if (mapping[c]) {
      stack.push(c);
    } else {
      const pop = stack.pop();
      if (mapping[pop] !== c) {
        return false;
      }
    }
  }


  return stack.length === 0;
};