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


console.log(minWindow('ADOBECODEBANC', 'ABC')); // BANC
console.log(minWindow('a', 'a')); // a