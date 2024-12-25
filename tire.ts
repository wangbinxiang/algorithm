
class Trie {
  children: Record<string, Trie>;
  isEnd: boolean;
  constructor() {
    this.children = {}
    this.isEnd = false
  }

  has(s: string): boolean {
    return this.children[s] !== undefined;
  }
  add(s: string, t: Trie): void {
    this.children[s] = t;
  }

  get(s: string): Trie {
    return this.children[s];
  }

  insert(word: string): void {
    let node: Trie = this;
    for (const w of word) {
      if (node && node.has(w)) {
        node = node.get(w);
      } else {
        node.add(w, new Trie());
        node = node.get(w);
      }
    }
    node.isEnd = true;
  }

  searchPrefix(word: string): Trie | false {
    let node: Trie = this;
    for (const w of word) {
      if (node.has(w)) {
        node = node.get(w);
      } else {
        return false;
      }
    }
    return node;
  }

  search(word: string): boolean {
    const result = this.searchPrefix(word);
    if (result && result.isEnd) {
      return true;
    }
    return false;
  }

  startsWith(prefix: string): boolean {
    const result = this.searchPrefix(prefix);
    if (result) {
      return true;
    }
    return false;
  }
}