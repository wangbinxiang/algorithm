const num = [3, 1, 3, 2, 10, 5, 4, 6, 3, 2, 4, 1, 0, 3, 5];

// 选择排序，将数组分成两个区域，每轮从未排序区间选取最小的元素放入已排序区间末尾
const selectionSort = (num: number[]): void => {
  const n = num.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (num[j] < num[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [num[min], num[i]] = [num[i], num[min]];
    }
  }
}
// selectionSort(num);
// console.log(num);

// 冒泡排序，连续的比较与交换相邻的元素实现排序
const bubbleSort = (num: number[]): void => {
  const n = num.length;
  for (let i = 0; i < n; i++) {
    let flag = false
    for (let j = 0; j < n - i - 1; j++) {
      if (num[j] > num[j + 1]) {
        flag = true;
        [num[j], num[j + 1]] = [num[j + 1], num[j]];
      }
    }
    if (flag === false) {
      break;
    }
  }
}

// bubbleSort(num);
// console.log(num);

// 将数组分为两个有序区间和无序区间。每趟从无序区间取出一个元素，然后将其插入到有序区间的适当位置
const insertionSort = (num: number[]): void => {
  const n = num.length;

  for (let i = 0; i < n - 1; i++) {

    let j = i + 1
    let base = num[j];
    for (; j > 0; j--) {
      if (num[j - 1] > base) {
        num[j] = num[j - 1];
      } else {
        break;
      }
    }
    num[j] = base;
  }

}

// const insertionSort = (num: number[]): void => {

// }

// insertionSort(num);
// console.log(num);


// const insertionSort1 = (num: number[]): void => {

// }
// insertionSort1(num);
// console.log(num);

// 确定锚点，小于锚点的放左边，大于锚点的放右边
const quickSort = (num: number[]): void => {
  const partition = (left: number, right: number): number => {
    let l = left;
    let r = right;
    while (l < r) {
      while (l < r && num[r] >= num[left]) {
        r--;
      }
      while (l < r && num[l] <= num[left]) {
        l++
      }
      [num[l], num[r]] = [num[r], num[l]];
    }

    [num[left], num[l]] = [num[l], num[left]]

    return l;
  }


  const helper = (left: number, right: number): void => {
    if (left >= right) {
      return;
    }
    const pivot = partition(left, right);
    helper(left, pivot);
    helper(pivot + 1, right);
  }
  helper(0, num.length - 1);
}


// quickSort(num);
// console.log(num);

const enhanceQuickSort = (num: number[]): void => {
  const midThree = (left: number, right: number): number => {
    const mid = Math.floor((left + right) / 2);

    if ((left < mid && mid < right) || (right < mid && mid < left)) {
      return mid;
    }
    if ((mid < right && right < left) || (left < right && right < mid)) {
      return mid;
    }
    return left;

  }

  const partition = (left: number, right: number): number => {
    const mid = midThree(left, right);

    if (mid !== left) {
      [num[left], num[mid]] = [num[mid], num[left]]
    }

    let i = left,
      j = right;

    while (i < j) {
      while (i < j && num[j] >= num[left]) {
        j--;
      }
      while (i < j && num[i] <= num[left]) {
        i++;
      }
      [num[i], num[j]] = [num[j], num[i]];
    }
    [num[left], num[i]] = [num[i], num[left]]
    return i;
  }

  const helper = (left: number, right: number): void => {
    if (left >= right) {
      return;
    }
    const pivot = partition(left, right)
    helper(left, pivot - 1);
    helper(pivot + 1, right);
  }
  helper(0, num.length - 1);
}

// enhanceQuickSort(num);
// console.log(num);



const tailOptimizationQuickSort = (num: number[]): void => {
  const medianThree = (left: number, mid: number, right: number): number => {
    const l = num[left];
    const m = num[mid];
    const r = num[right];


    if ((l < m && m <= r) && (r < m && m <= l)) {
      return mid;
    }
    if ((m < r && r <= l) && (l < r && r <= m)) {
      return right;
    }
    return left;
  }

  const partition = (left: number, right: number): number => {

    const mid = medianThree(left, Math.floor((left + right) / 2), right);
    if (mid !== left) {
      [num[left], num[mid]] = [num[mid], num[left]];
    }

    let i = left;
    let j = right;
    while (i < j) {
      while (i < j && num[j] >= num[left]) {
        j--;
      }
      while (i < j && num[i] <= num[left]) {
        i++
      }
      [num[i], num[j]] = [num[j], num[i]];
    }

    [num[left], num[i]] = [num[i], num[left]];
    console.log('left:', left);
    console.log('right:', right);
    return i;
  }

  const helper = (left: number, right: number): void => {
    let l = left;
    let r = right;
    while (l < r) {
      console.log(num);
      const pivot = partition(l, r);
      console.log('pivot:', pivot);
      if (pivot - l < r - pivot) {
        helper(l, pivot - 1);
        l = pivot + 1;
      } else {
        helper(pivot + 1, r);
        r = pivot - 1;
      }
    }
  }
  helper(0, num.length - 1);
}


// tailOptimizationQuickSort(num);
// console.log(num);

const mergeSort = (num: number[]): void => {
  // 先分割，分割到最小后进行排序
  const merge = (left: number, right: number): void => {
    const n = right - left + 1;
    const mid = Math.floor((right + left) / 2);
    const tmp = Array(n);

    let l = left;
    let r = mid + 1;
    let k = 0;
    while (l <= mid && r <= right) {
      if (num[l] <= num[r]) {
        tmp[k] = num[l++];
      } else {
        tmp[k] = num[r++];
      }
      k++
    }
    while (l <= mid) {
      tmp[k++] = num[l++];
    }
    while (r <= right) {
      tmp[k++] = num[r++];
    }

    for (let i = 0; i < tmp.length; i++) {
      num[left + i] = tmp[i]
    }
  }

  const helper = (left: number, right: number): void => {
    if (left >= right) {
      return;
    }

    const mid = Math.floor((left + right) / 2);
    helper(left, mid);
    helper(mid + 1, right);
    merge(left, right);
  }
  helper(0, num.length - 1);
}

// mergeSort(num);
// console.log(num);

const heapSort = (num: number[]): void => {
  // 建堆
  const buildHeap = (num: number[]): number[] => {
    const heap = [0].concat(num);
    const mid = Math.floor(heap.length / 2);
    for (let i = mid; i > 0; i--) {
      heapify(heap, heap.length, i);
    }


    return heap;
  }

  // 堆化
  const heapify = (num: number[], n: number, i: number): void => {
    // 对比子元素，然后替换
    let p = i;
    while (true) {
      let maxPos = p;
      if (p * 2 <= n && num[p] < num[p * 2]) {
        maxPos = p * 2;
      }
      if (p * 2 + 1 <= n && num[maxPos] < num[p * 2 + 1]) {
        maxPos = p * 2 + 1;
      }
      if (maxPos === p) {
        break;
      }
      [num[p], num[maxPos]] = [num[maxPos], num[p]]
      p = maxPos;
    }
  }

  // 堆排序
  const sort = (num: number[]): void => {
    const heap = buildHeap(num);
    console.log(heap);
    // 首尾替换，然后堆化
    let n = heap.length - 1;
    while (n > 1) {
      [heap[1], heap[n]] = [heap[n], heap[1]];
      n--;
      heapify(heap, n, 1);
    }
    heap.shift();
    for (let i = 0; i < heap.length; i++) {
      num[i] = heap[i];
    }
  }
  sort(num);
}
heapSort(num);
console.log(num);