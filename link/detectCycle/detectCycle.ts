// Definition for singly-linked list.
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

// 不允许修改 链表。


function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast !== null) {
    slow = slow.next!;
    fast = fast.next;
    if (fast === null) {
      return null;
    }
    fast = fast.next;
    if (fast === slow) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next!;
        slow = slow.next!;
      }
      return ptr;
    }
  }


  return null;
};



function detectCycle1(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return null;
  }

  // 慢快指针
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (true) {
    if (fast.next === null || fast.next.next === null || slow.next === null) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      break;
    }
  }

  let p = head;
  while (true) {
    p = p.next!;
    fast = fast.next!;
    if (p === fast) {
      break;
    }
  }
  return p;
}



function detectCycle2(head: ListNode | null): ListNode | null {
  let fast: ListNode | null = head
  let slow: ListNode | null = head

  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      break
    }
  }

  if (fast === null || fast.next === null) {
    return null
  }

  let current: ListNode | null = head
  while (current !== slow) {
    current = current.next
    slow = slow.next
  }

  return current
}


function detectCycle3(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      break;
    }
  }

  if (fast === null || fast.next === null) {
    return null;
  }

  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next
  }




  return slow;
};