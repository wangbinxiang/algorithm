function findAnagrams(s: string, p: string): number[] {
  const pArr = p.split("");
  const pLength = pArr.length;
  const set = new Set<string>(pArr);
  const n = s.length;
  const result: number[] = [];
  let rk = 0;
  for (let i = 0; i < n; i++) {
    if (set.size === pLength) {
      rk = i;
    }
    while (rk < n && set.has(s.charAt(rk))) {
      console.log(set);
      console.log(s.charAt(rk));
      set.delete(s.charAt(rk));
      rk++;
    }
    if (set.size === 0) {
      result.push(i);
    }
    if (set.size !== pLength) {
      set.add(s.charAt(i));
    }

    console.log(i);
    console.log(rk);
  }

  return result;
};

function findAnagrams2(s: string, p: string): number[] {
  const set = new Set(p.split(""));
  const pArr = p.split("");
  const pLength = pArr.length;
  const map = Array(26).fill(0);
  // const sMap = Array(26).fill(0);
  const emptyMapString = map.toString();
  const aCode = 'a'.charCodeAt(0);
  pArr.forEach(item => {
    map[item.charCodeAt(0) - aCode]++;
  })
  const n = s.length;
  const result: number[] = [];
  let rk = 0;

  for (let i = 0; i < n; i++) {
    while (rk - i <= pLength && map[s.charCodeAt(rk) - aCode] > 0) {
      // console.log(`map[s.charCodeAt(${s.charAt(rk)}) - aCode]:`, map[s.charCodeAt(rk) - aCode])
      --map[s.charCodeAt(rk) - aCode];
      rk++;
      // console.log(map);
    }
    if (map.toString() === emptyMapString) {
      result.push(i);
    }
    if (set.has(s.charAt(i))) {
      // console.log(map[s.charCodeAt(i) - aCode])
      ++map[s.charCodeAt(i) - aCode];
    }
    if (rk === i) {
      rk++;
    }
  }
  return result;
};

console.log(findAnagrams2("cbaebabacd", "abc"));
console.log(findAnagrams2("abab", "ab"));
console.log(findAnagrams2("baa", "aa"));