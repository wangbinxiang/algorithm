export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}



function isPalindrome(head: ListNode | null): boolean {
  if (head === null) {
    return false;
  }
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  const reverse = (head: ListNode | null) => {
    let p: ListNode | null = head;
    let prev: ListNode | null = null;
    while (p !== null) {
      const next = p.next;
      p.next = prev;
      prev = p;
      p = next;
    }
    return prev;
  }
  let firstHalfReverse = reverse(slow.next);

  let p: ListNode | null = head;
  let p2 = firstHalfReverse;
  let result = true;
  while (result && p2 !== null && p !== null) {
    if (p.val !== p2.val) {
      result = false;
    }
    p = p.next;
    p2 = p2.next
  }


  // 1 -> 2 -> 3 -> 3 -> 2 -> 1
  // 1 -> 2 -> 3 -> 3 <- 2 -> 1
  // 快慢指针，到中心位置后

  // 反转后半段指针

  // 对比是否是回文

  // 恢复链表

  // 返回结果
  slow.next = reverse(firstHalfReverse);


  return result;
}



function isPalindrome1(head: ListNode | null): boolean {
  if (head.next === null) {
    return true
  }
  // 快慢指针
  // 快指针一次走两步
  // 慢指针一次走一步，并且反转链表
  // 快指针走到头后 开始对比
  let prev: ListNode | null = null
  let slow: ListNode | null = head
  let fast: ListNode | null = head
  while (fast && fast.next) {
    fast = fast.next.next
    let tmp = slow.next
    slow.next = prev
    prev = slow
    slow = tmp
  }

  if (fast !== null) {
    slow = slow.next
  }

  while (slow !== null) {
    if (slow.val !== prev.val) {
      return false
    }
    slow = slow.next
    prev = prev.next
  }


  return true
}



function isPalindrome2(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  let prev: ListNode | null = null;
  while (fast && fast.next) {
    fast = fast.next.next;

    const tmp = prev;
    const current = slow;
    slow = slow.next;
    prev = current;
    prev.next = tmp;


  }

  // console.log('prev:', prev);
  // console.log('slow:', slow);

  if (fast) {
    slow = slow.next;
  }

  while (slow) {
    if (prev.val !== slow.val) {
      return false;
    }
    prev = prev.next;
    slow = slow.next;
  }




  return true;
};