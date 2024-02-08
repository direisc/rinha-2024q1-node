import { json } from 'http-body'
import { createServer } from 'node:http'
import { router } from './router.mjs'

export const server = createServer(async (req, res) => {
  // parse body as json
  try {
    req.body = await json(req)
  } catch (error) {
    // no body data
  }
  res.setHeader('content-type', 'application/json')
  router.lookup(req, res)
})
