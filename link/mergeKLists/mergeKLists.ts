/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// 给你一个链表数组，每个链表都已经按升序排列。

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 示例 1：

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]


export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

  const mergeList = (a: ListNode | null, b: ListNode | null): ListNode | null => {
    if (a === null || b === null) {
      return a ?? b;
    }

    const head = new ListNode(0, null);

    let tail = head;
    let aPtr: ListNode | null = a;
    let bPtr: ListNode | null = b;
    while (aPtr !== null && bPtr !== null) {
      if (aPtr.val <= bPtr.val) {
        tail.next = aPtr;
        aPtr = aPtr.next;
      } else {
        tail.next = bPtr;
        bPtr = bPtr.next;
      }
      tail = tail.next;
    }

    tail.next = (aPtr !== null ? aPtr : bPtr);

    return head.next;
  }

  const merge = (l: number, r: number): ListNode | null => {
    if (l === r) {
      return lists[l];
    }
    if (l > r) {
      return null
    }

    const mid = (l + r) >> 1;
    return mergeList(merge(l, mid), merge(mid + 1, r));
  }

  return merge(0, lists.length - 1);
};

// 堆排序
// 小顶堆



function mergeKLists1(lists: Array<ListNode | null>): ListNode | null {
  // 构建一个小顶堆
  // 弹出堆顶节点
  // 节点改成下一个，重现入堆
  // 循环该过程

  const heap = new MinHeap([], (a: ListNode, b: ListNode) => a.val < b.val);

  for (const list of lists) {
    if (list !== null) {
      heap.offer(list);
    }
  }

  const head = new ListNode(0, null);
  let tail = head;
  while (heap.size() > 0) {
    const node = heap.poll();
    tail.next = node;
    tail = tail.next;
    if (node.next !== null) {
      heap.offer(node.next)
    }
  }

  return head.next;
}

class MinHeap<T> {
  private heap: T[];
  compare: (a: T, b: T) => boolean;

  constructor(list: T[], compare: (a: T, b: T) => boolean) {
    this.heap = list;
    this.compare = compare;
    for (let i = this.parent(this.heap.length - 1); i >= i; i--) {
      this.shiftDown(i);
    }
  }

  private left(i: number) {
    return i * 2 + 1;
  }

  private right(i: number) {
    return i * 2 + 2;
  }

  private parent(i: number) {
    return Math.floor((i - 1) / 2);
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  private shiftUp(i: number) {
    while (true) {
      const p = this.parent(i);
      if (p >= 0 && this.compare(this.heap[i], this.heap[p])) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else {
        break;
      }
    }
  }

  poll(): T {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.shiftDown(0);
    }
    return min;
  }

  offer(node: T) {
    this.heap.push(node);
    this.shiftUp(this.heap.length - 1);
  }

  size(): number {
    return this.heap.length;
  }

  private shiftDown(i: number) {
    while (true) {
      const l = this.left(i);
      const r = this.right(i);
      let maxPos = i;

      if (l < this.size() && this.compare(this.heap[maxPos], this.heap[l])) {
        maxPos = l;
      }
      if (r < this.size() && this.compare(this.heap[maxPos], this.heap[r])) {
        maxPos = r;
      }
      if (maxPos === i) {
        break;
      }
      [this.heap[i], this.heap[maxPos]] = [this.heap[maxPos], this.heap[i]];
      i = maxPos;
    }
  }
}


// 递归两两合并，
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) {
    return null;
  }
  const merge = (head1: ListNode | null, head2: ListNode | null): ListNode => {
    const head = new ListNode();
    let p = head;
    let p1: ListNode | null = head1;
    let p2: ListNode | null = head2;
    while (p1 && p2) {
      if (p1.val < p2.val) {
        p.next = p1;
        p1 = p1.next;
      } else {
        p.next = p2;
        p2 = p2.next;
      }
      p = p.next;
    }
    p.next = p1 ?? p2;

    return head.next!;
  }

  const mergeList = (start: number, end: number): ListNode | null => {
    if (start > end) {
      return null;
    }

    if (start === end) {
      return lists[start];
    }

    const mid = Math.floor((start + end) / 2);

    return merge(mergeList(start, mid), mergeList(mid + 1, end));
  }

  return mergeList(0, lists.length - 1);
}

// const list = [
//   [-10, -5, 3, 2],
//   [-9, -4, 2, 1],
//   [-8, -3, 4, 5],
//   [-7, -2, 6, 9],
// ];

// const list = [
//   [1, 4, 5],
//   [1, 3, 4,],
//   [2, 6],
// ];

