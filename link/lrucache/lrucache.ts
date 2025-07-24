
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

// 链表模式
// map模式
// 记录key 对应的value
// 



interface LRUObj {
  key: number
  val: number
}
class LRUCache3 {
  capacity: number
  keyMap: Map<number, LRUObj>
  constructor(capacity: number) {
    this.capacity = capacity
    this.keyMap = new Map<number, LRUObj>
  }

  put(key: number, val: number) {
    if (this.keyMap.has(key)) {
      this.keyMap.delete(key)
    }
    if (this.keyMap.size >= this.capacity) {
      const delKey = this.keyMap.keys().next().value
      this.keyMap.delete(delKey)
    }
    this.keyMap.set(key, { key, val })
  }

  get(key: number): number {
    const node = this.keyMap.get(key)
    if (node === void 0) {
      return -1
    }
    this.keyMap.delete(key)
    this.keyMap.set(key, node)
    return node.val
  }

}


class LRUNode4 {
  key: number
  val: number
  prev: LRUNode4 | null
  next: LRUNode4 | null
  constructor(key: number, val: number) {
    this.key = key
    this.val = val
    this.prev = null
    this.next = null
  }
}

class LRUCache4 {
  capacity: number
  keyMap: Map<number, LRUNode4>
  headLink: LRUNode4
  tailLink: LRUNode4

  constructor(capacity: number) {
    this.capacity = capacity
    this.keyMap = new Map<number, LRUNode4>()
    this.headLink = new LRUNode4(0, 0)
    this.tailLink = new LRUNode4(0, 0)
    this.headLink.next = this.tailLink
    this.tailLink.prev = this.headLink
  }

  // 更新或添加 删除多余的
  put(key: number, val: number) {
    let node = this.keyMap.get(key)
    if (node) {
      node.val = val
      if (node.prev !== this.headLink) {
        this.moveToHead(node)
      }
    } else {
      node = new LRUNode4(key, val)
      this.addToHead(node)
    }
    // 节点位置调整

    this.keyMap.set(key, node)
    if (this.keyMap.size > this.capacity) {
      // remove tail
      const node = this.tailLink.prev
      if (node !== this.headLink) {
        this.removeNode(node)
        this.keyMap.delete(node.key)
      }
    }
  }

  get(key: number): number {
    const node = this.keyMap.get(key)
    if (node === void 0) {
      return -1
    }

    this.moveToHead(node)
    return node.val
  }

  private moveToHead(node: LRUNode4) {
    this.removeNode(node)
    this.addToHead(node)
  }

  private removeNode(node: LRUNode4) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  private addToHead(node: LRUNode4) {
    node.next = this.headLink.next
    node.next.prev = node

    this.headLink.next = node
    node.prev = this.headLink
  }
}

interface LRUExpireObj {
  key: number
  val: number
  expireTime: number
}

// 增加过期时间，如果存储空间不够则先处理过期数据，如果没有过期数据，则处理最长未使用数据
class LRUCacheExpire {
  capacity: number
  expireTime: number
  keyMap: Map<number, LRUExpireObj>

  constructor(capacity: number, expireTime: number) {
    this.capacity = capacity
    this.expireTime = expireTime
    this.keyMap = new Map<number, LRUExpireObj>()
  }


  put(key: number, val: number) {
    let node = this.keyMap.get(key)
    const expireTime = Date.now() + this.expireTime
    if (node === void 0) {
      node = {
        key,
        val,
        expireTime
      }
    } else {
      node.val = val
      node.expireTime = expireTime
    }
    this.keyMap.delete(key)
    this.keyMap.set(key, node)
    if (this.keyMap.size > this.capacity) {
      const latestKey = this.keyMap.keys().next().value
      this.keyMap.delete(latestKey)
    }
  }

  get(key: number): number {
    const node = this.keyMap.get(key)
    if (node === void 0) {
      return -1
    }
    const now = Date.now()

    if (Date.now() > node.expireTime) {
      this.keyMap.delete(key)
      return -1
    }
    const expireTime = now + this.expireTime
    node.expireTime = expireTime

    this.keyMap.delete(key)
    this.keyMap.set(key, node)

    return node.val
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/


var obj = new LRUCache4(2)
console.log(obj.put(1, 1));
console.log(obj.put(2, 2));
console.log(obj.get(1));
console.log(obj.put(3, 3));
console.log(obj.get(2));
console.log(obj.put(4, 4));
console.log(obj.get(1));
console.log(obj.get(3));
console.log(obj.get(4));