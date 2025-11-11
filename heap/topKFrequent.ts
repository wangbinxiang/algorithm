interface Item {
  key: number
  value: number
}

function topKFrequent(nums: number[], k: number): number[] {
  const ans: number[] = [];
  const list: Map<number, number> = new Map()
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    const val = list.get(num);
    if (val) {
      list.set(num, val + 1)
    } else {
      list.set(num, 1)
    }
  }


  const flag = list.size - k;
  console.log(flag)

  if (flag === 0) {
    for (let item of list.keys()) {
      ans.push(item);
    }
    return ans
  }


  const nodeList: Item[] = [];
  console.log(list);
  list.forEach((value, key) => {
    nodeList.push({ key, value })
  })




  const help = (left: number, right: number) => {
    // 求出后k个值
    if (left === right) {
      return;
    }
    const pivot = nodeList[left].value;
    let l = left - 1;
    let r = right + 1;

    while (l < r) {
      do {
        l++
      } while (nodeList[l].value < pivot)

      do {
        r--
      } while (nodeList[r].value > pivot)

      if (l < r) {
        [nodeList[l], nodeList[r]] = [nodeList[r], nodeList[l]]
      }
    }
    if (r <= flag) {
      help(r + 1, right);
    } else {
      help(left, r);
    }
  }
  help(0, nodeList.length - 1)
  console.log(nodeList)

  for (let i = flag; i < nodeList.length; i++) {
    ans.push(nodeList[i].key)
  }

  return ans;
};



function topKFrequent1(nums: number[], k: number): number[] {
  const items: Record<number, number> = {};

  for (const num of nums) {
    if (items[num]) {
      items[num]++
    } else {
      items[num] = 1
    }
  }

  console.log(items)
  const heap: number[][] = [];
  for (const i in items) {
    console.log(i, items[i])
    if (heap.length === k) {
      if (heap[0][1] < items[i]) {
        heap[0] = [+i, items[i]]
        let j = 0;
        while (true) {
          const left = j * 2 + 1;
          const right = j * 2 + 2;
          let pos = j;
          if (left < k && heap[left][1] < heap[pos][1]) {
            pos = left;
          }
          if (right < k && heap[right][1] < heap[pos][1]) {
            pos = right;
          }
          if (pos !== j) {
            [heap[pos], heap[j]] = [heap[j], heap[pos]]
            j = pos
          } else {
            break;
          }
        }
      }
    } else {
      heap.push([+i, items[i]]);
      let j = heap.length - 1
      while (j > 0) {
        const p = Math.round(j / 2) - 1;
        if (heap[p][1] > heap[j][1]) {
          [heap[p], heap[j]] = [heap[j], heap[p]];
          j = p
        } else {
          break;
        }
      }
    }
  }
  console.table(heap)
  return heap.map(item => item[0]);
};


// 桶排序
function topKFrequent2(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();

  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => [])

  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num)
  }

  // console.log(buckets);
  const result: number[] = [];

  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  // console.log(freqMap);



  return result;
}

// 快速排序
function topKFrequent3(nums: number[], k: number): number[] {

  const numFreq = new Map<number, number>();
  for (let num of nums) {
    numFreq.set(num, (numFreq.get(num) || 0) + 1);
  }

  const result: [number, number][] = [];
  for (const [num, freq] of numFreq.entries()) {
    result.push([num, freq]);
  }

  const n = result.length;
  const target = n - k;
  let left = 0;
  let right = n - 1;
  if (target === 0) {
    return result.map(item => item[0])
  }

  console.log(result)

  while (true) {
    const pivot = result[left][1];
    let l = left + 1;
    let r = right;
    while (l <= r) {
      while (l <= r && result[l][1] < pivot) {
        l++;
      }
      while (l <= r && result[r][1] > pivot) {
        r--;
      }
      if (l >= r) {
        break;
      }
      [result[l], result[r]] = [result[r], result[l]];
      l++;
      r--;
    }
    [result[left], result[r]] = [result[r], result[left]];
    if (r === target) {
      break;
    } else if (r > target) {
      right = r - 1;
    } else {
      left = r + 1;
    }
  }
  console.log(result)

  return result.slice(target).map(item => item[0]);
}

