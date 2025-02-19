



class Heap<T> {
  heap: T[];
  compare: (a: T, b: T) => boolean;
  constructor(list: T[], compare: (a: T, b: T) => boolean) {
    // 构造堆
    // 先存储数据，然后向上堆化 
    this.heap = [...list];
    this.compare = compare;

    // 堆化
    for (let i = this.parent(this.size() - 1); i >= 0; i--) {
      this.shiftDown(i);
    }
  }
  // private 堆化
  // private 左子树
  private left(i: number): number {
    return i * 2 + 1;
  }
  // private 右子树
  private right(i: number): number {
    return i * 2 + 2;
  }
  // private 父节点
  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  // public 元素入堆 push
  push(node: T) {
    this.heap.push(node);
    this.shiftUp(this.size() - 1);
  }
  // public 元素出堆 pop
  // public 访问堆顶元素 peek 

  size(): number {
    return this.heap.length;
  }
  // public 获取元素数量 size 
  // public 判断是否为空 isEmpty

  // private 向上调整 shiftUp
  private shiftUp(i: number): void {
    while (true) {
      const p = this.parent(i);
      if (p >= 0 && this.compare(this.heap[p], this.heap[i])) {
        this.swap(p, i);
        i = p;
      } else {
        break;
      }
    }
  }

  // private 向下调整 shiftDown

  private shiftDown(i: number): void {
    while (true) {
      // 求左几点或者又节点
      const l = this.left(i);
      const r = this.right(i);
      let ma = i;
      if (l < this.size() && this.compare(this.heap[l], this.heap[ma])) {
        ma = l;
      }
      if (r < this.size() && this.compare(this.heap[r], this.heap[ma])) {
        ma = r;
      }
      if (ma === i) {
        break;
      }
      this.swap(ma, i);
      i = ma;
    }
  }

  private swap(a: number, b: number) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
  // public 堆排序

  public sort(): T[] {
    // 复制副本
    const tmp = [...this.heap];
    // 切换 首位，弹出，排序
    const sorted: T[] = [];
    while (this.size() > 0) {
      this.swap(0, this.size() - 1);
      sorted.push(this.heap.pop()!);
      this.shiftDown(0);
    }
    this.heap = tmp;


    return sorted;
  }
}