import { z } from 'zod'
import { db } from '../../db/connection.mjs'
import { parserResponse } from '../../utils.mjs'
import { createTransactionForClientId, getClientById, updateSaldo } from '../services.mjs'

const transactionSchema = z.object({
  valor: z.number().int(),
  tipo: z.enum(['c', 'd']),
  descricao: z.string().min(1).max(10),
})

/**
 * transacao
 * @param {IncomingMessage} req
 * @param {ServerResponse<IncomingMessage>} res
 * @param {{ [k: string]: string | undefined }} params
 * @param {*} store
 * @param {{ [k: string]: string }} searchParams
 */
export const transacao = async (req, res, params, _store, _searchParams) => {
  const client = await getClientById(params.clientId)

  if (!client) {
    res.statusCode = 404
    res.end()
    return
  }

  const { limite, saldo } = client

  transactionSchema
    .superRefine((payload, ctx) => {
      if (payload.tipo === 'd') {
        const newSaldo = saldo - payload.valor
        if (newSaldo < 0) {
          if (newSaldo * -1 > limite) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_big,
              maximum: saldo + limite,
              // type: 'number',
              message: 'Limit exceed for a debit transaction.',
            })
          }
        }
      }
    })
    .parseAsync(req.body)
    .then(async (payload) => {
      const newSaldo = payload.tipo == 'd' ? saldo - payload.valor : saldo + payload.valor

      await db.transaction(async (tx) => {
        await createTransactionForClientId(params.clientId, payload, tx)
        await updateSaldo(params.clientId, newSaldo, tx)
      })

      res.end(parserResponse({ limite, saldo: newSaldo }))
    })
    .catch((_reason) => {
      res.statusCode = 422
      res.end()
    })
}
