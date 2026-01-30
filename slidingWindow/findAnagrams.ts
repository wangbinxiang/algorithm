// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

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

function findAnagrams3(s: string, p: string): number[] {
  const result: number[] = [];
  const pLength = p.length;
  let differ = 0;
  const n = s.length;
  let rk = 0;
  const map = Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);
  for (let i = 0; i < pLength; i++) {
    ++map[s.charCodeAt(i) - aCode];
    --map[p.charCodeAt(i) - aCode];
  }
  for (let i = 0; i < 26; i++) {
    if (map[i] !== 0) {
      ++differ;
    }
  }
  // console.log(map);
  // console.log(differ);

  if (differ === 0) {
    result.push(0);
  }

  for (let i = 0; i < n - pLength; i++) {
    const iCode = s.charCodeAt(i) - aCode
    if (map[iCode] === 0) {
      ++differ;
    } else if (map[iCode] === 1) {
      --differ;
    }

    --map[iCode];

    const pCode = s.charCodeAt(i + pLength) - aCode
    // console.log(pCode);
    if (map[pCode] === -1) {
      --differ;
    } else if (map[pCode] === 0) {
      ++differ;
    }

    ++map[pCode];
    // console.log('map[pCode]:', map[pCode]);

    if (differ === 0) {
      result.push(i + 1);
    }
  }
  // console.log(map);
  return result;
}


function findAnagrams4(s: string, p: string): number[] {
  const result: number[] = [];
  const n = s.length;
  const pLen = p.length;
  const map = Array(26).fill(0);
  let differ = 0;
  const aCode = 'a'.charCodeAt(0);
  for (let i = 0; i < pLen; ++i) {
    ++map[s.charCodeAt(i) - aCode];
    --map[p.charCodeAt(i) - aCode];
  }
  // console.log(map);
  for (let i = 0; i < 26; ++i) {
    if (map[i] !== 0) {
      ++differ;
    }
  }
  // console.log(differ);
  if (differ === 0) {
    result.push(0);
  }

  for (let i = 0; i < n - pLen; ++i) {
    const iCode = s.charCodeAt(i) - aCode
    const sVal = map[iCode];
    if (sVal === 0) {
      ++differ;
    } else if (sVal === 1) {
      --differ;
    }
    --map[iCode];
    const pCode = s.charCodeAt(i + pLen) - aCode;
    const pVal = map[pCode];
    if (pVal === 0) {
      ++differ;
    } else if (pVal === -1) {
      --differ;
    }
    ++map[pCode]
    if (differ === 0) {
      result.push(i + 1);
    }
  }
  // console.log(map);

  return result;
}

function findAnagrams5(s: string, p: string): number[] {
  const ans: number[] = [];
  const pn = p.length;
  const set = new Set(p.split(''))
  console.log('set:', set)


  return ans;
}
console.log(findAnagrams7("cbaebabacd", "abc")); // [0,6]
console.log(findAnagrams7("abab", "ab")); // [0,1,2]
console.log(findAnagrams7("baa", "aa"));


function findAnagrams6(s: string, p: string): number[] {
  const ans: number[] = [];
  const len = s.length;
  const pLen = p.length;
  const map = new Map<string, number>()

  const aCode = 'a'.charCodeAt(0);
  // differ + map
  for (let i = 0; i < pLen; i++) {
    const charCode = p.charAt(i)
  }

  for (let i = 0; i < len; i++) {

  }
  return ans;
}



function findAnagrams7(s: string, p: string): number[] {
  const ans: number[] = [];
  const count = p.length;
  const n = s.length;

  const map = new Map<string, number>();
  for (const c of p) {
    let val = 1;
    if (map.has(c)) {
      val += map.get(c)
    }
    map.set(c, val);
  }

  let diff = map.size;

  for (let i = 0; i < count; i++) {
    const c = s[i];
    if (map.has(c)) {
      const val = map.get(c) - 1;
      map.set(c, val);
      if (val === 0) {
        diff--;
      }
    }
  }
  // console.log(map);


  for (let i = count; i < n; i++) {
    if (diff === 0) {
      ans.push(i - count);
    }

    const prevC = s[i - count];
    // console.log('prevC:', prevC);
    if (map.has(prevC)) {
      const val = map.get(prevC);
      map.set(prevC, val + 1);
      if (val === 0) {
        diff++;
      }
    }

    const c = s[i];
    // console.log('c:', c);
    if (map.has(c)) {
      const val = map.get(c) - 1;
      map.set(c, val);
      if (val === 0) {
        diff--;
      }
    }
  }
  // console.log(map);
  // console.log(diff);
  if (diff === 0) {
    ans.push(n - count);
  }

  return ans;
};



// 提示:

// 1 <= s.length, p.length <= 3 * 104
// s 和 p 仅包含小写字母