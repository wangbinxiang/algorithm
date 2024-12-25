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
let arr = [0, 0, 1, 0, 4, 5, 6, 0, 2, 0, 3, 12]
// moveZeroes(arr);


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
moveZeroes2(arr)
console.log(arr);
