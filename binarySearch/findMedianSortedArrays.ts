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

// 二分
function findMedianSortedArrays8(nums1: number[], nums2: number[]): number {
  // 找第K个位置
  const m = nums1.length
  const n = nums2.length
  const total = m + n
  const half = Math.floor((total + 1) / 2)

  const findK = (k: number) => {

    let i = 0
    let j = 0

    while (true) {
      console.log('i:', i)
      console.log('j:', j)
      console.log('k:', k)
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
      const newJ = Math.min(j + (k - half), n) - 1

      const valI = nums1[newI];
      const valJ = nums2[newJ];
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
    return (findK(half) + findK(half + 1)) / 2
  } else {
    return findK(half)
  }
}
// 分成两部分
function findMedianSortedArrays9(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  if (m > n) {
    return findMedianSortedArrays9(nums2, nums1)
  }
  const total = m + n;
  const half = Math.floor((total + 1) / 2)

  let left = 0
  let right = m
  while (true) {
    let i = Math.floor((left + right + 1) / 2)
    const j = half - i
    const leftI = i > 0 ? nums1[i - 1] : -Infinity
    const rightI = i < m ? nums1[i] : +Infinity


    const leftJ = j > 0 ? nums2[j - 1] : -Infinity
    const rightJ = j < n ? nums2[j] : + Infinity

    const maxLeft = Math.max(leftI, leftJ)
    const minRight = Math.min(rightI, rightJ)

    if (maxLeft > minRight) {
      if (leftI < rightJ) {
        left = i + 1
      } else {
        right = i - 1
      }
    } else {
      if (total % 2 === 1) {
        return maxLeft
      } else {
        return (maxLeft + minRight) / 2
      }
    }
  }
}


// 二分法
// 找到第k个位置的值
// 初始化两个为0， i和j ，代表两个数组当前选择的位置
// 将k分割成两半
// 将 i和 j 分别增加k分割出的一半（奇数情况两个一半长度会差1）
// 比较新的位置的值，值小的数组 位置改成当前判断的位置+1，将k监狱新位置减老位置的值
// 如此循环，直到 i的位置等于i的长度，或者j的位置等于j长度，或者k=1


// 分割数组法
// 获取当前两数组总长度，获取中间位置k
// 选择较小的数组进行二分分割，设置left=0, right = 数组长度m, 通过这两个值获取中间位置, i
// 使用k减去i获得j
// 获取i-1和j-1的最大值 maxI，对比i和j的最小值 minJ
// 如果maxI < minJ 说明找到数组分割点
// 如果 i - 1 < j说明 i  < j -1, 说明i位置值过小 则 left = i 
// 如果 j - 1 < i说明 i  < j -1, 说明i位置值过大 则 right = i - 1

// 如此循环

console.log(findMedianSortedArrays9([1, 2], [3, 4, 5, 6, 7, 8])) // 




// 二分法
// 获取两数组的总长度的一半k,总数是偶数是k和k+1
// 找到第k个大方法是，获取k的一半值half和k-half，分别对比两个数组上half和k-half的值，值小的数组的位置之前的数据可以抛弃，则该数组的起始位置改为该位置+1，k减去该数组抛弃的数组长度，循环比较，直到某数组的位置超出某数组的长度，或者k==1，然后获取两个数组当前位置最小的值就是k



// 分组法
// 两个数组可以分为大于中位数的前一半和小于中位数的后一半
// 获取两个数组长度的一半值k
// 在长度较小的数组 1 上做二分法 l = 0 和 r = m(数组1的长度)
// 获取 数组1的中间值位置 i
// 获取 数组2的位置 j = k - i
// 对比 max(nums1[i-1], nums2[j-2]) maxL 和 min(nums1[i], nums2[j]) minR
// 如果maxL 大于 minR， 说明当前位置不是中位数位置
// 则如果nums1[i] < nums2[j-1] 说明i位置较小，则 l = i + 1
// 如果数组nums1[i-1] > nums2[j] 说明i位置较大，则r = i - 1
//  如果maxL 小于等于 minR，则说明找到中间值位置，数组总长度是奇数的中间值就是 minR，如果是偶数则是 (maxL + minR) / 2,
// 如此循环判断 
