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

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());
minStack.pop();
console.log(minStack.top());
console.log(minStack.getMin());