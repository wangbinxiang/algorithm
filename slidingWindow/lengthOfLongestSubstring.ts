// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。

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

// 使用set, 记录滑动窗口内的字符，如果下一个字符跟创建内的字符有重复，则滑动到下一个窗口
function lengthOfLongestSubstring5(s: string): number {
  let ans = 0;
  const set = new Set<string>()
  const len = s.length;
  let rk = 0;
  for (let i = 0; i < len; i++) {
    while (rk < len && !set.has(s.charAt(rk))) {
      set.add(s.charAt(rk))
      rk++
    }
    if (set.size > ans) {
      ans = set.size
    }
    if (rk === len) {
      break;
    }
    set.delete(s.charAt(i))
  }
  return ans;
}


function lengthOfLongestSubstring6(s: string): number {
  let ans = 0;
  const set = new Set<string>()
  let l = 0;
  const n = s.length;

  for (let i = 0; i < n; i++) {
    const c = s[i];
    while (set.has(c)) {
      set.delete(s[l])
      l++;
    }
    set.add(c)
    const len = i - l + 1;
    if (len > ans) {
      ans = len;
    }
  }




  return ans;
};

// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成

console.log(lengthOfLongestSubstring6('abcabcbb'));
console.log(lengthOfLongestSubstring6('bbbbb'));
console.log(lengthOfLongestSubstring6('pwwkew'));
console.log(lengthOfLongestSubstring6(' '));
console.log(lengthOfLongestSubstring6('dvdf'));