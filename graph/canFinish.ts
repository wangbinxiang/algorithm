// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

// 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

// 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

// 出度，入度
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // 先将没有前置课程的学完
  const graph = Array.from({ length: numCourses }, () => [])
  const inDegree: number[] = Array(numCourses).fill(0)

  for (const [course, pre] of prerequisites) {
    graph[pre].push(course)
    inDegree[course]++
  }
  let count = 0
  const queue: number[] = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }

  while (queue.length) {
    const curr = queue.shift()
    count++
    for (const next of graph[curr]) {
      inDegree[next]--
      if (inDegree[next] === 0) {
        queue.push(next)
      }
    }
  }


  return count === numCourses;
};


function canFinish1(numCourses: number, prerequisites: number[][]): boolean {

  const graph: Record<number, number[]> = Array.from({ length: numCourses }, () => []);
  const inDegree: number[] = Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    graph[pre].push(course)
    inDegree[course]++
  }

  const queue: number[] = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }

  }
  console.log('queue:', queue)
  console.log(graph)
  console.log('inDegree:', inDegree)
  let count = 0
  while (queue.length) {
    count++
    const course = queue.shift()
    console.log(course, count, course)
    for (let next of graph[course]) {
      console.log('next: ', next)
      inDegree[next]--
      if (inDegree[next] === 0) {
        queue.push(next)
      }
    }
  }
  console.log(count)
  return count === numCourses;
};

console.log(canFinish1(2, [[0, 1]])) // true
console.log(canFinish1(2, [[1, 0]])) // true
console.log(canFinish1(2, [[1, 0], [0, 1]])) // false

console.log(canFinish1(20, [[0, 10], [3, 18], [5, 5], [6, 11], [11, 14], [13, 1], [15, 1], [17, 4]])) // false





// 提示：

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// prerequisites[i] 中的所有课程对 互不相同