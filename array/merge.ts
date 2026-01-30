// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。



// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。


// 提示：

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= start i <= end i <= 104


// 先排序，然后对比后一个数组的第一个值跟前一个数组第二个值的对比
function merge(intervals: number[][]): number[][] {
  const ans: number[][] = []

  intervals.sort((a, b) => a[0] - b[0])

  const n = intervals.length;

  let l = 0
  let r = 0
  let maxR = intervals[0][1];
  while (r < n) {
    if (r + 1 < n && maxR >= intervals[r + 1][0]) {
      if (intervals[r + 1][1] > maxR) {
        maxR = intervals[r + 1][1]
      }
      r++
    } else {
      ans.push([intervals[l][0], maxR])
      r++
      l = r
      if (r < n) {
        maxR = intervals[l][1];
      }

    }
  }



  return ans;
};

function merge1(intervals: number[][]): number[][] {
  const ans: number[][] = []

  intervals.sort((a, b) => a[0] - b[0])

  const n = intervals.length;
  ans.push(intervals[0])
  let m = 1;
  for (let i = 1; i < n; i++) {
    const num = intervals[i];
    const tmp = ans[m - 1][1];
    if (tmp >= num[0]) {
      const o = num[1]
      if (o > tmp) {
        ans[m - 1][1] = o
      }
    } else {
      ans.push(num)
      m++
    }
  }

  return ans;
}


function merge2(intervals: number[][]): number[][] {
  const ans: number[][] = [];

  intervals.sort((a, b) => a[0] - b[0]);


  const n = intervals.length;
  let i = 0;
  while (i < n) {
    const current = intervals[i];
    let next = i + 1;
    let end = current[1];
    while (next < n && end >= intervals[next][0]) {
      end = Math.max(end, intervals[next][1])
      next++;
    }
    ans.push([current[0], end]);
    i = next;
  }
  return ans;
};


console.log(merge1([[1, 3], [2, 6], [8, 10], [15, 18]]))

console.log(merge1([[1, 4], [4, 5]]))

console.log(merge1([[1, 4], [2, 3]]))

console.log(merge1([[1, 4], [0, 2], [3, 5]]))