const list = [
  [-10, -9, -9, -3, -1, -1, 0],
  [-5],
  [4],
  [-8],
  [],
  [-9, -6, -5, -4, -2, 2, 3],
  [-3, -3, -2, -1, 0]
];

const nodeList = list.map(item => {
  const head = new ListNode();
  let p = head;
  item.forEach(item => {
    if (item) {
      p.next = new ListNode(item);
      p = p.next
    }
  })
  return head.next;
})

console.log(nodeList)
// let res = mergeKLists2(nodeList);
// while (res) {
//   console.log(res.val);
//   res = res.next;
// }


// 优先队列

// 复制到一个数组
// 然后从最后一个元素的父元素开始堆化
// 某元素的左元素是 2n + 1, 右元素是2n + 2; 0 ; 1; 2
// 父元素是 Math.floor(n / 2) - 1
// 小顶堆

class MinHeap1<T> {

  list: T[];
  compare: (a: T, b: T) => boolean;

  constructor(list: T[], compare: (a: T, b: T) => boolean) {
    this.list = list;
    this.compare = compare;
    console.log('this.parent(list.length - 1):', this.parent(list.length - 1));
    for (let i = this.parent(list.length - 1); i >= 0; i--) {
      console.log('i:', i);
      this.slideDown(i);
    }
  }

  insert(node: T): void {
    this.list.push(node);
    this.slideUp(this.size() - 1);
  }

  pop(): T | null {
    if (this.size() === 0) {
      return null;
    }
    const top = this.list[0];
    const pop = this.list.pop();
    if (this.size() > 0 && pop) {
      this.list[0] = pop;
      console.log("this.list[0]:", this.list[0]);
      this.slideDown(0);
    }
    return top;
  }

  size(): number {
    return this.list.length;
  }

  slideUp(n: number): void {
    let p = this.parent(n);
    let i = n;

    while (p >= 0) {
      if (this.compare(this.list[p], this.list[i])) {
        [this.list[p], this.list[i]] = [this.list[i], this.list[p]];
        i = p;
        p = this.parent(i);
      } else {
        break;
      }
    }
  }

  slideDown(n: number): void {
    const size = this.size()
    let i = n;
    while (i <= size) {
      const left = this.left(i);
      const right = this.right(i);
      let maxPost = i;
      if (left < size && this.compare(this.list[i], this.list[left])) {
        maxPost = left;
      }
      if (right < size && this.compare(this.list[maxPost], this.list[right])) {
        maxPost = right;
      }
      if (maxPost === i) {
        break;
      }
      [this.list[i], this.list[maxPost]] = [this.list[maxPost], this.list[i]];
      i = maxPost;
      console.log("maxPost:", maxPost);
    }
  }

  private parent(n: number): number {
    return Math.floor((n - 1) / 2);
  }

  private left(n: number): number {
    return n * 2 + 1;
  }

  private right(n: number): number {
    return n * 2 + 2;
  }

  // 将堆顶 弹出

}


function mergeKLists3(lists: Array<ListNode | null>): ListNode | null {
  const compare = (a: ListNode, b: ListNode): boolean => {
    return a.val > b.val;
  }
  const heap = new MinHeap1<ListNode>(lists.filter(item => item !== null), compare);
  console.log(heap.list);
  const head = new ListNode();
  let p = head;

  while (heap.size() > 0) {
    console.log(heap.list);



    const top = heap.pop();
    if (top) {
      p.next = top;
      p = p.next;
      console.log("next");
      console.log(heap.list);
      if (top.next) {
        console.log("top.next", top.next);
        heap.insert(top.next);
      }
    }
  }

  return head.next;
}

// while (res) {
//   console.log(res.val);
//   res = res.next;
// }


// 小顶堆 
class MinHeap2<T> {
  public list: T[]
  private compare: (a: T, b: T) => boolean
  constructor(list: T[], compare: (a: T, b: T) => boolean) {
    this.list = list
    this.compare = compare
    this.heapify()
  }

  get size() {
    return this.list.length
  }

  heapify() {
    const len = this.size
    if (len > 1) {
      // 从最后一位数的父元素开始堆化  b
      const p = this.parent(len - 1)
      for (let i = p; i >= 0; i--) {
        this.slideDown(i)
      }
    }
  }

  parent(i: number) {
    return Math.floor((i - 1) / 2)
  }

  slideDown(start: number) {
    const len = this.size
    let j = start
    while (j < len) {
      let minPos = j
      const left = 2 * j + 1
      const right = 2 * j + 2
      if (this.list[left] && this.compare(this.list[left], this.list[minPos])) {
        minPos = left
      }
      if (this.list[right] && this.compare(this.list[right], this.list[minPos])) {
        minPos = right
      }

      if (minPos === j) {
        break
      } else {
        [this.list[j], this.list[minPos]] = [this.list[minPos], this.list[j]]
        j = minPos
      }
    }
  }

