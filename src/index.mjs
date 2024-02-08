import { server } from './server.mjs'

const PORT = process.env.PORT || 3000

server.listen(PORT, (err) => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3000')
})

/**
 * graceful shutdown
 *
 * close the server and exit process with code: 0 for success and 1 in case of failure
 */
const gracefulShutdown = () => {
  server.close((error) => {
    process.exit(error ? 1 : 0)
  })
}

/**
 * SIGTERM
 *
 * The SIGTERM signal is used to request a graceful termination of a Node.js process.
 * This signal can be sent by a process manager or other external tool to gracefully shut down the Node.js process.
 */
process.on('SIGTERM', gracefulShutdown)

/**
 * SIGINT
 *
 * The SIGINT signal is generated when the user presses CTRL+C on the terminal.
 * This signal is often used to gracefully terminate a Node.js process.
 */
process.on('SIGINT', gracefulShutdown)

/**
 * SIGHUP
 *
 * The SIGHUP signal is generated when a process is disconnected from the terminal or when the terminal session ends.
 * This signal is often used to request a reload or restart of a Node.js process.
 */
process.on('SIGHUP', gracefulShutdown)
