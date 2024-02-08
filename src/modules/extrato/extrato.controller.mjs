import { parserResponse } from '../../utils.mjs'
import { getClientById, getLastTenTransactionsByClientId } from '../services.mjs'

/**
 * extrato
 * @param {IncomingMessage} req
 * @param {ServerResponse<IncomingMessage>} res
 * @param {{ [k: string]: string | undefined }} params
 * @param {*} store
 * @param {{ [k: string]: string }} searchParams
 */
export const extrato = async (_req, res, params, _store, _searchParams) => {
  const client = await getClientById(params.clientId)

  if (!client) {
    res.statusCode = 404
    res.end()
    return
  }

  const { limite, saldo } = client
  const ultimas_transacoes = await getLastTenTransactionsByClientId(params.clientId)

  res.end(
    parserResponse({
      saldo: {
        total: saldo,
        data_extrato: new Date().toISOString(),
        limite,
      },
      ultimas_transacoes,
    })
  )
}
