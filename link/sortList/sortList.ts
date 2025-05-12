export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

function sortList(head: ListNode | null): ListNode | null {
  // 4 -> 2 -> 1 -> 3

  // 排序 4 -> 2
  // 排序 1 -> 3


  // 初始化 首先将每个节点的next都是null
  // 每次将两个链表按排序合并

  const merge = (head1: ListNode | null, head2: ListNode | null): ListNode | null => {
    const hair = new ListNode();
    let p: ListNode = hair;
    let p1 = head1;
    let p2 = head2;
    while (p1 && p2) {
      console.log("p1 < p2:", p1.val, p2.val)
      if (p1.val < p2.val) {
        p.next = p1;
        p1 = p1.next
      } else {
        p.next = p2;
        p2 = p2.next;
      }
      p = p.next;
    }

    p.next = p1 ? p1 : p2;


    return hair.next;
  }


  const sort = (head: ListNode | null, tail: ListNode | null): ListNode | null => {
    if (head === null) {
      return null;
    }
    if (head.next === tail) {
      head.next = null;
      return head;
    }


    // 分割节点 每次分成两半
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (slow && fast && fast !== tail) {
      slow = slow.next
      fast = fast.next
      if (fast && fast !== tail) {
        fast = fast.next
      }
    }
    return merge(sort(head, slow), sort(slow, tail))
    // 递归分割
  }

  return sort(head, null);
};

function sortList1(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }
  const merge = (head1: ListNode, head2: ListNode | null): ListNode => {
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

  let count = 0;

  const hair = new ListNode();
  hair.next = head;
  let prev: ListNode | null = hair;
  let current: ListNode | null = prev.next;
  while (current && prev) {
    count++;
    const head1: ListNode | null = current;
    current = current.next;
    if (current) {
      count++
      head1.next = null;
      const head2 = current
      current = current.next;
      head2.next = null;
      const merged = merge(head1, head2);
      prev.next = merged;
      prev = merged.next
    } else {
      prev.next = head1;
    }
  }

  // let currentLength = 2;
  for (let currentLength = 2; currentLength < count; currentLength <<= 1) {
    prev = hair;
    let current: ListNode | null = prev.next;
    while (current) {
      const head1 = current;
      for (let i = 1; i < currentLength && current.next !== null; i++) {
        current = current.next
      }

      const head2 = current.next;

      current.next = null;

      current = head2;


      for (let i = 1; i < currentLength && current?.next; i++) {
        current = current.next
      }
      let next: ListNode | null = null
      if (current) {
        next = current.next
        current.next = null;
      }

      const merged = merge(head1, head2);
      prev.next = merged;
      while (prev.next !== null) {
        prev = prev.next;
      }
      current = next;
    }
  }
  return hair.next;
}


const head = new ListNode();
let p = head;
[-1, 5, 3, 4, 0].forEach(item => {
  p.next = new ListNode(item);
  p = p.next
})

let res = sortList1(head.next);
while (res) {
  console.log(res.val);
  res = res.next;
}