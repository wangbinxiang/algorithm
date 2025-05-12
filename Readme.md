# Algorithm

## 解题方法

### 哈希

#### 两数之和

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

```plaintext
由于仅包含小写字母，我们可以利用ascii码值来获取到每个字母的数字，
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
