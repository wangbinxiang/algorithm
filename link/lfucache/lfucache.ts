

interface LFCNode {
  key: number
  val: number
  freq: number
}

class LFUCache {
  capacity: number
  keyMap: Map<number, LFCNode>
  freqMap: Map<number, Set<LFCNode>>
  minFreq: number
  constructor(capacity: number) {
    this.capacity = capacity
    this.minFreq = 0
    this.keyMap = new Map()
    this.freqMap = new Map()
  }

  get(key: number): number {
    const node = this.keyMap.get(key)
    if (node === void 0) {
      return -1
    }
    this.updateFreq(node)
    return node.val
  }

  put(key: number, val: number): void {
    let node = this.keyMap.get(key)
    if (node === void 0) {
      // 如果容量超大，则删除使用最少切最久未使用node
      if (this.keyMap.size >= this.capacity) {
        const freqSet = this.freqMap.get(this.minFreq)
        const node = freqSet.values().next().value
        if (node) {
          freqSet.delete(node)
          if (freqSet.size === 0) {
            this.freqMap.delete(node.freq)
          }
          this.keyMap.delete(node.key)
        }
      }
      node = {
        key,
        val,
        freq: 1
      }
      this.keyMap.set(node.key, node)
      const freqSet = this.freqMap.get(1)
      if (freqSet === void 0) {
        this.freqMap.set(1, new Set([node]))
        this.minFreq = 1
      } else {
        freqSet.add(node)
      }
      // 设置新node
    } else {
      // 更新旧node
      node.val = val
      this.updateFreq(node)
    }
  }

  private updateFreq(node: LFCNode) {
    const oldFreq = node.freq

    const oldFreqSet = this.freqMap.get(oldFreq)
    oldFreqSet.delete(node)

    if (oldFreqSet.size === 0) {
      this.freqMap.delete(oldFreq)
      if (oldFreq === this.minFreq) {
        this.minFreq++
      }
    }

    node.freq++
    this.keyMap.set(node.key, node)
    if (!this.freqMap.has(node.freq)) {
      this.freqMap.set(node.freq, new Set([node]))
    } else {
      const freqSet = this.freqMap.get(node.freq)
      freqSet.add(node)
    }
  }
}



interface LFUNode2 {
  key: number
  val: number
  freq: number
  prev?: LFUNode2
  next?: LFUNode2
}


class DoubleLink {
  size: number
  head: LFUNode2
  tail: LFUNode2
  freq: number
  constructor(freq: number) {
    this.freq = freq
    this.head = {
      key: 0,
      val: 0,
      freq: 0
    }
    this.tail = {
      key: 0,
      val: 0,
      freq: 0
    }
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
  }

  add(node: LFUNode2) {
    node.next = this.head.next
    node.prev = this.head

    this.head.next.prev = node
    this.head.next = node

    this.size++
  }

  remove(node: LFUNode2) {
    node.prev.next = node.next
    node.next.prev = node.prev
    this.size--
  }
}

class LFUCache2 {
  capacity: number
  miniFreq: number
  keyMap: Map<number, LFUNode2>
  freqMap: Map<number, DoubleLink>
  constructor(capacity: number) {
    this.capacity = capacity
    this.miniFreq = 0
    this.keyMap = new Map<number, LFUNode2>
    this.freqMap = new Map<number, DoubleLink>
  }

  put(key: number, val: number) {
    let node = this.keyMap.get(key)
    if (node === void 0) {
      // 创建新node
      node = {
        key,
        val,
        freq: 1
      }
      this.addFreq(node)
    } else {
      // 更新node
      node.val = val
      this.updateFreq(node)
    }
  }

  get(key: number): number {
    const node = this.keyMap.get(key)
    if (node === void 0) {
      return -1
    }
    this.updateFreq(node)
    return node.val
  }

  private addFreq(node: LFUNode2) {

    if (this.keyMap.size >= this.capacity) {
      const minFreq = this.freqMap.get(this.miniFreq)
      const latest = minFreq.tail.prev
      if (latest) {
        minFreq.remove(latest)
        this.keyMap.delete(latest.key)
        if (minFreq.size === 0) {
          this.freqMap.delete(minFreq.freq)
        }
      }
    }

    this.keyMap.set(node.key, node)
    let freqLink = this.freqMap.get(node.freq)
    if (!freqLink) {
      freqLink = new DoubleLink(node.freq)
      this.freqMap.set(node.freq, freqLink)
    }
    freqLink.add(node)
    this.miniFreq = node.freq
  }

  private updateFreq(node: LFUNode2) {
    const freqLink = this.freqMap.get(node.freq)
    if (freqLink) {
      freqLink.remove(node)
    }
    if (freqLink.size === 0) {
      this.freqMap.delete(node.freq)
      if (this.miniFreq === node.freq) {
        this.miniFreq++
      }
    }
    node.freq++

    let newFreqLink = this.freqMap.get(node.freq)
    if (!newFreqLink) {
      newFreqLink = new DoubleLink(node.freq)
      this.freqMap.set(node.freq, newFreqLink)
    }
    newFreqLink.add(node)
  }
}

// cnt(x) = 键 x 的使用计数
// cache=[] 将显示最后一次使用的顺序（最左边的元素是最近的）
const lfu = new LFUCache2(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
console.log(lfu.get(1));      // 返回 1
// cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 去除键 2 ，因为 cnt(2)=1 ，使用计数最小
// cache=[3,1], cnt(3)=1, cnt(1)=2
console.log(lfu.get(2));      // 返回 -1（未找到）
console.log(lfu.get(3));      // 返回 3
// cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // 去除键 1 ，1 和 3 的 cnt 相同，但 1 最久未使用
// cache=[4,3], cnt(4)=1, cnt(3)=2
console.log(lfu.get(1));      // 返回 -1（未找到）
console.log(lfu.get(3));      // 返回 3
// cache=[3,4], cnt(4)=1, cnt(3)=3
console.log(lfu.get(4));      // 返回 4
// cache=[3,4], cnt(4)=2, cnt(3)=3