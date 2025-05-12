
class _Node {
  val: number
  next: _Node | null
  random: _Node | null

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
    this.random = (random === undefined ? null : random)
  }
}



function copyRandomList(head: _Node | null): _Node | null {
  if (head === null) {
    return head;
  }
  const hair = new _Node()
  hair.next = head;
  let p: _Node | null = head;

  while (p) {
    const newNode = new _Node(p.val);
    const next = p.next;
    p.next = newNode;
    newNode.next = next;
    p = next;
  }

  p = head;
  while (p) {
    const next = p.next
    const random = p.random;
    if (random && next) {
      next.random = random.next;
    }
    p = next?.next;
  }

  let prev: _Node | null = hair;
  p = head;
  while (p) {
    const next = p.next;
    prev!.next = next;
    prev = next;
    p.next = next?.next;
    p = next?.next!
  }
  return hair.next;
};