const num = [3, 1, 3, 2, 10, 5, 4, 6, 3, 2, 4, 1, 0, 3, 5];

const selectionSort = (num: number[]): void => {
  for (let i = 0; i < num.length; i++) {
    let k = i;
    for (let j = i + 1; j < num.length; j++) {
      if (num[k] > num[j]) {
        k = j
      }
    }
    if (i !== k) {
      [num[i], num[k]] = [num[k], num[i]];
    }
  }
}

// selectionSort(num);
// console.log(num);


const bubbleSort = (num: number[]): void => {
  const n = num.length;
  for (let i = n - 1; i > 0; i--) {
    let change = false
    for (let j = 0; j < i; j++) {
      if (num[j] > num[j + 1]) {
        [num[j], num[j + 1]] = [num[j + 1], num[j]];
        change = true;
      }
    }
    if (change === false) {
      break;
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

const insertionSort = (num: number[]): void => {
  const n = num.length;
  for (let i = 1; i < n; i++) {
    const base = num[i];
    let j = i - 1;
    while (j >= 0 && num[j] > base) {
      num[j + 1] = num[j];
      j--;
    }
    num[j + 1] = base;
  }
}

// insertionSort(num);
// console.log(num);


const insertionSort1 = (num: number[]): void => {
  const n = num.length;
  for (let i = 0; i < n - 1; i++) {
    let j = i + 1;
    const base = num[j];
    while (j > 0) {
      if (num[j - 1] > base) {
        num[j] = num[j - 1];
        j--;
      } else {
        break
      }
    }
    num[j] = base;
  }
}
// insertionSort1(num);
// console.log(num);


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
    [num[left], num[l]] = [num[l], num[left]];


    return l;
  }
  const helper = (left: number, right: number): void => {
    if (left >= right) {
      return;
    }
    const pivot = partition(left, right);
    helper(left, pivot - 1);
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

  const merge = (left: number, mid: number, right: number): void => {
    const tmp = Array(right - left + 1);

    let i = left;
    let j = mid + 1;
    let k = 0;

    while (i <= mid && j <= right) {
      if (num[i] <= num[j]) {
        tmp[k] = num[i];
        i++;
      } else {
        tmp[k] = num[j];
        j++;
      }
      k++
    }

    while (i <= mid) {
      tmp[k++] = num[i++];
    }
    while (j <= right) {
      tmp[k++] = num[j++];
    }

    for (k = 0; k < tmp.length; k++) {
      num[left + k] = tmp[k];
    }
  }


  const helper = (left: number, right: number): void => {
    if (left >= right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);

    helper(left, mid);
    helper(mid + 1, right);

    merge(left, mid, right);
  }
  helper(0, num.length - 1)
}

mergeSort(num);
console.log(num);