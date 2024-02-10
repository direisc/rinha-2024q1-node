#!/bin/bash

pushd ../
docker buildx build --platform linux/amd64 -t rinha_2024q1 -t direisc/rinha_2024q1:latest .
docker push direisc/rinha_2024q1
popd
