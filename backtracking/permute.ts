// 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。



// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// 示例 2：

// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]
// 示例 3：

// 输入：nums = [1]
// 输出：[[1]]


// 提示：

// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// nums 中的所有整数 互不相同

function permute(nums: number[]): number[][] {
  const ans: number[][] = [];

  const n = nums.length;
  // const output: number[] = [...nums];


  const dfs = (first: number) => {
    if (first === n) {
      ans.push([...nums])
    }

    for (let i = first; i < n; i++) {
      [nums[i], nums[first]] = [nums[first], nums[i]];
      dfs(first + 1);
      [nums[i], nums[first]] = [nums[first], nums[i]];
    }
  }

  dfs(0)

  return ans;
};



function permute1(nums: number[]): number[][] {
  const ans: number[][] = [];
  const set: Set<number> = new Set()
  const n = nums.length
  const help = () => {
    if (set.size === n) {
      ans.push([...set.values()])
      return
    }
    for (let num of nums) {
      if (!set.has(num)) {
        set.add(num)
        help()
        set.delete(num)
      }
    }
  }
  help()
  return ans;
}


function permute2(nums: number[]): number[][] {
  const ans: number[][] = []
  const n = nums.length

  const help = (first: number) => {
    ans.push([...nums])
    for (let i = first + 1; i < n; i++) {
      console.log(i, first)
      // // [nums[i], nums[first]] = [nums[first], nums[i]]
      // // help(i)
      // [nums[i], nums[first]] = [nums[first], nums[i]]


      [nums[i], nums[first]] = [nums[first], nums[i]]
    }
  }

  help(0)

  return ans;
}

function permute3(nums) {
  const ans = []
  const n = nums.length
  let tmp
  const help = first => {
    ans.push([...nums])
    for (let i = first + 1; i < n; i++) {
      console.log(i, first)
      tmp = nums[i]
      nums[i] = nums[first]
      nums[first] = tmp
      // [nums[i], nums[first]] = [nums[first], nums[i]]
      // console.log(nums)
      help(i)
      tmp = nums[i]
      nums[i] = nums[first]
      nums[first] = tmp
    }
  }

  help(0)
  return ans
}



function permute4(nums: number[]): number[][] {
  const ans: number[][] = []
  const n = nums.length

  const h = (first: number) => {
    if (first === n) {
      ans.push([...nums])
    }

    for (let i = first; i < n; i++) {
      [nums[i], nums[first]] = [nums[first], nums[i]];
      h(first + 1);
      [nums[i], nums[first]] = [nums[first], nums[i]];
    }
  }

  h(0)

  return ans
}

function permute5(nums: number[]): number[][] {
  const ans: number[][] = []
  const n = nums.length;
  const res: number[] = []
  const help = (numberArr: number[]) => {
    if (res.length === n) {
      ans.push([...res])
    }
    for (let i = 0; i < numberArr.length; i++) {
      res.push(numberArr[i])
      help(numberArr.toSpliced(i, 1))
      res.pop()
    }
  }
  help(nums)

  return ans;
}


function permute6(nums: number[]): number[][] {
  const ans: number[][] = [];
  const n = nums.length;
  const tmp: number[] = []
  const dfs = (arr: number[]) => {
    if (tmp.length === n) {
      ans.push([...tmp]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      tmp.push(arr[i]);
      const newArr = [...arr]
      newArr.splice(i, 1)
      dfs(newArr);
      tmp.pop();
    }
  }
  dfs([...nums]);

  return ans;
};


function permute7(nums: number[]): number[][] {
  const ans: number[][] = [];
  const n = nums.length;
  const used = Array(n).fill(false);

  const arr: number[] = [];

  const dfs = () => {
    if (arr.length === n) {
      ans.push([...arr]);
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) {
        continue;
      }
      arr.push(nums[i]);
      used[i] = true;
      dfs();
      used[i] = false;
      arr.pop();
    }
  }
  dfs();
  return ans;
}

function permute8(nums: number[]): number[][] {
  const ans: number[][] = [];
  const n = nums.length;
  const used: Set<number> = new Set();

  const tmp: number[] = [];
  const dfs = () => {
    if (tmp.length === n) {
      ans.push([...tmp]);
      return;
    }
    for (const num of nums) {
      if (!used.has(num)) {
        used.add(num);
        tmp.push(num);
        dfs();
        tmp.pop();
        used.delete(num);
      }
    }
  }

  dfs();




  return ans;
};


function permute9(nums: number[]): number[][] {
  const ans: number[][] = [];
  const set = new Set<number>();
  const tmp: number[] = [];
  const n = nums.length;

  const dfs = () => {
    if (n === tmp.length) {
      ans.push([...tmp]);
    }

    for (const num of nums) {
      if (set.has(num)) {
        continue;
      }
      tmp.push(num);
      set.add(num);
      dfs();
      set.delete(num);
      tmp.pop();
    }
  }


  dfs();


  return ans;
};

// const arr111 = [0, 1, 2];
// [arr111[0], arr111[1]] = [arr111[1], arr111[0]]

console.log(permute8([1, 2, 3])); 