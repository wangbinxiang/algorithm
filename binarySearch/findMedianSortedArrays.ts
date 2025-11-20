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
      // console.log('i:', i)
      // console.log('j:', j)
      // console.log('k:', k)
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

// console.log(findMedianSortedArrays10([1], [1, 2])) // 


// 二分法
// 注意k的位置，不是按照数组下标，是第几个数
function findMedianSortedArrays10(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length
  const total = m + n
  const half = Math.floor((total + 1) / 2)
  const findK = (k: number) => {
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
      // half是第几个不是加几，i就是第一个，所以i+half后需要减1
      const newI = Math.min(i + half, m) - 1
      const newJ = Math.min(j + k - half, n) - 1

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

  if (total % 2 === 1) {
    return findK(half);
  } else {
    return (findK(half) + findK(half + 1)) / 2
  }
}

// 分组法
function findMedianSortedArraysGroup(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length
  if (nums1.length > nums2.length) {
    return findMedianSortedArraysGroup(nums2, nums1)
  }
  const total = m + n
  // 找到中间值k（注意是个数，不是下标）
  const k = Math.round(total / 2)
  // 用nums1做二分查找, 左0，右边是nums1的长度
  let l = 0;
  let r = m
  console.log('k: ', k)
  while (true) {
    const half = Math.floor((l + r) / 2)
    const i = half // 找到nums1当前的中间位
    const j = k - i // 用k - i找到nums2的位置
    console.log('i:', i)
    console.log('j:', j)

    const leftI = i > 0 ? nums1[i - 1] : -Infinity // 获取nums1左分组的最大值
    const rightI = i < m ? nums1[i] : +Infinity // 获取nums1右分组的最小值
    console.log('leftI:', leftI)
    console.log('rightI:', rightI)

    const leftJ = j > 0 ? nums2[j - 1] : -Infinity // 获取nums2左分组的最大值
    const rightJ = j < n ? nums2[j] : +Infinity // 获取nums2右分组的最小值
    console.log('leftJ:', leftJ)
    console.log('rightJ:', rightJ)

    const maxLeft = Math.max(leftI, leftJ) // 获取整体左分组的最大值
    const minRight = Math.min(rightI, rightJ) // 获取整体右分组的最小值
    console.log('maxLeft:', maxLeft)
    console.log('minRight:', minRight)
    console.log('maxLeft <= minRight:', maxLeft <= minRight)
    if (maxLeft <= minRight) { // 当整体左分组的最大值小于等于整体右分组的最小值时，说明分组正确
      if (total % 2 === 1) {
        console.log('return maxLeft')
        return maxLeft
      } else {
        console.log('(maxLeft + minRight) / 2')
        return (maxLeft + minRight) / 2
      }
    } else {
      if (leftI > rightJ) {
        // 如果nums1的左分组最大值>nums2右分组的最小值
        // 说明当前的i位置太大，需要减小i的位置，将r设置为i - 1(二分搜索方法)
        r = i - 1
      } else {
        // nums2的左分组最大值大于nums1右分组的最小值
        // 说明当前i的位置太小，需要增大i的位置，将l设置为i + 1(二分搜索法)
        l = i + 1
      }
    }
    return
  }
}

// 二分法
// 获取两数组的总长度的一半k,总数是偶数是k和k+1
// 找到第k个大方法是，获取k的一半值half和k-half，分别对比两个数组上half和k-half的值，值小的数组的位置之前的数据可以抛弃，则该数组的起始位置改为该位置+1，k减去该数组抛弃的数组长度，循环比较，直到某数组的位置超出某数组的长度，或者k==1，然后获取两个数组当前位置最小的值就是k


function findMedianSortedArrays11(nums1: number[], nums2: number[]): number {
  let ans = 0
  const m = nums1.length
  const n = nums2.length
  const total = m + n


  const findK = (k: number) => {
    console.log('k:', k)
    let i = 0
    let j = 0
    while (true) {
      console.log('i:', i)
      console.log('j:', j)
      if (i === m) {
        console.log('i === m', nums2[j + k - 1], j, k)
        return nums2[j + k - 1]
      }

      if (j === n) {
        console.log('j === n', nums1[i + k - 1], i, k)
        return nums1[i + k - 1]
      }

      if (k === 1) {
        console.log('k === 1', i, j, Math.min(nums1[i], nums2[j]))
        return Math.min(nums1[i], nums2[j])
      }


      const half = Math.floor(k / 2)
      console.log('k', k)
      console.log('half', half)
      const newI = (i + half < m ? i + half : m) - 1
      const newJ = (j + k - half < n ? j + k - half : n) - 1
      console.log('newI:', newI)
      console.log('newJ:', newJ)
      if (nums1[newI] < nums2[newJ]) {
        k -= newI - i + 1
        i = newI + 1
      } else {
        k -= newJ - j + 1
        j = newJ + 1
      }
      // if (k <= 0) {
      //   return
      // }
    }
  }

  const half = Math.round(total / 2)
  if (total % 2 === 0) {
    return (findK(half) + findK(half + 1)) / 2
  } else {
    return findK(half)
  }





}

// 问题可以改变为找到第K个值，如果数组总数是偶数，则需要找到一半位置和一半加1的位置，
// 如果是奇数则需要找到一半的位置
// 定义nums1的初始位置i = 0，nums2的初始位置j = 0
// findK 函数 首先将K除以2的到k的一半half
// 循环判断
// 当i === nums1.length时，返回 nums2[j + k - 1]
// 当j === nums2.length时，返回 nums1[i + k - 1]
// 当k === 1 时，返回 Math.min(nums1[i], nums2[j])
// 在nums1上获取i+ half - 1位置的值
// 在nums2上获取j + k - half - 1位置的值
// 判断数字小的值
// k 减去 (小的值的位置减去开始的位置 + 1)
// 小的值的初始位置等于 小的值的位置 + 1

function findMedianSortedArrays12(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length
  const total = m + n
  const half = Math.round(total / 2)

  const findK = (k: number): number => {
    let i = 0
    let j = 0
    let copyK = k
    while (true) {
      if (i === m) {
        return nums2[j + copyK - 1]
      }

      if (j === n) {
        return nums1[i + copyK - 1]
      }

      if (copyK === 1) {
        return Math.min(nums1[i], nums2[j])
      }

      const half = Math.floor(copyK / 2)
      // i + half是加第几个，所以需要减1
      const newI = Math.min(i + half, m) - 1
      const newJ = Math.min(j + (copyK - half), n) - 1
      // console.log(i, j, k, half, newI, newJ)
      if (nums1[newI] < nums2[newJ]) {
        copyK -= newI - i + 1
        i = newI + 1
      } else {
        copyK -= newJ - j + 1
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

// 将两个数组分成前半部分和后半部分
// 在较小的数据上进行二分搜索
// 找到nums1的中间位置i
// 使用两个数组总数的一半位置减去i等于j
// 获取i左边位置的值和i的值
// 获取j左边位置的值和j的值
// 对比左边值的最大值和右边值的最小值
// 如果左边值的最大值小于等于右边值的最小值
// 说明找到中间位置
// 如果两个数组总数是偶数，中间值是 左边最大值加上右边最小值除以2
// 如果两个数组总数是奇数，中间值是 左边最大值
function findMedianSortedArraysGroup1(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  let l = 0
  let r = nums1.length
  const m = nums1.length
  const n = nums2.length
  const half = Math.round((m + n) / 2)
  while (true) {
    let i = Math.floor((l + r) / 2)
    let j = half - i

    const iLeft = i > 0 ? nums1[i - 1] : -Infinity
    const iRight = i < m ? nums1[i] : +Infinity

    const jLeft = j > 0 ? nums2[j - 1] : -Infinity
    const jRight = j < n ? nums2[j] : +Infinity
    const maxLeft = Math.max(iLeft, jLeft)
    const minRight = Math.min(iRight, jRight)

    if (maxLeft <= minRight) {
      if ((m + n) % 2 === 0) {
        return (maxLeft + minRight) / 2
      } else {
        return maxLeft
      }
    } else {
      if (iLeft > jRight) {
        r = i - 1
      } else {
        l = i + 1
      }
    }
  }
}
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



// 分组法

// findK 法
function findMedianSortedArraysFink(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length
  const total = m + n
  const mid = Math.round(total / 2)

  const findK = (k: number): number => {
    // 获取k的一半
    let l1 = 0
    let l2 = 0
    while (true) {
      if (l1 === m) {
        // 等num2位置 + k
        return nums2[l2 + k - 1]
      }


      if (l2 === n) {
        return nums1[l1 + k - 1]
      }


      if (k === 1) {
        return Math.min(nums1[l1], nums2[l2])
      }



      const mid = Math.round(k / 2)

      const newL1 = Math.min(l1 + mid, m) - 1
      const newL2 = Math.min(l2 + (k - mid), n) - 1

      const val1 = nums1[newL1]
      const val2 = nums2[newL2]

      if (val1 < val2) {
        // 舍去 l1 新增的数量
        k -= newL1 - l1 + 1
        l1 = newL1 + 1
      } else {
        // 舍去 l2 新增的数量
        k -= newL2 - l2 + 1
        l2 = newL2 + 1
      }
    }
  }

  if (total % 2 === 0) {
    // find mid + find mid + 1
    return (findK(mid) + findK(mid + 1)) / 2
  } else {
    // find mid
    return findK(mid)
  }
};

// 分组法
// 两个组分成两半，
function findMedianSortedArraysGroup2(nums1: number[], nums2: number[]): number {

  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }

  const m = nums1.length
  const n = nums2.length
  const half = Math.round((m + n) / 2)

  let l = 0
  let r = m
  while (true) {
    const mid = Math.floor((l + r) / 2)
    const mid2 = half - mid
    // console.log('l:', l, 'r:', r)
    const l1 = mid > 0 ? nums1[mid - 1] : -Infinity
    const r1 = mid < m ? nums1[mid] : +Infinity

    // console.log('mid2:', mid2)
    const l2 = mid2 > 0 ? nums2[mid2 - 1] : -Infinity
    const r2 = mid2 < n ? nums2[mid2] : +Infinity

    const maxL = Math.max(l1, l2)
    const minR = Math.min(r1, r2)
    // console.log('maxL:', maxL)
    // console.log('minR:', minR)
    if (maxL <= minR) {
      if ((m + n) % 2 === 0) {
        return (maxL + minR) / 2
      } else {
        return maxL
      }
    } else if (l1 > r2) {
      // l1 太大 
      r = mid - 1
    } else {
      l = mid + 1
    }
  }
}


function findMedianSortedArraysGroup3(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const total = nums1.length + nums2.length;

  const k = Math.floor(total / 2);

  let l = 0;
  let r = nums1.length;

  while (true) {
    console.log('l:', l);
    console.log('r:', r);
    const m1 = Math.floor((r - l) >> 1) + l;
    console.log('m1:', m1);

    const l1 = m1 > 0 ? nums1[m1 - 1] : -Infinity;
    const r1 = m1 < nums1.length ? nums1[m1] : +Infinity;

    console.log('l1:', l1);
    console.log('r1:', r1);

    const m2 = k - m1;
    const l2 = m2 > 0 ? nums2[m2 - 1] : -Infinity;
    const r2 = m2 < nums2.length ? nums2[m2] : +Infinity;

    console.log('m2:', m2);
    console.log('l2:', l2);
    console.log('r2:', r2);


    const maxL = Math.max(l1, l2);
    const minR = Math.min(r1, r2);
    console.log('maxL:', maxL);
    console.log('minR:', minR);

    if (maxL <= minR) {
      if (total % 2 === 0) {
        return (maxL + minR) / 2
      } else {
        return minR;
      }
    } else if (r1 < l2) {
      l = m1 + 1;
    } else {
      // console.log('r = m1 - 1');
      r = m1 - 1;
    }
  }
}


function findMedianSortedArraysFink2(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;

  // 在两个数组中
  const findK = (k: number) => {

    let i = 0;
    let j = 0;

    while (true) {
      console.log("k:", k)
      console.log("i:", i)
      console.log("j:", j)
      if (i === m) {
        return nums2[j + k - 1];
      }
      if (j === n) {
        return nums1[i + k - 1];
      }

      if (k === 1) {
        return Math.min(nums1[i], nums2[j]);
      }

      const half = Math.round(k / 2);
      console.log('half:', half);

      let i1 = (i + half < m ? i + half : m) - 1;
      let j1 = (j + (k - half) < n ? j + (k - half) : n) - 1;
      console.log('i1:', i1);
      console.log('j1:', j1);

      const iVal = nums1[i1];
      const jVal = nums2[j1];

      if (iVal > jVal) {
        k -= j1 - j + 1;
        j = j1 + 1;
      } else {
        k -= i1 - i + 1;
        i = i1 + 1;
      }
    }
  }
  const half = Math.round((m + n) / 2);
  if ((m + n) % 2 === 0) {
    return (findK(half) + findK(half + 1)) / 2
  } else {
    return findK(half);
  }
}

function findMedianSortedArraysFindK(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;

  const findK = (k: number): number => {

    let l1 = 0;
    let l2 = 0;

    while (true) {
      if (l1 === m) {
        return nums2[l2 + k - 1];
      }

      if (l2 === n) {
        return nums1[l1 + k - 1];
      }

      if (k === 1) {
        return Math.min(nums1[l1], nums2[l2]);
      }

      const half = Math.floor(k / 2);
      const l1n = (l1 + half < m ? l1 + half : m) - 1;
      const l2n = (l2 + k - half < n ? l2 + k - half : n) - 1;

      const val1 = nums1[l1n];
      const val2 = nums2[l2n];

      if (val1 < val2) {
        k -= l1n - l1 + 1;
        l1 = l1n + 1;
      } else {
        k -= l2n - l2 + 1;
        l2 = l2n + 1;
      }
    }
  }
  const k = Math.round(total / 2);
  if (total % 2 === 0) {
    return (findK(k) + findK(k + 1)) / 2
  } else {
    return findK(k);
  }
};

function findMedianSortedArraysGroup4(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const m = nums1.length;
  const n = nums2.length;

  let l = 0;
  let r = m;
  const half = Math.round((m + n) / 2);
  console.log(half)

  while (true) {
    const mid = Math.floor((r - l) / 2) + l;
    console.log('mid: ', mid);

    const l1 = mid > 0 ? nums1[mid - 1] : -Infinity;
    const r1 = mid < m ? nums1[mid] : +Infinity;

    console.log('l1:', l1);
    console.log('r1:', r1);


    const mid2 = half - mid;
    const l2 = mid2 > 0 ? nums2[mid2 - 1] : -Infinity;
    const r2 = mid2 < n ? nums2[mid2] : +Infinity;

    console.log('l2:', l2);
    console.log('r2:', r2);


    const lMaxVal = Math.max(l1, l2);
    const rMinVal = Math.min(r1, r2);
    if (lMaxVal <= rMinVal) {
      // 找到中间位置
      if ((m + n) % 2 === 0) {
        return (lMaxVal + rMinVal) / 2;
      } else {
        return lMaxVal;
      }
    } else if (l1 > r2) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
};



function findMedianSortedArraysGroup5(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;
  const half = Math.round(total / 2);

  let l = 0;
  let r = m;

  while (true) {
    const mid = Math.floor((r - l) / 2) + l;

    const l1 = mid > 0 ? nums1[mid - 1] : -Infinity;
    const r1 = mid < m ? nums1[mid] : +Infinity;

    const mid2 = half - mid;
    const l2 = mid2 > 0 ? nums2[mid2 - 1] : -Infinity;
    const r2 = mid2 < n ? nums2[mid2] : +Infinity;

    const maxL = Math.max(l1, l2);
    const minR = Math.min(r1, r2);

    if (maxL <= minR) {
      if (total % 2 === 0) {
        return (maxL + minR) / 2;
      } else {
        return maxL;
      }
    } else if (l1 > r2) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
};



function findMedianSortedArraysFindK3(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;


  const findK = (k: number): number => {


    let l1 = 0;
    let l2 = 0;

    while (true) {

      if (l1 === m) {
        return nums2[l2 + k - 1];
      }

      if (l2 === n) {
        return nums1[l1 + k - 1];
      }

      if (k === 1) {
        return Math.min(nums1[l1], nums2[l2]);
      }


      const half = Math.round(k / 2);

      const l1New = (l1 + half < m ? l1 + half : m) - 1;
      const l2New = (l2 + k - half < n ? l2 + k - half : n) - 1;

      const l1Val = nums1[l1New];
      const l2Val = nums2[l2New];

      if (l1Val < l2Val) {
        k -= l1New - l1 + 1;
        l1 = l1New + 1;
      } else {
        k -= l2New - l2 + 1;
        l2 = l2New + 1;
      }
    }
  }
  const half = Math.round(total / 2);
  if (total % 2 === 0) {
    const left = findK(half);
    const right = findK(half + 1);
    return (left + right) / 2;
  } else {
    return findK(half);
  }
};

console.log(findMedianSortedArraysFindK3([0, 1, 2, 3], [4, 5, 6, 7]))
// console.log(findMedianSortedArraysGroup4([0], [6, 7, 8, 9]))

// console.log(findMedianSortedArraysFink2([4, 5, 6, 8, 9], []))


// console.log(findMedianSortedArraysFink2([-10, -9, -8], [1, 2]))


// console.log(findMedianSortedArraysFink2([0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 1]))