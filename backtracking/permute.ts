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
// const arr111 = [0, 1, 2];
// [arr111[0], arr111[1]] = [arr111[1], arr111[0]]

console.log(permute5([1, 2, 3])); 