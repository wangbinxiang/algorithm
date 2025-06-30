const PENDING = 'pending'
const ONFULFILLED = 'onfulfilled'
const REJECTED = 'rejected'

// static

// all
// allSettled
// any
// race
// reject
// resolve
// withResolvers
// try


// prototype

// catch
// finally
// then

class MyPromise {
  #state = PENDING
  #result = undefined
  #handlers = []

  constructor(execute) {
    const resolve = (result) => {
      this.#changeState(ONFULFILLED, result)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }
    try {
      execute(resolve, reject)
    } catch (e) {
      reject(e)
    }

  }

  #changeState(state, result) {
    if (this.#state !== PENDING) {
      return
    }
    this.#state = state
    this.#result = result
    this.#run()
  }

  #isPromise(data) {
    if (data !== null && (typeof data === 'object' || typeof data === 'function') && typeof data.then === 'function') {
      return true
    }
    return false
  }

  #runMicro(fun) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(fun)
    } else if (typeof queueMicrotask === 'function') {
      queueMicrotask(fun)
    } else if (MutationObserver) {
      const observer = new MutationObserver(fun)
      const node = document.createTextNode('1')
      observer.observe(node, {
        characterData: true
      })
      node.data = '2'
    } else {
      setTimeout(fun, 0)
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicro(() => {
      if (typeof callback === 'function') {
        try {
          const data = callback(this.#result)
          if (this.#isPromise(data)) {
            data.then(resolve, reject)
          } else {
            resolve(data)
          }
        } catch (e) {
          reject(e)
        }
      } else {
        if (this.#state === ONFULFILLED) {
          resolve(this.#result)
        } else {
          reject(this.#result)
        }
      }
    })
  }

  #run() {
    if (this.#state === PENDING) {
      return;
    }
    while (this.#handlers.length) {
      const { resolve, reject, onFulfilled, onReject } = this.#handlers.shift()
      if (this.#state === ONFULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onReject, resolve, reject)
      }
    }
  }

  then(onFulfilled, onReject) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        resolve,
        reject,
        onFulfilled,
        onReject
      })
      this.#run()
    })
  }

  static all(proms) {
    let res;
    let rej;
    const p = new MyPromise((resolve, reject) => {
      res = resolve
      rej = reject
    })
    const ans = []
    let count = 0
    let fulfilled = 0
    for (let pro of proms) {
      let key = count
      count++
      Promise.resolve(pro).then(data => {
        fulfilled++
        ans[key] = data
        if (fulfilled === count) {
          console.log('fulfilled === count:')
          res(ans)
        }
        console.log('fulfilled:', fulfilled)
      }, rej)
    }

    if (count === 0) {
      res([])
    }
    console.log('res', res)
    console.log('rej', rej)
    console.log('count:', count)
    return p
  }

  static allSettled(proms) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let completed = 0
      const ans = []
      for (let prom of proms) {
        const key = count;
        count++
        Promise.resolve(prom).then(value => {
          completed++
          ans[key] = { status: 'fulfilled', value }
          if (completed === count) {
            resolve(ans)
          }
        }, reason => {
          completed++
          ans[key] = { status: 'rejected', reason }
          if (completed === count) {
            resolve(ans)
          }
        })
      }
    })
  }

  static any(proms) {
    return new MyPromise((resolve, reject) => {
      const errors = []
      let count = 0;
      let completed = 0;
      for (let prom of proms) {
        let key = count;
        count++;
        MyPromise.resolve(prom).then(data => {
          resolve(data)
        }, reason => {
          errors[key] = reason
          completed++
          if (count === completed) {
            reject(new AggregateError(errors))
          }
        })
      }
    })
  }

  static resolve(value) {
    // 如果是promise 直接返回
    if (value instanceof MyPromise) {
      return value
    }
    if (typeof value === 'object' && typeof value.then === 'function') {
      return new MyPromise((resolve, reject) => {
        value.then(resolve, reject)
      })
    }
    // 如果是thenable 则调用then方法
    // 以以value为值返回一个promise
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }

  static withResolve() {
    let res
    let rej
    const promise = new MyPromise((resolve, reject) => {
      res = resolve
      rej = reject
    })
    return { promise, resolve: res, reject: rej }
  }

  static race(proms) {
    return new MyPromise((resolve, reject) => {
      for (let prom of proms) {
        MyPromise.resolve(prom).then(resolve, reject)
      }
    })
  }
}

const pt = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('1000')
  }, 1000)
})

// const p = MyPromise.race([1, pt, 3, Promise.reject(new Error("一个错误"))]).then(data => console.log('data:', data), reason => console.log('reason:', reason))
// console.log(p)

try {

  setTimeout(() => {
    try {
      throw 123
    } catch (e) {
      console.log('inner', e)
    }
  }, 1)
} catch (e) {
  console.log(e)
}



// const p = new MyPromise((resolve, reject) => {
//   // setTimeout(() => {
//   //   throw 123;
//   // })
//   // reject(2)
//   // throw 123
//   resolve(1)

// })
// p.then((result) => {
//   console.log('then resolve:', result)
//   return new Promise((resolve) => resolve('promise result'))
// },
//   (result) => {
//     console.log('then reject:', result)
//     return result + 1
//   }).then((result) => {
//     console.log('then resolve2:', result)
//   },
//     (result) => {
//       console.log('then reject2:', result)
//     })

// p.then((result) => {
//   console.log('then resolve x:', result)
//   return result + 1
// },
//   (result) => {
//     console.log('then reject x:', result)
//     return result + 1
//   })
// // console.log(p)

// console.log(typeof process)
// console.log(typeof process.nextTick)