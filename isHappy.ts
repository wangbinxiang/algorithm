// 编写一个算法来判断一个数 n 是不是快乐数。

// 「快乐数」 定义为：

// 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
// 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
// 如果这个过程 结果为 1，那么这个数就是快乐数。
// 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。



// 示例 1：

// 输入：n = 19
// 输出：true
// 解释：
// 12 + 92 = 82
// 82 + 22 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1

function isHappy(n: number): boolean {
  let current = n;
  const set = new Set()
  while (true) {
    console.log('current:', current);
    const numStr = current.toString();
    const numList = numStr.split('');
    const n = numList.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
      const val = +numList[i]
      total += val * val
    }
    if (total === 1) {
      return true;
    }
    if (set.has(total)) {
      return false;
    }
    set.add(total)
    current = total;
  }
};

console.log(isHappy(2))