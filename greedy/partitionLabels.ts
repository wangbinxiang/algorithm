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


console.log(partitionLabels1('ababcbacadefegdehijhklij')) // "ababcbaca"、"defegde"、"hijhklij" [9,7,8]
console.log(partitionLabels1('eccbbbbdec'))// [10]
console.log(partitionLabels1('caedbdedda'))// [1, 9]

