const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})


const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  })
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})

const all = Promise.race([p, Promise.reject(2), p3]).then((data) => {
  console.log('data:', data)
}, (reason) => {
  console.log('reason:', reason)
  // reason.errors.map(item => console.log(item))
})


console.log(all)

