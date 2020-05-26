#!/usr/bin/env sh

rm -rf ./dist
mkdir -p ./dist

npm run build:mode
npm run build:command
