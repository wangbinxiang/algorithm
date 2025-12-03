// 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串 "ababcc" 能够被分为 ["abab", "cc"]，但类似 ["aba", "bcc"] 或 ["ab", "ab", "cc"] 的划分是非法的。

// 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。

// 返回一个表示每个字符串片段的长度的列表。



// 示例 1：
// 输入：s = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。 
// 示例 2：

// 输入：s = "eccbbbbdec"
// 输出：[10]


// 提示：

// 1 <= s.length <= 500
// s 仅由小写英文字母组成
function partitionLabels(s: string): number[] {
  const n = s.length;
  const ans: number[] = [];
  let start = 0
  while (start < n) {
    const f = s.charAt(start);
    const set = new Set<string>([f])
    const tmpSet = new Set<string>()
    let last = start;
    for (let i = start + 1; i < n; i++) {
      // console.log(s.charAt(i))
      if (set.has(s.charAt(i))) {
        last = i;
        for (let v of tmpSet.values()) {
          set.add(v);
        }
        tmpSet.clear()
      } else {
        tmpSet.add(s.charAt(i))
      }
    }
    ans.push(last - start + 1)
    // console.log('last:', last)
    start = last + 1

  }
  return ans;
};


function partitionLabels1(s: string): number[] {
  // 记录每个字母的最后位置
  // const charPosition: Record<string, number> = {};
  const n = s.length;
  const position: number[] = [];
  const ans: number[] = [];
  const aCode = 'a'.charCodeAt(0);
  for (let i = 0; i < n; i++) {
    // charPosition[s.charAt(i)] = i;
    position[s.charCodeAt(i) - aCode] = i;
  }
  let start = 0;
  let end = 0;

  for (let i = 0; i < n; i++) {
    end = Math.max(end, position[s.charCodeAt(i) - aCode])
    if (i === end) {
      ans.push(i - start + 1)
      start = i + 1;
    }
  }


  return ans;
}


function partitionLabels2(s: string): number[] {
  const ans: number[] = []
  const map = new Map<string, number>;
  const n = s.length
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    map.set(char, i)
  }
  // console.log(map)
  let start = 0
  let end = 0
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    const charEnd = map.get(char)

    if (charEnd > end) {
      end = charEnd
    }

    if (i === end) {
      ans.push(end - start + 1)
      start = i + 1
      end = i + 1
    }




    // if (i > end) {
    //   ans.push(i - start)
    //   start = i
    //   end = charEnd
    // } else if (i === end && charEnd === end) {
    //   ans.push(i - start + 1)
    //   start = i + 1
    //   end = i + 1
    // } else if (charEnd > end) {
    //   end = charEnd
    // }
  }


  return ans;
};


function partitionLabels3(s: string): number[] {
  const ans: number[] = []

  const map: Record<string, number> = {}
  const n = s.length
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    map[char] = i
  }
  let start = 0
  let end = map[s.charAt(0)]
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)
    if (map[char] > end) {
      end = map[char]
    }
    if (i === end) {
      ans.push(end - start + 1)
      start = end = i + 1
    }
  }

  return ans
}


function partitionLabels4(s: string): number[] {
  const ans: number[] = []
  const hash = new Map<string, number>;
  const n = s.length
  for (let i = 0; i < n; i++) {
    const a = s.charAt(i)
    hash.set(a, i)
  }

  let end = 0
  let start = 0
  for (let i = 0; i < n; i++) {
    const char = s.charAt(i)

    const charEnd = hash.get(char)
    if (charEnd > end) {
      end = charEnd
    }

    // end = Math.max(end, hash.get(char))
    if (i === end) {
      ans.push(end - start + 1)
      start = end = i + 1
    }
  }

  return ans
}


function partitionLabels5(s: string): number[] {
  const n = s.length;
  const map = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const char = s[i];
    map.set(char, i)
  }

  // console.log(map);
  let start = 0;
  const ans: number[] = [];
  while (start < n) {
    let l = start;
    let r = map.get(s[l]);
    while (l <= r) {
      const char = s[l];
      if (map.get(char) > r) {
        r = map.get(char);
      }
      l++;
    }
    ans.push(l - start);
    start = l;
  }


  return ans;
};


function partitionLabels6(s: string): number[] {
  const n = s.length;
  const map = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const char = s[i];
    map.set(char, i)
  }

  // console.log(map);
  const ans: number[] = [];
  let end = -1;
  let start = -1;
  for (let i = 0; i < n; i++) {
    const latest = map.get(s[i]);
    if (latest > end) {
      end = latest;
    }

    if (i === end) {
      ans.push(i - start);
      start = i;
    }

  }


  return ans;
};


function partitionLabels7(s: string): number[] {
  const ans: number[] = [];
  const map: Record<string, number> = {};
  const n = s.length;

  for (let i = 0; i < n; i++) {
    map[s[i]] = i;
  }

  let start = 0;
  let end = 0;
  for (let i = 0; i < n; i++) {

    if (map[s[i]] > end) {
      end = map[s[i]];
    }

    if (i === end) {
      ans.push(end - start + 1);
      start = end = i + 1;
    }
  }
  return ans;
};

console.log(partitionLabels7('ababcbacadefegdehijhklij')) // "ababcbaca"、"defegde"、"hijhklij" [9,7,8]
console.log(partitionLabels7('eccbbbbdec'))// [10]
console.log(partitionLabels7('caedbdedda'))// [1, 9]
console.log(partitionLabels7('jybmxfgseq'))// [1,1,1,1,1,1,1,1,1,1]

