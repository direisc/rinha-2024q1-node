import { desc, eq } from 'drizzle-orm'
import { db } from '../db/connection.mjs'
import { clientes, saldos, transacoes } from '../db/schema.mjs'

export const getClientById = async (clientId, tx = db) => {
  const clients = await tx
    .select({
      limite: clientes.limite,
      saldo: saldos.valor,
    })
    .from(clientes)
    .leftJoin(saldos, eq(clientes.id, saldos.client_id))
    .where(eq(clientes.id, clientId))
  return clients?.[0]
}

export const getLastTenTransactionsByClientId = async (clientId, tx = db) => {
  return await tx
    .select({
      valor: transacoes.valor,
      tipo: transacoes.tipo,
      descricao: transacoes.descricao,
      realizada_em: transacoes.realizada_em,
    })
    .from(transacoes)
    .where(eq(transacoes.client_id, clientId))
    .orderBy(desc(transacoes.realizada_em))
    .limit(10)
}

export const updateSaldo = async (clientId, saldo, tx = db) => {
  await tx
    .update(saldos)
    .set({
      valor: saldo,
    })
    .where(eq(saldos.client_id, clientId))
}

export const createTransactionForClientId = async (clientId, transaction, tx = db) => {
  await tx.insert(transacoes).values({
    valor: transaction.valor,
    tipo: transaction.tipo,
    descricao: transaction.descricao,
    client_id: clientId,
  })
}