// 桶排序
function topKFrequent4(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();

  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);

  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }
  const result: number[] = [];
  for (let i = nums.length; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i])
  }

  return result;
}

// 快速排序
function topKFrequent5(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const result: [number, number][] = [];
  for (const item of freqMap.entries()) {
    result.push(item);
  }

  console.log(result);
  const n = result.length;
  const target = n - k;

  if (target === 0) {
    return result.map(item => item[0])
  }


  let left = 0;
  let right = n - 1;
  while (true) {
    const pivotIndex = Math.round(Math.random() * (right - left)) + left;
    console.log('pivotIndex:', pivotIndex);
    [result[left], result[pivotIndex]] = [result[pivotIndex], result[left]];
    const pivot = result[left][1];
    console.log('pivot:', pivot, result[left]);
    let l = left + 1;
    let r = right;
    while (true) {
      while (l <= r && result[l][1] < pivot) {
        l++;
      }
      while (l <= r && result[r][1] > pivot) {
        r--;
      }
      if (l >= r) {
        break;
      }
      [result[l], result[r]] = [result[r], result[l]];
      l++;
      r--;
    }
    [result[left], result[r]] = [result[r], result[left]];
    if (r === target) {
      break;
    } else if (r > target) {
      right = r - 1;
    } else {
      left = r + 1;
    }
  }

  console.log(result);

  return result.slice(target).map(item => item[0]);
}


function topKFrequent6(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const result: [number, number][] = [];
  for (const item of freqMap.entries()) {
    result.push(item);
  }

  console.log(result);
  const n = result.length;
  const target = n - k;

  if (target === 0) {
    return result.map(item => item[0])
  }


  let left = 0;
  let right = n - 1;
  while (true) {
    if (left === right) {
      break;
    }
    const pivotIndex = Math.round(Math.random() * (right - left)) + left;
    console.log('pivotIndex:', pivotIndex);
    [result[left], result[pivotIndex]] = [result[pivotIndex], result[left]];
    const pivot = result[left][1];
    console.log('pivot:', pivot, result[left]);
    let l = left - 1;
    let r = right + 1;
    while (l < r) {
      do {
        l++;
      } while (result[l][1] < pivot);
      do {
        r--;
      } while (result[r][1] > pivot);
      if (l < r) {
        [result[l], result[r]] = [result[r], result[l]];
      }
    }
    if (r > target) {
      right = r;
    } else {
      left = r + 1;
    }
  }
  console.log(result);
  return result.slice(target).map(item => item[0]);
}


interface Item1 {
  val: number;
  total: number;
}

function topKFrequent7(nums: number[], k: number): number[] {

  const map = new Map<number, number>();

  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  const arr: Item1[] = []

  map.forEach((val, key) => {
    arr.push({ val: key, total: val });
  })
  const target = arr.length - k;
  console.log(arr)
  let left = 0;
  let right = arr.length - 1;
  while (true) {
    console.log('left:', left);
    const pivot = arr[left].total;
    let l = left + 1;
    let r = right;
    while (l <= r) {
      while (l <= r && pivot > arr[l].total) {
        l++;
      }
      while (l <= r && pivot < arr[r].total) {
        r--;
      }
      if (l < r) {
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++;
        r--;
      } else {
        break;
      }
    }
    [arr[left], arr[r]] = [arr[r], arr[left]];
    console.log('r:', r);
    if (r === target) {
      break;
    } else if (r > target) {
      right = r - 1;
    } else {
      left = r + 1;
    }
  }
  console.log(arr)
  return [];
};

console.log(topKFrequent7([1, 1, 1, 2, 2, 3], 2))
// console.log(topKFrequent3([1], 1))