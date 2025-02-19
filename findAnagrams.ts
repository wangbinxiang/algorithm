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
console.log(findAnagrams4("cbaebabacd", "abc"));
console.log(findAnagrams4("abab", "ab"));
console.log(findAnagrams4("baa", "aa"));