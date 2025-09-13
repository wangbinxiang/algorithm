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

console.log(partitionLabels4('ababcbacadefegdehijhklij')) // "ababcbaca"、"defegde"、"hijhklij" [9,7,8]
console.log(partitionLabels4('eccbbbbdec'))// [10]
console.log(partitionLabels4('caedbdedda'))// [1, 9]
console.log(partitionLabels4('jybmxfgseq'))// [1,1,1,1,1,1,1,1,1,1]

