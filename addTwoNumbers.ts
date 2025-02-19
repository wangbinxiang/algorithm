export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const head = new ListNode();
  let p = head;
  let inc = false;
  while (l1 !== null || l2 !== null || inc) {
    let val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0);
    const newNode = new ListNode(val % 10 + (inc ? 1 : 0));
    p.next = newNode;
    p = p.next;
    if (val > 9) {
      inc = true;
    } else {
      inc = false;
    }
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  return head.next;
}