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

// console.log(decodeString('3[a]2[bc]'))
// console.log(decodeString1('3[a2[c]]'))
// console.log(decodeString('2[abc]3[cd]ef'))
// console.log(decodeString('abc3[cd]xyz'))

// console.log(decodeString1('100[leetcode]'))
console.log(decodeString2("3[z]2[2[y]pq4[2[jk]e1[f]]]ef"));
// zzzpqefjkyyjkyyefjkyyjkyyefjkyyjkyyefjkyyjkyypqefjkyyjkyyefjkyyjkyyefjkyyjkyyefjkyyjkyyef
// zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef
// zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef

