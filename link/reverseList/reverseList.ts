export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
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



function reverseList1(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head
  }
  let prev = null
  let ptr = head;
  let next = ptr.next

  while (ptr.next) {
    const next = ptr.next
    ptr.next = prev
    const tmp = next.next
    next.next = ptr
    prev = next;
    ptr = tmp
  }


  return ptr;
}


function reverseList2(head: ListNode | null): ListNode | null {
  let current = head
  let prev: ListNode | null = null;
  while (current) {
    let tmp = current.next
    current.next = prev
    prev = current
    current = tmp
  }



  return prev
}