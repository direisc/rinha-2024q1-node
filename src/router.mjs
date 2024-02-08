import findMyWay from 'find-my-way'
import { extrato } from './modules/extrato/extrato.controller.mjs'
import { transacao } from './modules/transacao/transacao.controller.mjs'
import { parserResponse } from './utils.mjs'

export const router = findMyWay({
  ignoreTrailingSlash: true,
})

router.on('GET', '/', async (_req, res, _params, _store, _searchParams) => {
  res.end(parserResponse({ status: 'server listening' }))
})

router.on('GET', '/clientes/:clientId(^\\d+)/extrato', extrato)

router.on('POST', '/clientes/:clientId(^\\d+)/transacoes', transacao)
