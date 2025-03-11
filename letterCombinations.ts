// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。




// 2: abc
// 3: def
// 4: ghi
// 5: jkl
// 6: mno
// 7: pqrs
// 8: tuv 
// 9: wxyz



function letterCombinations(digits: string): string[] {
  if (digits === "") {
    return [];
  }
  const map: Record<string, string[]> = {
    "2": ['a', 'b', 'c'],
    "3": ['d', 'e', 'f'],
    "4": ['g', 'h', 'i'],
    "5": ['j', 'k', 'l'],
    "6": ['m', 'n', 'o'],
    "7": ['p', 'q', 'r', 's'],
    "8": ['t', 'u', 'v'],
    "9": ['w', 'x', 'y', 'z'],
  }
  let ans: string[] = [];

  const list = digits.split("");
  const n = list.length;
  const output: string[] = [];
  // console.log('list:', list);
  const dfs = (start: number) => {
    if (start === n) {
      ans.push(output.join(""));
      return
    }
    const num = list[start];
    const letter = map[num]
    const len = letter.length;
    for (let i = 0; i < len; i++) {
      output.push(letter[i])
      dfs(start + 1);
      output.pop();
    }
  }

  dfs(0);



  return ans;
};


// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

// console.log(letterCombinations('23'))
console.log(letterCombinations(''))