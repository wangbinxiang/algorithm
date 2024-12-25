// function groupAnagrams(strs: string[]): string[][] {
//   const aCode = 'a'.charCodeAt(0);
//   const map: Record<string, string[]> = {};
//   for (const str of strs) {
//     const count = Array(26).fill(0);
//     for (const s of str) {
//       count[s.charCodeAt(0) - aCode]++;
//     }
//     const countStr = count.toString();
//     map[countStr] ? map[countStr].push(str) : map[countStr] = [str];
//   }

//   return Object.values(map);
// };

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (let str of strs) {
    const arr = Array.from(str);
    arr.sort();
    const sortStr = arr.toString();
    let list = map.get(sortStr);
    if (list) {
      list.push(str);
    } else {
      list = [str];
    }
    map.set(sortStr, list);
  }

  return Array.from(map.values());
};


console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));