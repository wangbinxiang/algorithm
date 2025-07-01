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
  let left = 0;
  let right = m - 1;
  while (true) {
    const i = Math.floor((left + right) / 2);
    const j = half - i

    const num1L = i >= 0 ? nums1[i] : Number.NEGATIVE_INFINITY;
    const num2L = j >= 0 ? nums2[j] : Number.NEGATIVE_INFINITY;

    const maxNumL = Math.max(num1L, num2L);

    const num1R = i < m ? nums1[i + 1] : Number.POSITIVE_INFINITY;
    const num2R = j < n ? nums2[j + 1] : Number.POSITIVE_INFINITY;

    const minNumR = Math.min(num1R, num2R);

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
  let ans = 0



  return ans
}


console.log(findMedianSortedArrays1([1, 3], [2])) // 2
// console.log(findMedianSortedArrays([1, 2], [3, 4])) // 2.5