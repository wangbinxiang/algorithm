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

// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 排序

// 字典

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



// strs只包括小写字母
function groupAnagrams2(strs: string[]): string[][] {
  const replaceStringAt = (str: string, index: number) => {
    let c = +str.charAt(index) + 1
    console.log('c:', c)
    return str.substring(0, index) + c.toString() + str.substring(index + 1);
  }

  let start = 'a'.charCodeAt(0)

  const ans: Record<string, string[]> = {}

  for (let str of strs) {
    let arr = '00000000000000000000000000'
    for (let i = 0; i < str.length; i++) {
      const index = str.charCodeAt(i) - start
      arr = replaceStringAt(arr, index)
    }
    if (ans[arr]) {
      ans[arr].push(str)
    } else {
      ans[arr] = [str]
    }
  }
  console.log(ans)
  return Object.values(ans)
}

function groupAnagrams3(strs: string[]): string[][] {
  const obj: Record<string, string[]> = {}
  for (let str of strs) {
    const key = str.split("").sort().toString()
    if (obj[key]) {
      obj[key].push(str)
    } else {
      obj[key] = [str]
    }
  }


  return Object.values(obj);
}


function groupAnagrams4(strs: string[]): string[][] {
  const ans: Record<string, string[]> = {};
  let start = 'a'.charCodeAt(0);
  for (let str of strs) {
    const arr = Array(26).fill(0);
    const n = str.length;
    for (let i = 0; i < n; i++) {
      const code = str.charCodeAt(i) - start
      arr[code]++
    }
    const key = arr.toString();
    if (ans[key]) {
      ans[key].push(str)
    } else {
      ans[key] = [str]
    }
  }

  return Object.values(ans);
}
console.log(groupAnagrams5(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["bat"],["nat","tan"],["ate","eat","tea"]]

console.log(groupAnagrams5([""])); // [[""]]

console.log(groupAnagrams5(["a"])); // [["a"]]

console.log(groupAnagrams5(["ddddddddddg", "dgggggggggg"]))

function groupAnagrams5(strs: string[]): string[][] {
  const ans: Record<string, string[]> = {};
  const aCode = 'a'.charCodeAt(0);

  for (let str of strs) {
    const len = str.length;
    const arr = Array(26).fill(0)
    for (let i = 0; i < len; i++) {
      const code = str.charCodeAt(i) - aCode
      arr[code]++
    }
    const key = arr.join(',')
    if (ans[key]) {
      ans[key].push(str)
    } else {
      ans[key] = [str]
    }
  }
  return Object.values(ans);
}


// console.log(replaceStringAt('000', 0))

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] 仅包含小写字母