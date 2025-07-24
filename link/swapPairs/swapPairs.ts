export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。




function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }

  const hair = new ListNode();
  hair.next = head;
  let prev = hair;
  let p: ListNode | null = head;
  while (p !== null && p.next !== null) {
    const next = p.next;
    p.next = next.next;
    next.next = p;
    prev.next = next;
    prev = p;
    p = p.next;
  }

  return hair.next;
};


function swapPairs1(head: ListNode | null): ListNode | null {
  const hair = new ListNode()
  hair.next = head
  let prev = hair
  let current = head
  while (current && current.next) {
    const next = current.next.next
    const tmp = current.next
    current.next = next
    tmp.next = current
    prev.next = tmp
    prev = current
    current = next
  }



  return hair.next
}