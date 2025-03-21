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

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))
console.log(topKFrequent([1], 1))