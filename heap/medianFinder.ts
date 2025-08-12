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


class MedianFinder2 {
  nums1: number[]
  nums2: number[]


  constructor() {
    this.nums1 = []
    this.nums2 = []
  }

  addNum(num: number): void {
    // nums1 作为主存储, 小顶堆
    // 因为从空数组开始添加，所以不用初始化
    // 写入nums1

    // 如果num > this.nums1
    // 写入this.nums1，如果 this.nums1.length - this.nums2.length > 1
    // 弹出 this.nums1 顶。写入this.nums2

    // 否则写入this.nums2，
    // 如果this.nums2.length > this.nums1.length
    // 弹出this.nums2 写入this.nums1
    if (this.nums1.length === 0) {
      this.nums1[0] = num
      return
    }
    if (num >= this.nums1[0]) {
      this.add(num, this.nums1, (a, b) => a > b)
      if (this.nums1.length - this.nums2.length > 1) {
        const pop = this.pop(this.nums1, (a, b) => a > b)
        this.add(pop, this.nums2, (a, b) => a < b)
      }
    } else {
      this.add(num, this.nums2, (a, b) => a < b)
      if (this.nums2.length > this.nums1.length) {
        const pop = this.pop(this.nums2, (a, b) => a < b)
        this.add(pop, this.nums1, (a, b) => a > b)
      }
    }
  }

  findMedian(): number {
    // console.log(this.nums1)
    // console.log(this.nums2)
    if (this.nums1.length !== this.nums2.length) {
      return this.nums1[0]
    } else {
      return (this.nums1[0] + this.nums2[0]) / 2
    }
  }

  add(num: number, nums: number[], compare: (a: number, b: number) => boolean) {
    // 添加到数组队尾，然后从队尾开始向上比较
    nums.push(num)
    let i = nums.length - 1
    while (i > 0) {
      // 找找到父节点开始比较
      const parent = Math.floor((i - 1) / 2)
      // console.log(nums[parent], nums[i], compare(nums[parent], nums[i]))
      if (parent >= 0 && compare(nums[parent], nums[i])) {
        [nums[i], nums[parent]] = [nums[parent], nums[i]]
        i = parent
      } else {
        break
      }
    }
  }

  pop(nums: number[], compare: (a: number, b: number) => boolean): number {

    // 队头和队尾互换位置，弹出队尾，然后从队头开始向下比较
    [nums[0], nums[nums.length - 1]] = [nums[nums.length - 1], nums[0]]
    // console.log('nums', nums)

    const num = nums.pop()
    let i = 0
    const n = nums.length
    while (i < n - 1) {
      let pos = i
      // 找到左节点和右节点
      const left = i * 2 + 1
      const right = i * 2 + 2
      if (left < n && compare(nums[pos], nums[left])) {
        pos = left
      }

      if (right < n && compare(nums[pos], nums[right])) {
        pos = right
      }
      if (pos !== i) {
        [nums[i], nums[pos]] = [nums[pos], nums[i]]
        i = pos
      } else {
        break;
      }
    }
    return num
  }
}

// 维护一个小顶堆，一个大顶堆
// 当小顶堆长度为0时，num直接写入小顶堆
// 当num >= 小顶堆顶时，写入小顶堆
//    当小顶堆长度超过大顶堆长度1个时
//    小顶堆顶弹出，写入大顶堆
// 当num < 小顶堆顶时，写入大顶堆
//    当大顶堆长度超过小顶堆长度时
//    大顶堆顶弹出，写入小顶堆

// 当小顶堆长度等于大顶堆时，中间值是 小顶堆顶+大顶堆顶 除以2
// 否则是小顶堆顶

const medianFinder = new MedianFinder2();
// medianFinder.addNum(0);    // arr = [0]
// medianFinder.addNum(1);    // arr = [1]
// console.log(medianFinder.findMedian()); // return 0.5
// medianFinder.addNum(2);    // arr = [0, 1, 2]
// console.log(medianFinder.findMedian()); // return 1 
// medianFinder.addNum(3);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(4);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(5);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(6);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(7);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(8);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(9);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(10);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0

// medianFinder.addNum(-49990);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(-49995);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(-49996);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(-49999);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0
// medianFinder.addNum(-50000);    // arr[1, 2, 3]
// console.log(medianFinder.findMedian()); // return 2.0

medianFinder.addNum(-1);    // arr = [0]
console.log(medianFinder.findMedian()); // -1
medianFinder.addNum(-2);    // arr = [0]
console.log(medianFinder.findMedian()); // -1.5
medianFinder.addNum(-3);    // arr = [0]
console.log(medianFinder.findMedian()); // -2
medianFinder.addNum(-4);    // arr = [0]
console.log(medianFinder.findMedian()); // -2.5
medianFinder.addNum(-5);    // arr = [0]
console.log(medianFinder.findMedian()); // -3