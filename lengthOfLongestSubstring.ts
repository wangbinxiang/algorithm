function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  let start = 0;
  let n = s.length;
  // while (start < n) {
  const set = new Set([s.charAt(start)]);
  for (let end = start + 1; end < n; end++) {
    const c = s.charAt(end);
    if (set.has(c) || c === "") {
      start = end;
      max = Math.max(max, set.size);
      set.clear();

    } else {
      set.add(c);
    }
    console.log(set);
    if (end === n - 1) {
      max = Math.max(max, set.size);
      set.clear();
      break;
    }
  }
  // }
  return max;
};

function lengthOfLongestSubstring2(s: string): number {
  let max = 0;
  let start = 0;
  let n = s.length;
  const set = new Set();
  while (start < n) {
    const c = s.charAt(start);
    if (set.has(c)) {
      max = Math.max(max, set.size);
      set.clear();
    } else {
      set.add(c);
      start++;
    }
  }
  return max;
}

function lengthOfLongestSubstring3(s: string): number {
  let max = 0;
  let start = 0;
  let n = s.length;

  while (start < n) {
    if (n - start <= max) {
      break;
    }
    const set = new Set();
    let end = start;
    while (end < n) {
      const c = s.charAt(end);
      if (!set.has(c)) {
        set.add(c);
        ++end;
      } else {
        break;
      }
    }
    max = Math.max(max, set.size);
    start++;
  }
  return max;
}

function lengthOfLongestSubstring4(s: string): number {
  let max = 0;
  const n = s.length;
  let rk = 0;
  const set = new Set<string>();
  for (let i = 0; i < n; i++) {
    while (rk < n && !set.has(s.charAt(rk))) {
      set.add(s.charAt(rk));
      rk++;
    }
    max = Math.max(max, set.size);
    if (rk === n) {
      break;
    }
    set.delete(s.charAt(i));
  }
  return max;
}


console.log(lengthOfLongestSubstring4('abcabcbb'));
console.log(lengthOfLongestSubstring4('bbbbb'));
console.log(lengthOfLongestSubstring4('pwwkew'));
console.log(lengthOfLongestSubstring4(' '));
console.log(lengthOfLongestSubstring4('dvdf'));