  slideUp(start: number) {
    let i = start
    while (i > 0) {
      // console.log('i:', i, this.list[i])
      const p = this.parent(i)
      // console.log('p:', p, this.list[p])
      if (this.compare(this.list[p], this.list[i])) {
        break
      }
      [this.list[p], this.list[i]] = [this.list[i], this.list[p]]
      i = p
    }
    // process.exit()
  }

  pop(): T | undefined {
    // 头节点和尾节点互换位置
    const min = this.list[0]
    console.log('min:', min)
    console.log('this.list:', this.list)
    const last = this.list.pop()

    console.log('last:', last)
    console.log('this.list.length && last', this.list.length && last)
    if (this.list.length && last) {
      this.list[0] = last
      console.log('this.list:', this.list)
      this.slideDown(0)
      console.log('this.list[0]:', this.list[0])
    }

    // 弹出尾节点
    // 头节点向下堆化
    return min
  }

  insert(node: T) {
    this.list.push(node)
    this.slideUp(this.size - 1)
  }


}


function mergeKList4(lists: Array<ListNode | null>): ListNode | null {
  console.log(lists)
  const heap = new MinHeap2<ListNode>(lists.filter(item => item !== null), (a: ListNode, b: ListNode): boolean => {
    return a.val < b.val
  })
  const hair = new ListNode()
  let prev = hair

  while (heap.size > 0) {
    const node = heap.pop()
    // console.log('prev', prev)
    // console.log('pop node', node.val)
    console.log('-------------')
    console.log('node.val:', node.val)
    if (node.val === -4) {
      for (let i = 0; i < heap.size; i++) {
        console.log(heap.list[i] ? heap.list[i].val : 'null')
      }
    }
    prev.next = node
    prev = prev.next



    if (node.next) {
      console.log('node.next:', node.next.val)
      if (node === node.next) {
        return
      }
      heap.insert(node.next)
      console.log(heap.list[0].val)
    }

    for (let i = 0; i < heap.size; i++) {
      console.log(heap.list[i] ? heap.list[i].val : 'null')
    }
    console.log('-------------')
  }


  // 弹出堆顶链表

  // 获取该链表当值节点

  // 该链表值改成当前节点的下一个节点

  // 如果下一节点不为null，重新插入小顶堆

  console.log(heap)
  return hair.next
}

// 还有一个归并排序的方案
function mergeKLists5(lists: Array<ListNode | null>): ListNode | null {

  class MinHeap {
    private heap: Array<ListNode | null> = []

    add(item: ListNode | null) {
      this.heap.push(item)
      if (this.heap.length > 1) {
        // 从底向上对比，将小的移动至上部
        let i = this.heap.length - 1;
        while (i >= 1) {
          const parent = Math.round(i / 2) - 1;
          if (this.heap[i].val < this.heap[parent].val) {
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
          } else {
            break;
          }
        }
      }
    }

    pop(): ListNode {
      let head = this.heap[0];
      const node = head;
      head = head.next;
      if (head) {
        this.heap[0] = head;
      } else {
        const pop = this.heap.pop();
        if (this.heap.length > 0) {
          this.heap[0] = pop;
        }
      }

      if (this.heap.length > 0) {
        let i = 0;
        const n = this.heap.length - 1;

        while (i < n) {
          let pos = i;
          const left = i * 2 + 1;
          const right = i * 2 + 2;
          if (left <= n && this.heap[pos].val > this.heap[left].val) {
            pos = left;
          }

          if (right <= n && this.heap[pos].val > this.heap[right].val) {
            pos = right;
          }
          if (pos !== i) {
            [this.heap[i], this.heap[pos]] = [this.heap[pos], this.heap[i]]
            i = pos;
          } else {
            break;
          }
        }
      }


      return node;
    }
    size(): number {
      return this.heap.length;
    }
  }

  const heap = new MinHeap();

  for (const item of lists) {
    if (item) {
      heap.add(item);
    }
  }

  const head = new ListNode();
  let prev = head;

  while (heap.size()) {
    const node = heap.pop();
    prev.next = node;
    prev = prev.next;
  }



  return head.next;
};



// const link = nodeList[5]
// let prev = link
// while (prev) {
//   console.log(prev.val)
//   prev = prev.next
// }


let res = mergeKList4(nodeList);
console.log(res)
// 优先级队列
// 堆化


// 分治，两两合并o.momm