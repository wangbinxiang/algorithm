export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (head === null) {
    return null;
  }
  const hair = new ListNode();
  hair.next = head;
  let fast: ListNode | null = hair;
  for (let i = 0; i < n; i++) {
    fast = fast.next!;
  }

  let slow: ListNode | null = hair;
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next!;
  }
  if (slow.next!.next! !== null) {
    slow.next = slow.next!.next
  } else {
    slow.next = null
  }
  // 1


  return hair.next;
};