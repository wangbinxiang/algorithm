/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) {
    return null;
  }
  let aPtr: ListNode | null = headA;
  let bPtr: ListNode | null = headB;
  let aCount = 0;
  let bCount = 0;
  while (aPtr !== null) {
    aPtr = aPtr.next;
    aCount++;
  }
  while (bPtr !== null) {
    bPtr = bPtr.next;
    bCount++;
  }
  aPtr = headA;
  bPtr = headB;
  if (aCount > bCount) {
    let count = aCount - bCount;
    while (count > 0) {
      aPtr = aPtr.next!
      count--;
    }
  } else {
    let count = bCount - aCount;
    while (count > 0) {
      bPtr = bPtr.next!
      count--;
    }
  }

  while (aPtr !== null && bPtr !== null) {
    if (aPtr === bPtr) {
      return aPtr;
    }
    aPtr = aPtr.next;
    bPtr = bPtr.next;
  }
  return null;
}


function getIntersectionNode1(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) {
    return null;
  }
  let aPtr: ListNode | null = headA;
  let bPtr: ListNode | null = headB;

  while (aPtr !== bPtr) {
    aPtr = aPtr === null ? headB : aPtr.next;
    bPtr = bPtr === null ? headA : bPtr.next;
  }


  return aPtr;
}


function getIntersectionNode2(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) {
    return null
  }

  let ptrA = headA;
  let ptrB = headB;
  while (ptrA !== ptrB) {
    ptrA = ptrA === null ? headB : ptrA.next;
    ptrB = ptrB === null ? headA : ptrB.next;
  }
  return ptrA;
}


function getIntersectionNode3(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let a = headA
  let b = headB

  while (a !== b) {
    a = a !== null ? a.next : headB
    b = b !== null ? b.next : headA
  }


  return a
}


function getIntersectionNode4(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let tmpA = headA;
  let tmpB = headB;

  while (tmpA !== tmpB) {
    tmpA = tmpA !== null ? tmpA.next : headB;
    tmpB = tmpB !== null ? tmpB.next : headA;
  }


  return tmpA;
};