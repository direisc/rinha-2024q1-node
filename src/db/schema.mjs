import { index, integer, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const transactionTypeEnum = pgEnum('transaction_type', ['c', 'd'])

export const clientes = pgTable('clientes', {
  id: serial('id').primaryKey(),
  limite: integer('limite').notNull(),
  nome: varchar('nome', { length: 50 }).notNull(),
})

export const saldos = pgTable(
  'saldos',
  {
    id: serial('id').primaryKey(),
    client_id: integer('client_id').references(() => clientes.id),
    valor: integer('valor').notNull(),
  },
  (saldo) => ({
    client_id_idx: index('client_id_idx').on(saldo.client_id),
  })
)

export const transacoes = pgTable(
  'transacoes',
  {
    id: serial('id').primaryKey(),
    client_id: integer('client_id').references(() => clientes.id),
    valor: integer('valor').notNull(),
    tipo: transactionTypeEnum('tipo'),
    descricao: varchar('descricao', { length: 50 }).notNull(),
    realizada_em: timestamp('realizada_em').defaultNow().notNull(),
  }
  // TODO index creation
  // (transaction) => {
  //   return {
  //     client_id_idx: index('client_id_idx').on(transaction.client_id),
  //     realizada_em_idx: index('realizada_em_idx').on(transaction.realizada_em),
  //   }
  // }
)
