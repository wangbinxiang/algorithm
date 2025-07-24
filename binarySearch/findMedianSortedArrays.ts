function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  if (m > n) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const half = Math.round((m + n) / 2);
  console.log('half:', half);
  let left = 0;
  let right = m;
  while (left <= right) {
    const i = Math.floor((left + right) / 2)
    const j = half - i;
    console.log('i:', i);
    const num1L = i > 0 ? nums1[i - 1] : Number.NEGATIVE_INFINITY;
    const num2L = j > 0 ? nums2[j - 1] : Number.NEGATIVE_INFINITY;

    const numL = Math.max(num1L, num2L);

    const num1R = i < m ? nums1[i] : Number.POSITIVE_INFINITY;
    const num2R = j < n ? nums2[j] : Number.POSITIVE_INFINITY;

    const numR = Math.min(num1R, num2R);
    console.log('numL:', numL);
    console.log('numR:', numR);
    if (numL <= numR) {
      console.log(numL, numR)
      if ((m + n) % 2 === 0) {
        return (numL + numR) / 2
      } else {
        return numL;
      }
    } else {
      if (num1L > num2R) {
        right = i - 1
      } else {
        left = i + 1
      }
    }
  }





  return 0;
};



function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  if (m > n) {
    return findMedianSortedArrays1(nums2, nums1);
  }

  const half = Math.round((m + n) / 2);
  console.log('half:', half)
  let left = 0;
  let right = m;
  while (true) {
    const i = Math.floor((left + right) / 2);
    const j = half - i
    console.log('i:', i, 'j:', j)

    const num1L = i >= 0 ? nums1[i] : Number.NEGATIVE_INFINITY;
    const num2L = j >= 0 ? nums2[j] : Number.NEGATIVE_INFINITY;

    const maxNumL = Math.max(num1L, num2L);

    const num1R = i < m ? nums1[i + 1] : Number.POSITIVE_INFINITY;
    const num2R = j < n ? nums2[j + 1] : Number.POSITIVE_INFINITY;

    const minNumR = Math.min(num1R, num2R);

    console.log('maxNumL:', maxNumL, 'minNumR:', minNumR)

    if (maxNumL <= minNumR) {
      if ((m + n) % 2 === 0) {
        return (maxNumL + minNumR) / 2;
      } else {
        return maxNumL;
      }
    } else {
      if (num1L > num2R) {
        right = i - 1;
      } else {
        left = i + 1;
      }
    }
  }
}


function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays2(nums2, nums1)
  }

  const totalLength = nums1.length + nums2.length

  let k = Math.floor((nums1.length + nums2.length + 1) / 2)

  let left1 = 0
  let left2 = 0

  while (k > 1) {

    const index1 = left1 + Math.floor(k / 2) - 1
    const index2 = left2 + Math.floor(k / 2) - 1

    const index1Val = index1 < nums1.length ? nums1[index1] : -Infinity
    const index2Val = index2 < nums2.length ? nums2[index2] : -Infinity
    console.log(k, left1, left2, index1Val, index2Val)
    if (index1Val < index2Val) {
      left1 += Math.floor(k / 2)
    } else {
      left2 += Math.floor(k / 2)
    }
    k = k - Math.floor(k / 2)

  }

  console.log(k, left1, left2)

  if (nums1[left1] < nums2[left2]) {
    if (totalLength % 2 === 0) {
      return (nums1[left1] + nums2[left2]) / 2
    } else {
      return nums1[left1]
    }
  } else {
    if (totalLength % 2 === 0) {
      if (left1 < nums1.length - 1) { }
    } else {
      return nums2[left2]
    }
  }
}


// console.log(findMedianSortedArrays2([1, 3], [2])) // 2
// console.log(findMedianSortedArrays2([1, 2], [3, 4])) // 2.5


function findMedianSortedArrays3(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    findMedianSortedArrays3(nums2, nums1)
  }
  // 分组
  // 先获取一半的值
  const n = nums1.length
  const m = nums2.length
  const half = Math.floor((m + n + 1) / 2)

  let left = 0, right = n
  while (left <= right) {
    const i = Math.floor((left + right) / 2)
    const j = half - i

    console.log('i:', i);
    console.log('j:', j);

    const left1 = i > 0 ? nums1[i - 1] : -Infinity
    const right1 = i < n ? nums1[i] : + Infinity

    const left2 = j > 0 ? nums2[j - 1] : -Infinity
    const right2 = j < m ? nums2[j] : +Infinity

    if (left1 <= right2 && left2 <= right1) {
      console.log('left1:', left1)
      console.log('right1:', right1)
      console.log('left2:', left2)
      console.log('right2:', right2)
      if ((m + n) % 2 === 1) {
        return Math.max(left1, left2)
      } else {
        return Math.floor((Math.max(left1, left2) + Math.min(right1, right2)) / 2)
      }
    } else if (left1 > right2) {
      right = i - 1
    } else {
      left = i + 1
    }
  }
  throw new Error('Unreachable')
}



// 获取k的一半half
// 在nums1和nums2 上对比  half位置的数字
// 开始对比的索引位置都为 0
// 数字小的，对比的索引变成现在的索引位置加上half，如果加上half大于数组的长度，则改为数组的长度，k减去 数组索引增加的位数 循环比较

