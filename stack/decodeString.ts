function decodeString(s: string): string {
  const n = s.length;
  let ans = '';
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i);
    if (!isNaN(+char)) {
      let str = ''
      for (let j = i + 2; j < n; j++) {
        const char = s.charAt(j);
        if (char !== ']') {
          str += char
        } else {
          i = j;
          break;
        }
      }
      for (let k = 0; k < +char; k++) {
        ans += str
      }
    } else {
      ans += char
    }
  }

  return ans
};

function decodeString1(s: string): string {
  const n = s.length;
  let ans = '';
  const numStack: number[] = [];
  const charStack: string[] = [];
  let str = '';
  let numStr = '';
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i);
    if (!isNaN(+char)) {
      numStr += char
    } else {
      if (numStr !== '') {
        numStack.push(+numStr)
        numStr = ''
      }
      if (numStack.length === 0) {
        ans += char;
      } else if (char === ']') {
        // 开始pop char 数据
        let stackStr = str
        while (true) {
          const popChar = charStack.pop()!;
          if (popChar !== '[') {
            stackStr = popChar + stackStr
            // console.log('popChar:', popChar);
            // console.log('popChar + stackStr:', stackStr);
          } else {
            const num = numStack.pop()!;
            let s1 = ''
            for (let j = 0; j < num; j++) {
              s1 += stackStr;
            }
            // console.log('s1:', s1);
            str = s1;
            // console.log('str:', str);
            if (numStack.length === 0) {
              ans += str;
              str = '';
            }
            break;
          }
        }
      } else {
        charStack.push(char)
      }
    }
  }

  return ans
};

function decodeString2(s: string): string {
  const n = s.length;
  const numStack: number[] = [];
  const strStack: string[] = [];
  let str = '';
  let numStr = ''
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i);
    if (char === '[') {
      numStack.push(+numStr);
      numStr = '';
      strStack.push(str)
      str = ''
    } else if (char === ']') {
      const num = numStack.pop()!;
      let s = ''
      for (let j = 0; j < num; j++) {
        s += str
      }
      str = strStack.pop() + s
    } else if (!isNaN(+char)) {
      numStr += char
    } else {
      // is char
      str += char;
    }
  }


  console.log(strStack);
  console.log(str);
  console.log(numStack);
  return str;
}


function decodeString3(s: string): string {
  const numStack: number[] = [];
  const strStack: string[] = [];
  let str = '';
  let numStr = '';
  for (const c of s) {
    if (!isNaN(+c)) {
      numStr += c
    } else if (c === '[') {
      // numStr 压入栈，并置为空
      numStack.push(+numStr);
      numStr = '';
      strStack.push(str);
      str = '';
    } else if (c === ']') {
      const num = numStack.pop()
      str = strStack.pop() + Array(num).fill(str).join("")
    } else {
      str += c;
    }
  }


  return str;
};

function decodeString4(s: string): string {
  let ans = "";
  const numStack: number[] = [];
  const strStack: string[] = [];
  let numStr: string = "";
  for (const c of s) {
    if (c === '[') {
      numStack.push(+numStr);
      strStack.push(ans);
      ans = ""
      numStr = ""
    } else if (c === ']') {
      const popNum = numStack.pop();
      const popStr = strStack.pop();
      // console.log(']', ans, popNum, popStr, Array(popNum).fill(ans));
      ans = popStr + Array(popNum).fill(ans).join("");
      // console.log(Array(popNum).map(() => ans).join(""), ans)
    } else if (!isNaN(+c)) {
      numStr += c;
    } else {
      ans += c;
      // console.log(ans, c)
    }
  }
  return ans;
};


function decodeString5(s: string): string {
  let ans: string = '';
  const stack: string[] = [];
  const numStack: number[] = [];
  let num: string = '';

  for (const c of s) {
    if (c === '[') {
      // 数字写入数字栈
      numStack.push(+num);
      num = '';
      // str写入str栈
      stack.push(ans);
      ans = '';
    } else if (c === ']') {
      // 弹出数字num，将当前字符重复num次
      const num = numStack.pop();
      ans = ans.repeat(num);
      const str = stack.pop();
      ans = str + ans;
      // 弹出字符串，加在前面
    } else if (!isNaN(+c)) {
      num += c;
    } else {
      ans += c;
    }
  }



  return ans;
};


// console.log(decodeString('3[a]2[bc]'))
// console.log(decodeString1('3[a2[c]]'))
// console.log(decodeString('2[abc]3[cd]ef'))
// console.log(decodeString('abc3[cd]xyz'))

// console.log(decodeString1('100[leetcode]'))
console.log(decodeString5("3[z]2[2[y]pq4[2[jk]e1[f]]]ef"));
// zzzpqefjkyyjkyyefjkyyjkyyefjkyyjkyyefjkyyjkyypqefjkyyjkyyefjkyyjkyyefjkyyjkyyefjkyyjkyyef
// zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef
// zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef

