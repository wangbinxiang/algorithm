# Algorithm

## 解题方法

### 哈希

#### 两数之和

解法

```plaintext
循环数组，使用map存储 value -> key
数组每一项通过target - 当前value 获取目标value
然后在map中获取目标value，如果有就返回这两个key，
如果没有就将当前项存储到hash里
```

```typescript
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const val = nums[0];
    const findVal = target - val;
    if (map.has(findVal)) {
      const findKey = map.has(findVal);
      return [findKey, i];
    } else {
      map.set(val, i)
    }
  }
}


```

#### 字母异位词分组

```plaintext
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

示例 1:

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
示例 2:

输入: strs = [""]
输出: [[""]]
示例 3:

输入: strs = ["a"]
输出: [["a"]]

仅包含小写字母
```

解法

```plaintext
由于仅包含小写字母，我们可以利用ascii码值来获取到每个字母的数字，
创建一个数组
0代表小写a的数量，之后依照字母顺序类推
循环遍历每个字符串，给每个字符串创建一个数组用于存储字符串内字母的数量
遍历完之后数组就是字符串的key,将数组做join(',')操作，就可以获取每个字母以 `,` 分割的字符串
```

例子

```typescript
function groupAnagrams(strs: string[]): string[][] {
  const ans: Record<string, string[]> = {};
  const aCode = 'a'.charCodeAt(0);

  for (let str of strs) {
    const len = str.length;
    const arr = Array(26).fill(0)
    for (let i = 0; i < len; i++) {
      const code = str.charCodeAt(i) - aCode
      arr[code]++
    }
    const key = arr.join(',')
    if (ans[key]) {
      ans[key].push(str)
    } else {
      ans[key] = [str]
    }
  }
  return Object.values(ans);
}

```

#### 最长连续序列

```plaintext
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
示例 3：

输入：nums = [1,0,1,2]
输出：3
 

提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109

```

解法

```plaintext
创建一个set数据，并将数据写入set
遍历set数据
当前set数据val，如果有比val小1的数就继续下个循环
如果没有比val小的数，就开始计算比val连续大大数有多少个，就可以知道从val开始的连续数字
```

例子

```typescript
function longestConsecutive(nums: number[]): number {
  const set = new Set<number>();
  let ans = 0;
  for (let num of nums) {
    set.add(num)
  }

  for (let num of set) {
    if (!set.has(num - 1)) {
      let start = num;
      let current = num + 1;
      while (set.has(current)) {
        current++
      }
      const len = current - start;
      if (ans < len) {
        ans = len;
      }
    }
  }
  return ans;
}
```

### 双指针

#### 移动零

题目

```plaintext
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

 

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
示例 2:

输入: nums = [0]
输出: [0]
 

提示:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
 

进阶：你能尽量减少完成的操作次数吗？

```

解法

```plaintext
双指针，初始位置都在头部，
一个是非0指针
循环数组
循环当前位置如果是非0
  判断i0值是否为0
  如果为0 则交换 当前位置 和 i0位置
  无聊是否交换，都要做i0++
```

例子

```typescript
function moveZeroes(nums: number[]): void {
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

```

#### 盛最多水的容器

```plaintext

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

输入：height = [1,1]
输出：1

```

解法

```plaintext

左右两个指针
区域宽度是右指针位置 减去 左指针位置
区域高度是左右指针位置高度的最小值
获取到区域面积后 对比 已有区域的最大值来进行是否替换

对比两个指针的值，小的指针进行移动，
如果左边小则向右移动
如果右边小则向左移动
直到左右指针重合
返回最大区域值

```

例子

```typescript
  function maxArea2(height: number[]): number {
  let ans = 0;
  let l = 0;
  let r = height.length - 1;

  while (l < r) {
    const width = r - l;
    const heigh = Math.min(height[r], height[l]);
    const area = width * heigh;
    if (area > ans) {
      ans = area
    }
    if (height[r] > height[l]) {
      let prev = height[l];

      do {
        l++
      } while (height[l] <= prev && l < r)
    } else {
      let prev = height[r];
      do {
        r--
      } while (height[r] <= prev && l < r)
    }
  }
  return ans;
}
```

#### 三数之和

```plaintext
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

```

```plaintext
首先将数组进行排序，
然后从第一个元素开始循环
如果当前元素等于上一个元素，则直接进行下一个循环
0 - 当前元素 获取 target

使用数组元素之后的数据就退化成 相加为target的两数之和
定义l和r指针，从两头开始合并 找到等于-target的数据
```

#### 接雨水

```plaintext
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
```

```plaintext
定义左右双指针

获取小的指针
然后从小指针向内开始便利，
如果下一个值比小指针的值小，则该位置可接雨水为小指针和该位置的差值
如果下一个位置等于或大于小指针，则将小指针位置置于该位置，并重新开始比较两边的指针
```

### 链表

#### 相交链表

```plaintext
给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
```

```plaintext
创建两个变量a,b各赋值为headA和headB
开始while循环判断两个变量a !== b时进入循环体
循环体内判断
  a!==nul则a = a.next 否则 a = headB
  b!==null则b = b.next 否则 b = headA
循环结束时
a和b就同时为相交点或者为null 
```

#### 反转链表

```plaintext
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
```

``` plaintext
创建一个current变量赋值为head
创建一个prev变量赋值为null
while循环判断current不为null时进入循环体
创建tmp变量赋值为current的next
current的next赋值为prev
prev的值赋值为current
current的值赋值为tmp
循环结束时，prev就是反转后的链表头部
```
