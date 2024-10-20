const num = [3, 1, 8, 2, 10, 5, 4, 6, 3, 7, 4, 1, 0, 9, 5];

// 将数组分为两个区间，左侧为已排序区间，右侧为未排序区间，每次从未排序区间选一个最小的放到已排序区间末尾 
const selectionSort = (num: number[]): void => {
  const n = num.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (num[j] < num[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [num[i], num[min]] = [num[min], num[i]];
    }
  }
}

// selectionSort(num);
// console.log(num);

// 通过连续的比较与交换相邻的元素实现排序。
const bubbleSort = (num: number[]): void => {
  const n = num.length;
  for (let i = 0; i < n; i++) {
    for (let j = n - 1; j > i; j--) {
      if (num[j] < num[j - 1]) {
        [num[j], num[j - 1]] = [num[j - 1], num[j]];
      }
    }
  }
}

// bubbleSort(num);
// console.log(num);

// const insertionSort = (num: number[]): void => {
//   const n = num.length;
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j > 0; j--) {
//       if (num[j] < num[j - 1]) {
//         [num[j], num[j - 1]] = [num[j - 1], num[j]];
//       } else {
//         break;
//       }
//     }
//   }
// }

//将数组分为两个区间：左侧为有序区间，右侧为无序区间，每趟从无序区间取出一个元素，然后将其插入到有序区间的适当位置
const insertionSort = (num: number[]): void => {
  const n = num.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    const base = num[j];
    while (j > 0) {
      if (num[j - 1] > base) {
        num[j] = num[j - 1];
        j--;
      } else {
        break;
      }
    }
    num[j] = base;
  }
}

// insertionSort(num);
// console.log(num);


// const insertionSort1 = (num: number[]): void => {
//   const n = num.length;
//   for (let i = 0; i < n - 1; i++) {
//     let j = i + 1;
//     const base = num[j];
//     while (j > 0) {
//       if (num[j - 1] > base) {
//         num[j] = num[j - 1];
//         j--;
//       } else {
//         break
//       }
//     }
//     num[j] = base;
//   }
// }
// insertionSort1(num);
// console.log(num);


const quickSort = (nums: number[]): void => {
  const partition = (nums: number[], left: number, right: number): number => {
    // 分割数组，前半段为小于left的，后半段为大于left的。
    let l = left;
    let r = right;
    while (l < r) {
      while (l < r && nums[r] >= nums[left]) {
        r--;
      }
      while (l < r && nums[l] <= nums[left]) {
        l++;
      }

      [nums[l], nums[r]] = [nums[r], nums[l]];
    }

    [nums[l], nums[left]] = [nums[left], nums[l]];

    return l;
  }

  const helper = (nums: number[], left: number, right: number): void => {
    if (left >= right) {
      return;
    }
    const pivot = partition(nums, left, right);

    helper(nums, left, pivot - 1);
    helper(nums, pivot + 1, right);
  }

  helper(nums, 0, nums.length - 1);
}


// quickSort(num);
// console.log(num);

const enhanceQuickSort = (nums: number[]): void => {
  const midThree = (left: number, med: number, right: number): number => {
    const l = nums[left];
    const m = nums[med];
    const r = nums[right];
    if ((l < m && m < r) || (r < m && m < l)) {
      return med;
    }
    if ((m < r && r < l) || (l < r && r < m)) {
      return right;
    }
    return left;
  }

  const partition = (nums: number[], left: number, right: number): number => {
    const med = Math.floor((left + right) / 2);
    const mid = midThree(left, med, right);
    if (mid !== left) {
      [nums[left], nums[mid]] = [nums[mid], nums[left]];
    }

    let l = left;
    let r = right;

    while (l < r) {
      while (l < r && nums[r] >= nums[left]) {
        r--;
      }
      while (l < r && nums[l] <= nums[left]) {
        l++;
      }
      [nums[l], nums[r]] = [nums[r], nums[l]];
    }
    [nums[left], nums[l]] = [nums[l], nums[left]];

    return l;
  }

  const helper = (nums: number[], left: number, right: number): void => {
    if (left >= right) {
      return;
    }

    const pivot = partition(nums, left, right);

    helper(nums, left, pivot - 1);
    helper(nums, pivot + 1, right);
  }

  helper(nums, 0, nums.length - 1);
}

