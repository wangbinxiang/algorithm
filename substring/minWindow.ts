// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。



// 注意：

// 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
// 如果 s 中存在这样的子串，我们保证它是唯一的答案。

// 示例 1：

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"
// 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
// 示例 2：

// 输入：s = "a", t = "a"
// 输出："a"
// 解释：整个字符串 s 是最小覆盖子串。
// 示例 3:

// 输入: s = "a", t = "aa"
// 输出: ""
// 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
// 因此没有符合条件的子字符串，返回空字符串。

function minWindow(s: string, t: string): string {
  const n = s.length;
  const nt = t.length;
  let ansL = -1;
  let ansR = -1;
  let len = Number.MAX_SAFE_INTEGER;
  let less = 0;
  const map = new Map<string, number>();

  for (let i = 0; i < nt; i++) {
    const c = t.charAt(i);
    if (map.has(c)) {
      map.set(c, map.get(c)! + 1);
    } else {
      less++;
      map.set(c, 1);
    }
  }

  console.log("less:", less);
  let l = 0;
  for (let r = 0; r < n; r++) {
    const c = s.charAt(r);
    if (map.has(c)) {
      console.log("c:", c, r);
      const v = map.get(c)! - 1;
      if (v === 0) {
        less--;
      }
      map.set(c, v);
    }

    while (less === 0 && l <= r) {
      if (r - l + 1 < len) {
        console.log("l, r", l, r);
        len = r - l + 1;
        ansL = l;
        ansR = r;
      }
      const c = s.charAt(l);
      if (map.has(c)) {
        const v = map.get(c)!;
        if (v === 0) {
          less++;
        }
        map.set(c, v + 1);
      }
      l++;
    }
  }


  console.log("ansL, ansR:", ansL, ansR);



  return ansL === -1 ? "" : s.substring(ansL, ansR + 1);
};

function minWindow1(s: string, t: string): string {
  const map = new Map<string, number>();
  const tn = t.length;
  let less = 0;
  for (let i = 0; i < tn; i++) {
    const char = t.charAt(i)
    if (map.has(char)) {
      map.set(char, map.get(char)! + 1)
    } else {
      map.set(char, 1)
      less++
    }
  }

  let l = 0;
  const n = s.length;
  for (let r = 0; r < n; r++) {
    const char = s.charAt(r)

    if (map.has(char)) {

    }

  }




  return '';
}


console.log(minWindow('ADOBECODEBANC', 'ABC')); // BANC
console.log(minWindow('a', 'a')); // a