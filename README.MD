```bash
# criar transação
curl -X POST -i http://localhost:3000/clientes/2/transacoes \
-d '{ "valor": 800000, "tipo" : "c", "descricao" : "descricao" }'

# extrato
curl -X GET -i http://localhost:3000/clientes/2/extrato
```
