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
}

const p = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   throw 123;
  // })
  // reject(2)
  // throw 123
  resolve(1)

})
p.then((result) => {
  console.log('then resolve:', result)
  return new Promise((resolve) => resolve('promise result'))
},
  (result) => {
    console.log('then reject:', result)
    return result + 1
  }).then((result) => {
    console.log('then resolve2:', result)
  },
    (result) => {
      console.log('then reject2:', result)
    })

p.then((result) => {
  console.log('then resolve x:', result)
  return result + 1
},
  (result) => {
    console.log('then reject x:', result)
    return result + 1
  })
// console.log(p)

console.log(typeof process)
console.log(typeof process.nextTick)