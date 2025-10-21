// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。


// 示例 1:

// 输入：
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]

// 输出：
// [null,null,null,null,-3,null,0,-2]

// 解释：
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.getMin();   --> 返回 -2.


// 提示：

// -231 <= val <= 231 - 1
// pop、top 和 getMin 操作总是在 非空栈 上调用
// push, pop, top, and getMin最多被调用 3 * 104 次
class MinStack {
  min: number;
  stack: number[];
  constructor() {
    this.min = -Infinity;
    this.stack = []
  }

  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val;
    } else {
      const diff = val - this.min;
      this.stack.push(diff)
      if (diff < 0) {
        this.min = val
      }
    }
    console.log('this.stack:', this.stack);
    console.log('this.min:', this.min)

  }

  pop(): void {
    // pop只用弹出，不用返回值，所以不需要存储每个值
    const val = this.stack.pop()!
    if (val < 0) {
      this.min = this.min - val;
    }
  }

  top(): number {
    const val = this.stack[this.stack.length - 1];
    console.log('top:', top);
    console.log('this.min:', this.min);
    if (val >= 0) {
      return val + this.min;
    } else {
      return this.min;
    }
  }

  getMin(): number {
    return this.min;
  }
}



class MinStack2 {

  private stack: number[] = [];
  private min: number = +Infinity;


  constructor() {
  }

  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push(val);
      this.min = val;
    } else {
      const diff = val - this.min;
      this.stack.push(diff);

      if (val < this.min) {
        this.min = val;
      }
      // console.log('val:', val);
      // console.log('diff:', diff);
      // console.log('this.min:', this.min);
    }
    console.log('this.stack:', this.stack);
    console.log('this.min:', this.min)
  }

  pop(): void {
    // 删除堆栈顶部元素
    const top = this.stack.pop();
    // let ans = top + this.min;
    if (top < 0) {
      this.min -= top;
    }
    // if (top < 0) {
    //   ans = this.min;
    //   this.min = this.min - top;
    // } else {
    //   ans = top;
    // }
  }

  top(): number {
    const top = this.stack[this.stack.length - 1];
    console.log('top:', top);
    console.log('this.min:', this.min);
    // if (this.stack.length === 1) {
    //   return top;
    // }

    if (top < 0) {
      return this.min;
    }
    return top + this.min;
  }

  getMin(): number {
    // 获取最小元素
    return this.min;
  }
}



class MinStack3 {
  stack: number[] = [];
  min: number = +Infinity;
  constructor() {

  }

  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val
    } else {
      const diff = val - this.min;
      this.stack.push(diff);
      if (val < this.min) {
        this.min = val;
      }
    }
  }

  pop(): void {
    const top = this.stack.pop();
    if (top < 0) {
      this.min -= top;
    }
  }

  top(): number {
    const top = this.stack[this.stack.length - 1];
    if (top < 0) {
      return this.min;
    }
    return top + this.min;
  }

  getMin(): number {
    return this.min;
  }
}
/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
// const minStack = new MinStack2();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// console.log(minStack.getMin()); // -3
// minStack.pop();
// console.log(minStack.top()); // 0
// console.log(minStack.getMin()); // -2


// const minStack2 = new MinStack2();
// minStack2.push(-2);
// minStack2.push(0);
// minStack2.push(-1);
// console.log(minStack2.getMin()); // -2
// console.log(minStack2.top()); // -1
// minStack2.pop();
// console.log(minStack2.getMin()); // -2



// const minStack3 = new MinStack2();
// minStack3.push(-1);
// console.log(minStack3.top()); // -1
// console.log(minStack3.getMin()); // -1


const minStack4 = new MinStack2();
minStack4.push(2147483646);
minStack4.push(2147483646);
minStack4.push(2147483647);
console.log(minStack4.top()); // -1
minStack4.pop();
console.log(minStack4.getMin()); // -1
minStack4.pop();
console.log(minStack4.getMin()); // -1
minStack4.pop();
minStack4.push(2147483647);
console.log(minStack4.top()); // -1
console.log(minStack4.getMin()); // -1
minStack4.push(-2147483648);
console.log('minStack4.top():', minStack4.top()); // -1
console.log(minStack4.getMin()); // -1
minStack4.pop();
console.log(minStack4.getMin()); // -1


// const minStack5 = new MinStack3();
// minStack5.push(1);
// minStack5.push(2);
// console.log(minStack5.top()); // 2
// console.log(minStack5.getMin()); // 1
// minStack5.pop();
// console.log(minStack5.getMin()); // 1
// console.log(minStack5.top()); // 1