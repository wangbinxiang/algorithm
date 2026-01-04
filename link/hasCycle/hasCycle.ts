export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 给你一个链表的头节点 head ，判断链表中是否有环。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

// 如果链表中存在环 ，则返回 true 。 否则，返回 false 。

function hasCycle(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return false;
  }
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast !== null && slow !== null) {
    if (slow === fast) {
      return true;
    }
    slow = slow.next;
    if (fast.next) {
      fast = fast.next
    }
    if (fast.next) {
      fast = fast.next
    }
  }
  return false;
};


//快慢指针，如果两个指针相等则存在环，如果快指针变为null则没有环
function hasCycle1(head: ListNode | null): boolean {
  let ans = false
  let fast = head
  let slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }


  return ans
}



function hasCycle2(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
};