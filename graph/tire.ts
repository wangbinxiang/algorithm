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

interface TrieNode1 {
  key: Record<string, TrieNode1>
  end: boolean
}

class Trie2 {

  key: TrieNode1

  constructor() {
    this.key = {
      key: {},
      end: false
    }
  }

  insert(word: string): void {
    let key = this.key
    for (let char of word) {
      if (!key.key[char]) {
        key.key[char] = {
          key: {},
          end: false
        }
      }
      key = key.key[char]
    }
    key.end = true
  }

  search(word: string): boolean {
    let key = this.key
    for (let char of word) {
      if (!key.key[char]) {
        return false
      }
      key = key.key[char]
    }
    return key.end
  }

  startsWith(prefix: string): boolean {
    let key = this.key
    for (let char of prefix) {
      if (!key.key[char]) {
        return false
      }
      key = key.key[char]
    }
    return true
  }
}

interface TrieNode {
  end: boolean;
  key: Record<string, TrieNode>;
}

class Trie3 {
  trie: TrieNode;
  constructor() {
    this.trie = {
      end: false,
      key: {}
    };
  }

  insert(word: string): void {
    let trie = this.trie;
    for (const char of word) {
      if (!trie.key[char]) {
        trie.key[char] = {
          end: false,
          key: {}
        }
      }
      trie = trie.key[char]
    }
    if (!trie.end) {
      trie.end = true
    }
  }

  search(word: string): boolean {
    let trie = this.trie;
    for (const char of word) {
      if (trie.key[char]) {
        trie = trie.key[char];
      } else {
        return false;
      }
    }
    return trie.end;
  }

  startsWith(prefix: string): boolean {
    let trie = this.trie;
    for (const char of prefix) {
      if (trie.key[char]) {
        trie = trie.key[char];
      } else {
        return false;
      }
    }
    return true;
  }
}


interface TrieNode4 {
  end: boolean;
  children: Record<string, TrieNode4>
}

class Trie4 {
  trieNode: TrieNode4
  constructor() {
    this.trieNode = {
      end: false,
      children: {}
    }
  }

  insert(word: string): void {
    let trieNode = this.trieNode;
    for (const char of word) {
      if (trieNode.children[char]) {
        trieNode = trieNode.children[char];
      } else {
        trieNode.children[char] = {
          end: false,
          children: {}
        }
        trieNode = trieNode.children[char]
      }
    }
    trieNode.end = true;
  }

  search(word: string): boolean {
    let trieNode = this.trieNode;
    for (const char of word) {
      if (trieNode.children[char]) {
        trieNode = trieNode.children[char]
      } else {
        return false;
      }
    }
    return trieNode.end;
  }

  startsWith(prefix: string): boolean {
    let trieNode = this.trieNode;
    for (const char of prefix) {
      if (trieNode.children[char]) {
        trieNode = trieNode.children[char]
      } else {
        return false;
      }
    }
    return true;
  }
}

class TrieNode5 {
  children: Map<string, TrieNode5>;
  end: boolean;
  constructor() {
    this.children = new Map<string, TrieNode5>;
    this.end = false;
  }
}

class Trie5 {
  private root: TrieNode5
  constructor() {
    this.root = new TrieNode5();
  }

  insert(word: string): void {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) {
        node.children.set(c, new TrieNode5());
      }
      node = node.children.get(c)
    }
    node.end = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const c of word) {
      if (node.children.has(c)) {
        node = node.children.get(c);
      } else {
        return false;
      }
    }

    return node.end;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const c of prefix) {
      if (node.children.has(c)) {
        node = node.children.get(c);
      } else {
        return false;
      }
    }

    return true;
  }
}