#!/bin/bash

# exemplo de uso: `./run.sh nginx`

docker compose -f ./$1/compose.yaml down
docker compose -f ./$1/compose.yaml up