
// 双向链接排序
// hash表查找
// head和tail节点方便查找链头和链尾

class LRUNode {
  key: number;
  value: number;
  prev: LRUNode | undefined;
  next: LRUNode | undefined;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}


class LRUCache {
  capacity: number;
  size: number;
  cache: Map<number, LRUNode>;
  head: LRUNode;
  tail: LRUNode;
  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.cache = new Map<number, LRUNode>();
    this.head = new LRUNode(0, 0);
    this.tail = new LRUNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }
    const node = this.cache.get(key)!;
    // move to head
    this.moveToHead(node);

    return node.value;
  }

  put(key: number, value: number): void {

    const node = this.cache.get(key);
    if (node) {
      // 如果存在，则更新value，推到head
      node.value = value;
      this.moveToHead(node);
    } else {
      // 如果不存在，则推到head，如果队列超过容量，则删除队尾元素
      const newNode = new LRUNode(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);
      this.size++;
      if (this.size > this.capacity) {
        const tailNode = this.removeTail();
        this.cache.delete(tailNode.key);
        this.size--;
      }
    }
  }

  private removeNode(node: LRUNode) {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }


  }

  private addToHead(node: LRUNode) {
    if (this.head.next) {
      this.head.next.prev = node;
    }
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next = node;
  }

  private moveToHead(node: LRUNode) {
    this.removeNode(node);
    this.addToHead(node);
  }

  private removeTail(): LRUNode {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }
}


class LRUCache2 {
  capacity: number = 0;
  map: Map<number, number> = new Map()
  queue: number[] = []


  constructor(capacity: number) {
    this.capacity = capacity;
  }


  get(key: number): number {
    if (this.map.has(key)) {
      return this.map.get(key)
    }
    return -1
  }

  put(key: number, value: number) {
    if (this.map.has(key)) {
      const findIndex = this.queue.indexOf(key)
      if (findIndex !== -1) {
        this.queue.splice(findIndex, 1)
      }
    }
    this.queue.push(key)
    if (this.queue.length > this.capacity) {
      const deleteKey = this.queue.shift()
      this.map.delete(deleteKey)
    }
  }
}



/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/


var obj = new LRUCache(2)
console.log(obj.put(1, 1));
console.log(obj.put(2, 2));
console.log(obj.get(1));
console.log(obj.put(3, 3));
console.log(obj.get(2));
console.log(obj.put(4, 4));
console.log(obj.get(1));
console.log(obj.get(3));
console.log(obj.get(4));