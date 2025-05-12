// 295. 数据流的中位数
// 困难
// 相关标签
// 相关企业
// 中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

// 例如 arr = [2,3,4] 的中位数是 3 。
// 例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5 。
// 实现 MedianFinder 类:

// MedianFinder() 初始化 MedianFinder 对象。

// void addNum(int num) 将数据流中的整数 num 添加到数据结构中。

// double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10-5次方 以内的答案将被接受。

// 示例 1：

// 输入
// ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
// [[], [1], [2], [], [3], []]
// 输出
// [null, null, null, 1.5, null, 2.0]

// 解释
// MedianFinder medianFinder = new MedianFinder();
// medianFinder.addNum(1);    // arr = [1]
// medianFinder.addNum(2);    // arr = [1, 2]
// medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
// medianFinder.addNum(3);    // arr[1, 2, 3]
// medianFinder.findMedian(); // return 2.0
// 提示:

// -105 <= num <= 105
// 在调用 findMedian 之前，数据结构中至少有一个元素
// 最多 5 * 104 次调用 addNum 和 findMedian


class MedianFinder {
  minHeap: number[];
  maxHeap: number[];
  constructor() {
    this.minHeap = [];
    this.maxHeap = [];
  }

  // 将堆顶弹出，然后将堆底移到堆顶，然后向下排序
  shiftDownMax(): number | undefined {
    if (this.maxHeap.length === 0) {
      return;
    }
    const num = this.maxHeap[0];
    const pop = this.maxHeap.pop()!;
    if (pop !== num) {
      // 将堆底移到堆顶，然后向下排序
      this.maxHeap[0] = pop
      let i = 0;
      const len = this.maxHeap.length;
      while (i * 2 + 1 < len) {
        let minPos = i;
        if (this.maxHeap[minPos] < this.maxHeap[i * 2 + 1]) {
          minPos = i * 2 + 1;
        }
        if (i * 2 + 2 < len && this.maxHeap[minPos] < this.maxHeap[i * 2 + 2]) {
          minPos = i * 2 + 2;
        }
        if (minPos !== i) {
          [this.maxHeap[i], this.maxHeap[minPos]] = [this.maxHeap[minPos], this.maxHeap[i]]
          i = minPos;
        } else {
          break;
        }
      }
    }
    return num;
  }

  // 将新数字写入堆底，然后向上排序
  shiftUpMax(num: number) {
    this.maxHeap.push(num);
    let i = this.maxHeap.length - 1;
    while (i > 0) {
      let parentPost = Math.floor((i - 1) / 2);
      if (this.maxHeap[parentPost] < this.maxHeap[i]) {
        [this.maxHeap[parentPost], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[parentPost]]
        i = parentPost
      } else {
        break;
      }
    }
  }

  // 将堆顶弹出，然后将堆底移到堆顶，然后向下排序
  shiftDownMin(): number | undefined {
    if (this.minHeap.length === 0) {
      return;
    }
    const num = this.minHeap[0];
    const pop = this.minHeap.pop()!
    if (pop !== num) {
      this.minHeap[0] = pop;
      let i = 0;
      const len = this.minHeap.length;
      while (i * 2 + 1 < len) {
        let maxPos = i * 2 + 1;
        if (i * 2 + 2 < len && this.minHeap[maxPos] > this.minHeap[i * 2 + 2]) {
          maxPos = i * 2 + 2;
        }
        if (this.minHeap[i] > this.minHeap[maxPos]) {
          [this.minHeap[i], this.minHeap[maxPos]] = [this.minHeap[maxPos], this.minHeap[i]];
          i = maxPos;
        } else {
          break;
        }
      }
    }
    return num
  }

  // 将新数组写入堆底，然后向上排序
  shiftUpMin(num: number) {
    this.minHeap.push(num);
    let i = this.minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.minHeap[parent] > this.minHeap[i]) {
        [this.minHeap[parent], this.minHeap[i]] = [this.minHeap[i], this.minHeap[parent]]
        i = parent
      } else {
        break;
      }
    }
  }

  // 维护一个大顶堆，记录一半小的数据
  // 维护一个小顶堆，记录一半大的数据

  addNum(num: number): void {
    console.log('add:', num);
    // 当总数是偶数时，让小顶堆多一个
    if (this.minHeap.length === this.maxHeap.length) {
      if (this.minHeap.length > 0 && num < this.maxHeap[0]) {
        // num 写入大顶堆
        this.shiftUpMax(num);

        const shiftDown = this.shiftDownMax();
        // 将大顶堆堆顶弹出
        console.log('shiftDownMax1:', shiftDown);
        if (shiftDown !== undefined) {
          // 将弹出数据写入小顶堆
          this.shiftUpMin(shiftDown)
        }
      } else {
        this.shiftUpMin(num);
        // num 写入小顶堆
      }
    } else {
      if (num <= this.minHeap[0]) {
        // num 写入大顶堆
        this.shiftUpMax(num)
      } else {
        // num 写入小顶堆
        this.shiftUpMin(num);

        // 小顶堆弹出
        const shiftDown = this.shiftDownMin();
        console.log('shiftDownMax2:', shiftDown);
        if (shiftDown !== undefined) {
          // 弹出数字写入大顶堆
          this.shiftUpMax(shiftDown);
        }
      }
    }
    console.log('minHeap:', this.minHeap);
    console.log('maxHeap:', this.maxHeap)
  }

  findMedian(): number {
    // 如果长度是奇数，中位数是小顶堆堆顶
    if (this.minHeap.length === this.maxHeap.length) {
      return (this.minHeap[0] + this.maxHeap[0]) / 2;
    }
    return this.minHeap[0];
    // 如果长度是偶数，中位数是小顶堆堆顶和大顶堆堆顶的平均数
  }
}

/**
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/


const medianFinder = new MedianFinder();
medianFinder.addNum(0);    // arr = [1]
medianFinder.addNum(1);    // arr = [1]
console.log(medianFinder.findMedian()); // 
medianFinder.addNum(2);    // arr = [1, 2]
console.log(medianFinder.findMedian()); //
medianFinder.addNum(3);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(4);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(5);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(6);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(7);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(8);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(9);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(10);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0

medianFinder.addNum(-49990);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(-49995);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(-49996);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(-49999);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
medianFinder.addNum(-50000);    // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0