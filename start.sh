#!/usr/bin/env bash

DAY="${1:-1}"

FILE="./src/day${DAY}.ts"

echo "Running day $DAY..."
tsx "$FILE"
