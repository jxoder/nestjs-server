import cluster from 'cluster'

/**
 * @description Clusterize the application
 * @param bootstrap - The bootstrap function
 * @param num - The number of workers
 */
export function clusterize(bootstrap: Function, num: number = 2) {
  if (cluster.isPrimary) {
    for (let i = 0; i < num; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died. restaring`)
      cluster.fork()
    })

    cluster.on('online', worker => {
      console.log(`worker ${worker.process.pid} is online`)
    })
  } else {
    bootstrap()
  }
}
