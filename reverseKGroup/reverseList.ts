export class ListNode {
  val: number
  next: ListNode1 | null
  constructor(val?: number, next?: ListNode1 | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}



function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null
  }
  let p = head;
  let prev = head?.next;
  p.next = null;
  while (prev !== null) {
    const next = prev.next;
    prev.next = p;
    p = prev;
    prev = next;
  }


  return p;
};