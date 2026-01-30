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

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]


// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3,2,1,4,5]

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // 1 -> 2 -> 3
  // 3 -> 2 -> 1
  const reverse = (head: ListNode, tail: ListNode | null) => {
    let p = head;
    let prev = p.next;
    while (prev && prev !== tail) {
      const next = prev.next;
      prev.next = p;
      p = prev;
      prev = next;
    }
    return [p, head];
  }
  if (head === null) {
    return null;
  }
  const hair = new ListNode(0, null);
  hair.next = head;
  let tail: ListNode | null = head;
  let pre = hair;
  while (tail !== null) {
    for (let i = 0; i < k; i++) {
      if (tail !== null) {
        tail = tail.next;
      } else {
        return hair.next;
      }
    }
    const [p, t] = reverse(pre.next!, tail);
    pre.next = p;
    t.next = tail;
    pre = t;
  }


  return hair.next;
};


function reverseKGroup1(head: ListNode | null, k: number): ListNode | null {
  const hair = new ListNode()
  hair.next = head
  let current = head
  let prev = hair

  while (current && current.next) {
    let tmpPrev = current
    let i = k
    while (i > 1 && current.next) {
      const tmp = current.next
      const next = tmp.next
      tmp.next = prev.next
      current.next = next
      prev.next = tmp
      i--
    }
    if (i > 1) {
      console.log(i)
      // 恢复
      console.log('prev:', prev)
      console.log(readLink(prev))
      const tmpHead = new ListNode()
      let tmpCurrent: ListNode | null = tmpHead
      while (i <= k) {
        let current: ListNode | null = prev.next
        const currentNext = current.next
        prev.next = currentNext
        const tmpNext = tmpCurrent.next
        tmpCurrent.next = current
        current.next = tmpNext
        i++
      }
      prev.next = tmpHead.next
      console.log(readLink(prev))
      break;
    }
    prev = tmpPrev
    current = current.next
  }




  return hair.next
}



function reverseKGroup2(head: ListNode | null, k: number): ListNode | null {
  const hair = new ListNode();
  let prev = hair;
  let current = head;

  while (current) {
    let i = 0;
    const latest = current;
    for (; i < k; i++) {
      if (current) {
        const prevNext = prev.next;
        prev.next = current;
        current = current.next;
        prev.next.next = prevNext;
      } else {
        break;
      }
    }

    if (i !== k) {
      const tmpHair = new ListNode();
      let tmpPrev = tmpHair;
      let current = prev.next;
      //   console.log('prev:', prev);

      for (; i > 0; i--) {
        // console.log('i:', i);
        const next = tmpPrev.next;
        // console.log('current:', current);
        tmpPrev.next = current;
        current = current.next;
        tmpPrev.next.next = next;
      }
      prev.next = tmpHair.next;
    } else {
      prev = latest;
    }
  }



  return hair.next;
};


function buildLink(nums: number[]) {
  const head = new ListNode();
  let current = head
  for (let num of nums) {
    current.next = new ListNode(num)
    current = current.next
  }
  return head.next
}

const head = buildLink([3, 9, 6, 1, 1, 4, 7])

function readLink(head: ListNode) {
  let current = head;
  const nums: number[] = [];
  while (current) {
    nums.push(current.val)
    current = current.next
  }
  return nums;
}

console.log(readLink(reverseKGroup1(head, 4)))