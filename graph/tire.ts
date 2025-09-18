// 208. 实现 Trie (前缀树)
// 已解答
// 中等
// 相关标签
// 相关企业
// Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。

// 请你实现 Trie 类：

// Trie() 初始化前缀树对象。
// void insert(String word) 向前缀树中插入字符串 word 。
// boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
// boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。


// 示例：

// 输入
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// 输出
// [null, null, true, false, true, null, true]

// 解释
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // 返回 True
// trie.search("app");     // 返回 False
// trie.startsWith("app"); // 返回 True
// trie.insert("app");
// trie.search("app");     // 返回 True
// class Trie {
//   children: Record<string, Trie>;
//   isEnd: boolean;
//   constructor() {
//     this.children = {}
//     this.isEnd = false
//   }

//   has(s: string): boolean {
//     return this.children[s] !== undefined;
//   }
//   add(s: string, t: Trie): void {
//     this.children[s] = t;
//   }

//   get(s: string): Trie {
//     return this.children[s];
//   }

//   insert(word: string): void {
//     let node: Trie = this;
//     for (const w of word) {
//       if (node && node.has(w)) {
//         node = node.get(w);
//       } else {
//         node.add(w, new Trie());
//         node = node.get(w);
//       }
//     }
//     node.isEnd = true;
//   }

//   searchPrefix(word: string): Trie | false {
//     let node: Trie = this;
//     for (const w of word) {
//       if (node.has(w)) {
//         node = node.get(w);
//       } else {
//         return false;
//       }
//     }
//     return node;
//   }

//   search(word: string): boolean {
//     const result = this.searchPrefix(word);
//     if (result && result.isEnd) {
//       return true;
//     }
//     return false;
//   }

//   startsWith(prefix: string): boolean {
//     const result = this.searchPrefix(prefix);
//     if (result) {
//       return true;
//     }
//     return false;
//   }
// }

interface TrieNode {
  key: Record<string, TrieNode>;
  end: boolean;
}


class Trie {
  node: TrieNode;
  constructor() {
    this.node = this.makeNode()
  }

  makeNode(): TrieNode {
    const node: TrieNode = {
      key: {},
      end: false,
    };
    return node;
  }

  insert(word: string): void {
    let node = this.node;
    for (let w of word) {
      if (node.key[w]) {
        node = node.key[w]
      } else {
        const newNode = this.makeNode()
        node.key[w] = newNode;
        node = newNode;
      }
    }
    node.end = true
  }

  search(word: string): boolean {
    let node = this.node;
    for (let w of word) {
      if (node.key[w]) {
        node = node.key[w]
      } else {
        return false;
      }
    }
    if (node.end) {
      return true;
    }
    return false;
  }

  startsWith(prefix: string): boolean {
    let node = this.node;
    for (let w of prefix) {
      if (node.key[w]) {
        node = node.key[w]
      } else {
        return false;
      }
    }

    return true;
  }
}



class Trie1 {

  map: TrieNode

  constructor() {
    this.map = {
      key: {},
      end: false
    }
  }

  insert(word: string): void {
    let map = this.map
    for (let char of word) {
      if (!map[char]) {
        map[char] = {
          key: {},
          end: false
        }
      }
      map = map[char]
    }
    map.end = true
  }

  search(word: string): boolean {
    let map = this.map;
    for (let char of word) {
      if (map[char]) {
        map = map[char]
      } else {
        return false
      }
    }
    if (map.end) {
      return true
    }
    return false
  }

  startsWith(prefix: string): boolean {
    let map = this.map;
    for (let char of prefix) {
      if (map[char]) {
        map = map[char]
      } else {
        return false
      }
    }
    return true
  }
}