// 如果有一个数组的索引 等于其长度 则 返回另外一个数组当前索引位+剩余的k - 1

// 如果k = 1 则返回 两个数组当前索引位最小的数字
function findMedianSortedArrays4(nums1: number[], nums2: number[]): number {
  // 

  const m = nums1.length
  const n = nums2.length

  const total = m + n

  const findK = (nums1: number[], nums2: number[], k: number): number => {
    console.log('k:', k)
    let index1 = 0, index2 = 0
    while (true) {
      const half = Math.floor(k / 2)



      if (index1 === m) {
        console.log('index1 === m', index2, k)
        return nums2[index2 + k - 1]
      }

      if (index2 === n) {
        console.log('index2 === n')
        return nums1[index1 + k - 1]
      }
      console.log('k------:', k)
      if (k === 1) {
        return Math.min(nums1[index1], nums2[index2])
      }

      const i = Math.min(index1 + half, m) - 1
      const j = Math.min(index2 + half, n) - 1

      const val1 = nums1[i]
      const val2 = nums2[j]
      console.log('half:', half)
      if (val1 < val2) {
        console.log('index1:', index1, i)
        k -= i - index1 + 1
        index1 = i + 1
        console.log('index1:', index1)
      } else {
        console.log('index2:', index2, j)
        k -= j - index2 + 1
        index2 = j + 1
        console.log('index2:', index2)
      }
    }
  }



  const half = Math.round(total / 2)
  if (total % 2 === 0) {
    // 如果是偶数则找到half和half+1 然后相加除以2
    const left = findK(nums1, nums2, half)
    console.log('left:', left)
    const right = findK(nums1, nums2, half + 1)

    console.log('right:', right)
    return (left + right) / 2
  } else {
    // 如果是奇数，则找到half的数就可以了
    return findK(nums1, nums2, half)
  }
}


function findMedianSortedArrays5(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length

  const total = m + n
  const half = Math.round(total / 2)

  const findK = (nums1: number[], nums2: number[], k: number) => {
    let i = 0
    let j = 0
    while (true) {
      const half = Math.floor(k / 2)

      if (i === m) {
        return nums2[j + k - 1]
      }

      if (j === n) {
        return nums1[i + k - 1]
      }

      if (k === 1) {
        return Math.min(nums1[i], nums2[j])
      }


      const newI = Math.min(i + half, m) - 1
      const newJ = Math.min(j + half, n) - 1

      const valI = nums1[newI]
      const valJ = nums2[newJ]

      if (valI < valJ) {
        k -= newI - i + 1
        i = newI + 1
      } else {
        k -= newJ - j + 1
        j = newJ + 1
      }
    }
  }

  if (total % 2 === 0) {
    return (findK(nums1, nums2, half) + findK(nums1, nums2, half + 1)) / 2
  } else {
    return findK(nums1, nums2, half)
  }


}


function findMedianSortedArrays6(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length
  const total = m + n
  const half = Math.round(total / 2)


  if (half % 2 === 0) {
    return findK(nums1, nums2, half)
  } else {
    return (findK(nums1, nums2, half) + findK(nums1, nums2, half + 1)) / 2
  }
  function findK(nums1: number[], nums2: number[], k: number): number {
    let i = 0
    let j = 0
    while (true) {

      if (i === m) {
        return nums2[j + k - 1]
      }

      if (j === n) {
        return nums1[i + k - 1]
      }

      if (k === 1) {
        return Math.min(nums1[i], nums2[j])
      }


      const half = Math.floor(k / 2)

      const newI = Math.min(i + half, m) - 1
      const newJ = Math.min(j + half, n) - 1

      const valI = nums1[newI]
      const valJ = nums2[newJ]

      if (valI < valJ) {
        k -= newI - i + 1
        i = newI + 1
      } else {
        k -= newJ - j + 1
        j = newJ + 1
      }
    }
  }
}




// 将数组分为两部分
//  
function findMedianSortedArrays7(nums1: number[], nums2: number[]): number {
  const n = nums1.length
  const m = nums2.length
  if (n > m) {
    return findMedianSortedArrays7(nums2, nums1)
  }
  const total = m + n;
  const k = Math.floor(total / 2)
  let left = 0
  let right = n

  while (left <= right) {
    const i = Math.floor((left + right) / 2)
    const j = k - i

    const num1L = i > 0 ? nums1[i - 1] : -Infinity
    const num1R = i < n ? nums1[i] : +Infinity
    const num2L = j > 0 ? nums2[j - 1] : -Infinity
    const num2R = j < m ? nums2[j] : +Infinity

    const maxNumL = Math.max(num1L, num2L)
    const minNumR = Math.min(num1R, num2R)

    if (maxNumL <= minNumR) {
      if (total % 2 === 0) {
        return ((maxNumL + minNumR) / 2)
      } else {
        return minNumR
      }
    } else if (num2L > num1R) {
      left = i + 1
    } else {
      right = i - 1
    }
  }
}

console.log(findMedianSortedArrays7([1], [1, 2, 3, 4, 5, 6, 7, 8, 9])) // 