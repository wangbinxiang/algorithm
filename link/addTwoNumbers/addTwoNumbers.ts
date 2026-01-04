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


function addTwoNumbers1(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const head = new ListNode(-1)
  let current = head
  let plus = 0
  while (l1 || l2) {
    let count = 0
    if (l1 && l2) {
      count = l1.val + l2.val + plus
      l1 = l1.next
      l2 = l2.next
    } else if (l1) {
      count = l1.val + plus
      l1 = l1.next
    } else if (l2) {
      count = l2.val + plus
      l2 = l2.next
    }
    if (count > 9) {
      plus = 1
      current.next = new ListNode(count - 10)
    } else {
      current.next = new ListNode(count)
      plus = 0
    }
    current = current.next
  }
  if (plus) {
    current.next = new ListNode(1)
  }


  return head.next
}



function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let head = new ListNode();
  let prev = head;
  let increase = false;
  while (l1 && l2) {
    let val = l1.val + l2.val + (increase ? 1 : 0);
    if (val > 9) {
      increase = true;
      val -= 10;
    } else {
      increase = false;
    }
    prev.next = new ListNode(val);
    prev = prev.next
  }

  let current: ListNode | null = null;
  if (l1) {
    current = l1;
  } else if (l2) {
    current = l2;
  }
  while (current) {
    let val = current.val + (increase ? 1 : 0);
    if (val > 9) {
      increase = true;
      val -= 10;
    } else {
      increase = false;
    }
    prev.next = new ListNode(val);
    prev = prev.next;
    current = current.next;
  }
  if (increase) {
    prev.next = new ListNode(1);
  }



  return head.next;
};