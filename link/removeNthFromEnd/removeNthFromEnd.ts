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


function removeNthFromEnd1(head: ListNode | null, n: number): ListNode | null {
  let k = n
  let hair = new ListNode()
  hair.next = head
  let fast = hair
  let slow = hair
  while (k > 0) {
    fast = fast.next
    k--
  }
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next

  return hair.next
}



function removeNthFromEnd2(head: ListNode | null, n: number): ListNode | null {
  const hair = new ListNode();
  hair.next = head;
  let current = hair;

  let fast = head;
  let slow = head;
  for (let i = 1; i < n; i++) {
    fast = fast.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
    current = current.next;
  }
  console.log('current:', current);
  console.log('slow:', slow);
  current.next = slow.next;


  return hair.next;
};

//head = [1,2,3,4,5] 2
// [1,2,4,5]
// [1,2,3,5]