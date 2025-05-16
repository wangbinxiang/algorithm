// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。



/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  const queue: number[] = [];
  let nonZeroIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    // 记录第一个非0值位置
    if (nums[i] !== 0) {
      if (nonZeroIndex === -1) {
        nonZeroIndex = i;
      }
    } else if (nonZeroIndex !== -1) {
      // 从nonZeroIndex 开始向右移动值到i位置
      let tmp1 = nums[nonZeroIndex];
      let tmp2;
      for (let j = nonZeroIndex + 1; j <= i; j++) {
        tmp2 = nums[j];
        nums[j] = tmp1;
        tmp1 = tmp2;
        tmp2 = nums[j + 1];
      }
      nums[nonZeroIndex] = 0;
      nonZeroIndex++;
    }
  }
};
let arrDouble = [0, 0, 1, 0, 4, 5, 6, 0, 2, 0, 3, 12]
// moveZeroes(arrDouble);


function moveZeroes1(nums: number[]): void {
  const len = nums.length - 1;
  let i = 0, j = 0;
  while (j !== len) {
    if (nums[j] === 0) {
      j++;
    } else {
      nums[i] = nums[j];
      i++;
      j++;
    }
  }
  while (i !== j) {
    nums[i] = 0;
    i++;
  }
}
// moveZeroes1(arr)




function moveZeroes2(nums: number[]): void {
  const len = nums.length;
  let i = 0, j = 0;
  while (j !== len) {
    if (nums[j] === 0) {
      j++;
    } else {
      // nums[i] = nums[j];
      [nums[i], nums[j]] = [nums[j], nums[i]]
      i++;
      j++;
    }
  }
}


function moveZeroes3(nums: number[]): void {
  let p0 = 0;
  let p1 = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      p0 = i;
      p1 = i + 1;
      break;
    }
  }

  while (p1 < nums.length) {
    while (nums[p1] === 0 && p1 < nums.length) {
      p1++
    }
    if (p1 < nums.length) {
      console.log('p0', p0, nums[p0]);
      console.log('p1', p1, nums[p1]);
      [nums[p0], nums[p1]] = [nums[p1], nums[p0]];
    }
    p0++;
    p1++;
  }
}
const arrDoubleTest = [0, 1, 0, 3, 12]


function moveZeroes4(nums: number[]): void {
  let p0 = 0, p1 = 0;
  const n = nums.length;
  while (p1 !== n) {
    if (nums[p1] !== 0) {
      [nums[p0], nums[p1]] = [nums[p1], nums[p0]]
      p0++
    }
    p1++
  }

}

function moveZeroes5(nums: number[]): void {
  let curr = 0;
  const n = nums.length;
  for (let i = 1; i < n; i++) {
    if (nums[i] !== 0) {
      nums[curr] = nums[i]
      curr++;
    }
  }

  for (let i = curr; i < n; i++) {
    nums[i] = 0
  }

}

/**
 * 双指针，初始位置都在头部，一个指向为0的值，一个指向不为0的值
 * 
 * @param nums 
 */

function moveZeroes6(nums: number[]): void {
  let zero = 0;
  let num = 1;
  // zero 位置值是0时, 让num查找位置值不是0的位置
  const len = nums.length
  while (num < len && zero < len) {
    while (nums[zero] !== 0 && num < len) {
      zero++
      num++
    }
    if (zero === len) {
      break;
    }
    while (num < len && nums[num] == 0) {
      num++
    }
    if (num < len) {
      // console.log(nums, zero, num);
      [nums[zero], nums[num]] = [nums[num], nums[zero]]
      // console.log(nums);
    }
    if (num >= len - 1) {
      break;
    }
  }
}

function moveZeroes7(nums: number[]): void {
  const n = nums.length;
  let i0 = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] !== 0) {
      if (nums[i0] === 0) {
        [nums[i], nums[i0]] = [nums[i0], nums[i]]
      }
      i0++
    }
  }
}
moveZeroes7(arrDouble)
console.log(arrDouble);
moveZeroes7(arrDoubleTest)
console.log(arrDoubleTest);
const arrZero = [0, 1]

moveZeroes7(arrZero)
console.log(arrZero);