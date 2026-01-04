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


function reverseList3(head: ListNode | null): ListNode | null {
  const headTmp = new ListNode();
  let prev = headTmp;
  let current = head;
  while (current) {
    const next = prev.next;
    prev.next = current;
    current = current.next
    prev.next.next = next;
  }



  return headTmp.next;
};


function reverseList4(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
};


function reverseList5(head: ListNode | null): ListNode | null {
  let current = head;
  let prev: ListNode | null = null;

  while (current) {
    const next = current.next;
    const tmp = prev;
    prev = current;
    prev.next = tmp;
    current = next;
  }
  return prev;
};