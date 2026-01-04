export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let p1 = list1;
  let p2 = list2;
  let head = new ListNode();
  let p = head;
  while (p1 !== null && p2 !== null) {
    if (p1.val > p2.val) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }

  p.next = p1 !== null ? p1 : p2;


  return head.next;
};



function mergeTwoLists1(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let head = new ListNode()
  let current = head
  let l1 = list1
  let l2 = list2
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1
      l1 = l1.next
    } else {
      current.next = l2
      l2 = l2.next
    }
    current = current.next
  }

  current.next = l1 ? l1 : l2

  return head.next
}



function mergeTwoLists2(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let head = new ListNode();
  let prev = head;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      prev.next = list1;
      list1 = list1.next
    } else {
      prev.next = list2;
      list2 = list2.next
    }
    prev = prev.next;
  }
  if (list1) {
    prev.next = list1;
  } else {
    prev.next = list2;
  }


  return head.next;
};