// enhanceQuickSort(num);
// console.log(num);



const tailOptimizationQuickSort = (num: number[]): void => {
  const medianThree = (left: number, mid: number, right: number): number => {
    const l = num[left];
    const m = num[mid];
    const r = num[right];
    if ((l <= m && m <= r) || (r <= m && m <= l)) {
      return mid;
    }
    if ((l <= r && r <= m) || (m <= r && r <= l)) {
      return right;
    }

    return left;
  }

  const partition = (left: number, right: number): number => {
    const mid = medianThree(left, Math.floor((left + right) / 2), right);
    if (mid !== left) {
      [num[left], num[mid]] = [num[mid], num[left]];
    }

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
    [num[left], num[l]] = [num[l], num[left]];

    return l;
  }

  const helper = (left: number, right: number): void => {
    while (left < right) {
      const pivot = partition(left, right);
      if (pivot - left > right - pivot) {
        // 左边大，递归右边
        helper(pivot + 1, right);
        right = pivot - 1;
      } else {
        // 右边大，递归左边
        helper(left, pivot - 1);
        left = pivot + 1;
      }
    }
  }
  helper(0, num.length - 1);
}


// tailOptimizationQuickSort(num);
// console.log(num);

const mergeSort = (num: number[]): void => {
  // 先分割到最小，然后合并

  const merge = (left: number, mid: number, right: number): void => {
    let l = left;
    let r = mid + 1;
    let k = 0;
    const tmp = Array(right - left + 1);

    while (l <= mid && r <= right) {
      if (num[l] <= num[r]) {
        tmp[k++] = num[l++];
      } else {
        tmp[k++] = num[r++];
      }
    }

    while (l <= mid) {
      tmp[k++] = num[l++];
    }

    while (r <= right) {
      tmp[k++] = num[r++];
    }

    for (let i = 0; i < tmp.length; i++) {
      num[left + i] = tmp[i];
    }
  }

  const helper = (left: number, right: number): void => {
    if (left >= right) {
      return;
    }
    const mid = left + Math.floor((right - left) / 2);
    helper(left, mid);
    helper(mid + 1, right);

    merge(left, mid, right);
  }
  helper(0, num.length - 1);
}

// mergeSort(num);
// console.log(num);

const heapSort = (nums: number[]): void => {

  // 建堆
  const buildHeap = (nums: number[]): number[] => {
    const arr = [0].concat(nums);
    for (let i = Math.floor(nums.length / 2); i >= 1; i--) {
      heapify(arr, nums.length, i);
    }
    return arr;
  }


  // 堆化
  const heapify = (nums: number[], n: number, i: number): void => {
    // 父元素比较左右子元素
    let p = i;
    while (true) {
      let maxPos = p;
      if (p * 2 <= n && nums[p] <= nums[p * 2]) {
        maxPos = p * 2;
      }
      if (p * 2 + 1 <= n && nums[maxPos] <= nums[p * 2 + 1]) {
        maxPos = p * 2 + 1;
      }
      if (maxPos === p) {
        break;
      }
      [nums[maxPos], nums[p]] = [nums[p], nums[maxPos]];
      p = maxPos;
    }
  }
  // 排序
  const sort = (nums: number[]): void => {
    const heap = buildHeap(nums);
    console.log(heap);
    let k = nums.length;
    while (k > 1) {
      [heap[1], heap[k]] = [heap[k], heap[1]];
      k--;
      heapify(heap, k, 1);
    }
    console.log(heap);
    heap.shift();
    for (let i = 0; i < nums.length; i++) {
      nums[i] = heap[i];
    }
  }
  sort(nums);
}
heapSort(num)
console.log(num);