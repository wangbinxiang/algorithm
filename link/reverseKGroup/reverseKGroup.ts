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